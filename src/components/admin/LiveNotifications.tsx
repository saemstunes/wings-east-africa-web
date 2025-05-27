
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Bell, Package, Mail, TrendingDown, Shield, Clock } from 'lucide-react';

const LiveNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  // Set up real-time subscription for live notifications
  useEffect(() => {
    const channel = supabase
      .channel('live-notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('New notification received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setNotifications(prev => [payload.new, ...prev.slice(0, 9)]);
            
            // Show browser notification if permission granted
            if (Notification.permission === 'granted') {
              new Notification('Wings Engineering Alert', {
                body: payload.new.title,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
              });
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            console.log('New contact submission:', payload);
            setNotifications(prev => [{
              id: `contact_${payload.new.id}`,
              type: 'part_request',
              title: 'New Part Request',
              message: `From ${payload.new.name} - ${payload.new.subject}`,
              created_at: payload.new.created_at,
              is_read: false
            }, ...prev.slice(0, 9)]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' && payload.new.stock_quantity <= 5) {
            setNotifications(prev => [{
              id: `stock_${payload.new.id}`,
              type: 'low_stock',
              title: 'Low Stock Alert',
              message: `${payload.new.name} - Only ${payload.new.stock_quantity} remaining`,
              created_at: new Date().toISOString(),
              is_read: false
            }, ...prev.slice(0, 9)]);
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        setIsListening(status === 'SUBSCRIBED');
      });

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch initial notifications
  const { data: initialNotifications } = useQuery({
    queryKey: ['recent-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'part_request': return <Package className="h-4 w-4 text-blue-500" />;
      case 'contact_form': return <Mail className="h-4 w-4 text-green-500" />;
      case 'low_stock': return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case 'admin_login': return <Shield className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Live Notifications
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-500">
            {isListening ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No recent notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div 
              key={notification.id || index}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                !notification.is_read ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.title}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.created_at)}
                  </span>
                  {!notification.is_read && (
                    <Badge variant="secondary" className="text-xs">New</Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveNotifications;

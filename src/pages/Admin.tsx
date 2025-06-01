import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Package, Wrench, MessageSquare, BarChart3, Settings, Users, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminPartRequests from '@/components/admin/AdminPartRequests';
import AdminInventory from '@/components/admin/AdminInventory';
import AdminNotifications from '@/components/admin/AdminNotifications';
import AdminQuotes from '@/components/admin/AdminQuotes';
import AdminIntegrations from '@/components/admin/AdminIntegrations';
import AdminOverview from '@/components/admin/AdminOverview';
import RequestTracking from '@/components/admin/RequestTracking';

const Admin = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Fetch unread notifications count
  const { data: notificationsCount } = useQuery({
    queryKey: ['unread-notifications'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 30000, // Check every 30 seconds
  });

  useEffect(() => {
    if (notificationsCount !== undefined) {
      setUnreadNotifications(notificationsCount);
    }
  }, [notificationsCount]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Admin Header */}
        <section className="bg-wings-navy py-8 sm:py-12">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-white heading-lg mb-2">Admin Dashboard</h1>
                <p className="text-white/90 text-base sm:text-lg">
                  Manage your business operations and track performance
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-white" />
                  {unreadNotifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-6 sm:py-8">
          <div className="container-custom">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2 text-xs sm:text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Requests</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center gap-2 text-xs sm:text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Tracking</span>
                </TabsTrigger>
                <TabsTrigger value="inventory" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Inventory</span>
                </TabsTrigger>
                <TabsTrigger value="quotes" className="flex items-center gap-2 text-xs sm:text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Quotes</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Alerts</span>
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="ml-1 h-4 w-4 rounded-full p-0 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Systems</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <AdminOverview />
              </TabsContent>

              <TabsContent value="requests">
                <AdminPartRequests />
              </TabsContent>

              <TabsContent value="tracking">
                <RequestTracking />
              </TabsContent>

              <TabsContent value="inventory">
                <AdminInventory />
              </TabsContent>

              <TabsContent value="quotes">
                <AdminQuotes />
              </TabsContent>

              <TabsContent value="notifications">
                <AdminNotifications onNotificationUpdate={() => setUnreadNotifications(0)} />
              </TabsContent>

              <TabsContent value="integrations">
                <AdminIntegrations />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Admin;

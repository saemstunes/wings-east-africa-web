import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  Bell, 
  AlertTriangle,
  Calendar,
  Mail,
  Phone,
  LogOut,
  Activity,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import LiveNotifications from './LiveNotifications';

const CEODashboard = () => {
  const { logout } = useAuth();

  // Fetch comprehensive dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['ceo-dashboard'],
    queryFn: async () => {
      const [
        contactsResult,
        productsResult,
        quotesResult,
        notificationsResult,
        recentRequestsResult
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*'),
        supabase.from('products').select('*'),
        supabase.from('quotes').select('*, contact_submissions(*)'),
        supabase.from('notifications').select('*').eq('is_read', false),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      // Process data for charts
      const monthlyData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthName = date.toLocaleDateString('en', { month: 'short' });
        
        const monthRequests = contactsResult.data?.filter(req => {
          const reqDate = new Date(req.created_at);
          return reqDate.getMonth() === date.getMonth() && reqDate.getFullYear() === date.getFullYear();
        }).length || 0;

        monthlyData.push({
          month: monthName,
          requests: monthRequests,
          quotes: Math.floor(monthRequests * 0.7),
          revenue: monthRequests * 850
        });
      }

      const statusData = [
        { name: 'Pending', value: quotesResult.data?.filter(q => q.status === 'pending').length || 0, color: '#fbbf24' },
        { name: 'Sent', value: quotesResult.data?.filter(q => q.status === 'sent').length || 0, color: '#3b82f6' },
        { name: 'Accepted', value: quotesResult.data?.filter(q => q.status === 'accepted').length || 0, color: '#10b981' },
        { name: 'Rejected', value: quotesResult.data?.filter(q => q.status === 'rejected').length || 0, color: '#ef4444' }
      ];

      return {
        totalContacts: contactsResult.data?.length || 0,
        totalProducts: productsResult.data?.length || 0,
        totalQuotes: quotesResult.data?.length || 0,
        unreadNotifications: notificationsResult.data?.length || 0,
        recentRequests: recentRequestsResult.data || [],
        monthlyData,
        statusData,
        lowStockProducts: productsResult.data?.filter(p => p.stock_quantity <= 5) || [],
        totalRevenue: quotesResult.data?.reduce((sum, q) => sum + (q.amount || 0), 0) || 0,
        conversionRate: contactsResult.data?.length ? 
          Math.round((quotesResult.data?.filter(q => q.status === 'accepted').length || 0) / contactsResult.data.length * 100) : 0
      };
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wings-navy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-wings-navy shadow-lg">
        <div className="container-custom py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-white text-2xl font-bold">CEO Executive Dashboard</h1>
              <p className="text-white/80">Wings Ltd. | {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-white" />
                {dashboardData?.unreadNotifications > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {dashboardData.unreadNotifications}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Live Dashboard</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="border-white text-white hover:bg-white hover:text-wings-navy"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Secure Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-wings-orange">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-wings-navy">
                    ${dashboardData?.totalRevenue?.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-green-600">↗ +12% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-wings-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-wings-navy">{dashboardData?.totalContacts}</p>
                  <p className="text-xs text-green-600">↗ +8% this week</p>
                </div>
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-wings-navy">{dashboardData?.conversionRate}%</p>
                  <p className="text-xs text-green-600">↗ +3% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-wings-navy">{dashboardData?.totalProducts}</p>
                  <p className="text-xs text-orange-600">
                    {dashboardData?.lowStockProducts?.length} low stock
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Layout with Live Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Charts Section - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Request Trends</CardTitle>
                  <CardDescription>6-month performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData?.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#1e40af" strokeWidth={2} />
                      <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quote Status Distribution</CardTitle>
                  <CardDescription>Current quote pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData?.statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dashboardData?.statusData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Customer Requests
                </CardTitle>
                <CardDescription>Latest incoming business opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentRequests?.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-gray-600">{request.company}</p>
                        <p className="text-xs text-gray-500">{request.subject}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={request.request_type === 'part_request' ? 'default' : 'secondary'}>
                          {request.request_type === 'part_request' ? 'Part Request' : 'General'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Notifications Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <LiveNotifications />
          </div>
        </div>

        {/* Executive Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Executive Alerts
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData?.lowStockProducts?.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-orange-200 rounded-lg bg-orange-50">
                  <div>
                    <p className="font-medium text-orange-800">{product.name}</p>
                    <p className="text-sm text-orange-600">Low Stock Alert</p>
                  </div>
                  <Badge variant="destructive">
                    {product.stock_quantity} remaining
                  </Badge>
                </div>
              ))}
              
              {dashboardData?.unreadNotifications > 0 && (
                <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <div>
                    <p className="font-medium text-blue-800">New Notifications</p>
                    <p className="text-sm text-blue-600">System updates available</p>
                  </div>
                  <Badge variant="default">
                    {dashboardData.unreadNotifications} new
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CEODashboard;

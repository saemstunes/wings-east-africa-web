
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Package, Wrench, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const AdminOverview = () => {
  // Fetch overview statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-overview-stats'],
    queryFn: async () => {
      const [contactsResult, productsResult, servicesResult, quotesResult, notificationsResult] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('quotes').select('*', { count: 'exact', head: true }),
        supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('is_read', false),
      ]);

      // Get recent part requests
      const { data: recentRequests } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('request_type', 'part_request')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get low stock products
      const { data: lowStockProducts } = await supabase
        .from('products')
        .select('*')
        .lte('stock_quantity', 5)
        .eq('status', 'active')
        .order('stock_quantity', { ascending: true });

      return {
        totalContacts: contactsResult.count || 0,
        totalProducts: productsResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalQuotes: quotesResult.count || 0,
        unreadNotifications: notificationsResult.count || 0,
        recentRequests: recentRequests || [],
        lowStockProducts: lowStockProducts || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalContacts}</div>
            <p className="text-xs text-muted-foreground">Contact submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts}</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalServices}</div>
            <p className="text-xs text-muted-foreground">Available services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">Pending quotes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Part Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Part Requests
            </CardTitle>
            <CardDescription>Latest part requests from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentRequests?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent part requests</p>
              ) : (
                stats?.recentRequests?.map((request: any) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{request.name}</p>
                      <p className="text-xs text-muted-foreground">{request.product_name}</p>
                    </div>
                    <Badge variant="outline">
                      {new Date(request.created_at).toLocaleDateString()}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products with low inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.lowStockProducts?.length === 0 ? (
                <p className="text-sm text-muted-foreground">All products are well stocked</p>
              ) : (
                stats?.lowStockProducts?.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge variant={product.stock_quantity === 0 ? "destructive" : "secondary"}>
                      {product.stock_quantity} left
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Package, Wrench, Plus, Edit, Trash2 } from 'lucide-react';

const AdminInventory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);

  // Fetch products
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch services
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (product: any) => {
      const { error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setEditingProduct(null);
    },
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async (service: any) => {
      const { error } = await supabase
        .from('services')
        .update(service)
        .eq('id', service.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Service Updated",
        description: "Service has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setEditingService(null);
    },
  });

  const getStockBadgeColor = (quantity: number) => {
    if (quantity === 0) return 'destructive';
    if (quantity <= 5) return 'secondary';
    return 'default';
  };

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProduct) {
      updateProductMutation.mutate(editingProduct);
    }
  };

  const handleServiceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingService) {
      updateServiceMutation.mutate(editingService);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Inventory
                </span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your product inventory and stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.description?.substring(0, 50)}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <Badge variant={getStockBadgeColor(product.stock_quantity)}>
                            {product.stock_quantity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingProduct({ ...product })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>
                                  Update product information and stock levels
                                </DialogDescription>
                              </DialogHeader>
                              {editingProduct && (
                                <form onSubmit={handleProductSubmit} className="space-y-4">
                                  <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                      id="name"
                                      value={editingProduct.name}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                      id="price"
                                      type="number"
                                      step="0.01"
                                      value={editingProduct.price}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        price: parseFloat(e.target.value)
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="stock">Stock Quantity</Label>
                                    <Input
                                      id="stock"
                                      type="number"
                                      value={editingProduct.stock_quantity}
                                      onChange={(e) => setEditingProduct({
                                        ...editingProduct,
                                        stock_quantity: parseInt(e.target.value)
                                      })}
                                    />
                                  </div>
                                  <Button 
                                    type="submit" 
                                    disabled={updateProductMutation.isPending}
                                  >
                                    Update Product
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Services
                </span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your service offerings and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.description?.substring(0, 50)}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>${service.base_price}</TableCell>
                        <TableCell>{service.duration_hours}h</TableCell>
                        <TableCell>
                          <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                            {service.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingService({ ...service })}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Service</DialogTitle>
                                <DialogDescription>
                                  Update service information and pricing
                                </DialogDescription>
                              </DialogHeader>
                              {editingService && (
                                <form onSubmit={handleServiceSubmit} className="space-y-4">
                                  <div>
                                    <Label htmlFor="service-name">Name</Label>
                                    <Input
                                      id="service-name"
                                      value={editingService.name}
                                      onChange={(e) => setEditingService({
                                        ...editingService,
                                        name: e.target.value
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="service-price">Base Price</Label>
                                    <Input
                                      id="service-price"
                                      type="number"
                                      step="0.01"
                                      value={editingService.base_price}
                                      onChange={(e) => setEditingService({
                                        ...editingService,
                                        base_price: parseFloat(e.target.value)
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="duration">Duration (hours)</Label>
                                    <Input
                                      id="duration"
                                      type="number"
                                      value={editingService.duration_hours}
                                      onChange={(e) => setEditingService({
                                        ...editingService,
                                        duration_hours: parseInt(e.target.value)
                                      })}
                                    />
                                  </div>
                                  <Button 
                                    type="submit" 
                                    disabled={updateServiceMutation.isPending}
                                  >
                                    Update Service
                                  </Button>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminInventory;

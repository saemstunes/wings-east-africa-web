import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MobilePartSelector from '@/components/ui/MobilePartSelector';
import ImageManager from '@/components/admin/ImageManager';
import { Settings, Wrench, Cog, Package, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  model?: string;
  category: string;
  subcategory?: string;
  power_kva?: number;
  power_kw?: number;
  engine_brand?: string;
  engine_model?: string;
  engine_type?: string;
  cooling_type?: string;
  starting_type?: string;
  fuel_type?: string;
  voltage?: string;
  frequency?: string;
  rpm?: string;
  phase_type?: string;
  mounting_type?: string;
  weight_kg?: number;
  dimensions?: string;
  key_features?: string[];
  short_description?: string;
  full_description?: string;
  applications?: string[];
  maintenance_notes?: string;
  compatible_with?: string[];
  price?: number;
  currency?: string;
  stock_quantity?: number;
  primary_image_url?: string;
  additional_images?: string[];
  status?: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  service_type: string;
  description: string;
  duration_hours?: number;
  frequency?: string;
  interval_hours?: number;
  applicable_products?: string[];
  equipment_brands?: string[];
  base_price?: number;
  price_type?: string;
  currency?: string;
  requirements?: string[];
  included_items?: string[];
  tools_required?: string[];
  parts_included?: boolean;
  advance_notice_days?: number;
  available_locations?: string[];
  mobile_service?: boolean;
  status?: string;
}

const formatPrice = (price?: number, currency: string = 'USD') => {
  if (!price) return 'Quote on request';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'generators':
      return <Zap className="w-5 h-5" />;
    case 'engines':
      return <Cog className="w-5 h-5" />;
    case 'parts':
      return <Package className="w-5 h-5" />;
    case 'accessories':
      return <Wrench className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [partRequestProduct, setPartRequestProduct] = useState<Product | null>(null);
  const [isMobilePartSelectorOpen, setIsMobilePartSelectorOpen] = useState(false);

  // Enhanced Image URL Helper (handles spaces and special characters)
  const getImageUrl = (path: string | null) => {
    if (!path) return '/placeholder.svg';
    
    // Handle absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Split path into directory and filename
    const lastSlashIndex = path.lastIndexOf('/');
    
    // Handle paths without directories
    if (lastSlashIndex === -1) {
      return `/${encodeURIComponent(path)}`;
    }
    
    const directory = path.substring(0, lastSlashIndex + 1);
    const filename = path.substring(lastSlashIndex + 1);
    
    // Encode only the filename portion
    return `${directory}${encodeURIComponent(filename)}`;
  };

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_catalog')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Fetch services
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_catalog')
        .select('*')
        .eq('status', 'active')
        .order('name');
      
      if (error) throw error;
      return data as Service[];
    },
  });

  // Filter functions
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  const productsByCategory = {
    generators: filteredProducts.filter(p => p.category === 'generators'),
    engines: filteredProducts.filter(p => p.category === 'engines'),
    parts: filteredProducts.filter(p => p.category === 'parts'),
    accessories: filteredProducts.filter(p => p.category === 'accessories'),
  };

  const servicesByCategory = {
    maintenance: services.filter(s => s.category === 'maintenance'),
    repair: services.filter(s => s.category === 'repair'),
    installation: services.filter(s => s.category === 'installation'),
    rental: services.filter(s => s.category === 'rental'),
  };

  if (productsLoading || servicesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Services & Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Comprehensive solutions for all your power generation needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Professional Installation
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              24/7 Maintenance
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Quality Parts
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Emergency Repairs
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Image Management Section - Admin Tool */}
        <div className="mb-8">
          <Card className="border-dashed border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Settings className="w-5 h-5" />
                Image Management (Admin)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageManager />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products" className="text-lg py-3">Products</TabsTrigger>
            <TabsTrigger value="services" className="text-lg py-3">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-8">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className="hover:scale-105 transition-all duration-200"
                >
                  All Categories
                </Button>
                {uniqueCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize hover:scale-105 transition-all duration-200"
                  >
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category}</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedBrand === 'all' ? 'secondary' : 'outline'}
                  onClick={() => setSelectedBrand('all')}
                  size="sm"
                  className="hover:scale-105 transition-all duration-200"
                >
                  All Brands
                </Button>
                {uniqueBrands.map(brand => (
                  <Button
                    key={brand}
                    variant={selectedBrand === brand ? 'secondary' : 'outline'}
                    onClick={() => setSelectedBrand(brand)}
                    size="sm"
                    className="hover:scale-105 transition-all duration-200"
                  >
                    {brand}
                  </Button>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
              categoryProducts.length > 0 && (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    {getCategoryIcon(category)}
                    <h2 className="text-3xl font-bold capitalize text-gray-800 dark:text-gray-200">
                      {category}
                    </h2>
                    <Badge variant="secondary" className="px-3 py-1">
                      {categoryProducts.length} items
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg hover:shadow-2xl">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={getImageUrl(product.primary_image_url)}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 hover:bg-white">
                            {product.brand}
                          </Badge>
                        </div>
                        
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-200">
                            {product.name}
                          </CardTitle>
                          {product.short_description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                              {product.short_description}
                            </p>
                          )}
                        </CardHeader>
                        
                        <CardContent className="pt-0 space-y-4">
                          {/* Technical specs */}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {product.power_kva && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Power:</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">{product.power_kva} kVA</span>
                              </div>
                            )}
                            {product.engine_brand && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Engine:</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">{product.engine_brand}</span>
                              </div>
                            )}
                            {product.fuel_type && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Fuel:</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">{product.fuel_type}</span>
                              </div>
                            )}
                            {product.voltage && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Voltage:</span>
                                <span className="ml-1 text-gray-600 dark:text-gray-400">{product.voltage}</span>
                              </div>
                            )}
                          </div>

                          {/* Key features */}
                          {product.key_features && product.key_features.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {product.key_features.slice(0, 2).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                                  {feature}
                                </Badge>
                              ))}
                              {product.key_features.length > 2 && (
                                <Badge variant="outline" className="text-xs px-2 py-1">
                                  +{product.key_features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {formatPrice(product.price, product.currency)}
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedProduct(product)}
                                    className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 transition-all duration-200"
                                  >
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                  {selectedProduct && (
                                    <>
                                      <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold">
                                          {selectedProduct.name}
                                        </DialogTitle>
                                      </DialogHeader>
                                      
                                      <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                          <img
                                            src={getImageUrl(selectedProduct.primary_image_url)}
                                            alt={selectedProduct.name}
                                            className="w-full h-64 object-cover rounded-lg"
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.src = '/placeholder.svg';
                                            }}
                                          />
                                          
                                          {selectedProduct.additional_images && selectedProduct.additional_images.length > 0 && (
                                            <div className="grid grid-cols-3 gap-2">
                                              {selectedProduct.additional_images.slice(0, 3).map((img, idx) => (
                                                <img
                                                  key={idx}
                                                  src={getImageUrl(img)}
                                                  alt={`${selectedProduct.name} ${idx + 1}`}
                                                  className="w-full h-20 object-cover rounded-md"
                                                  onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder.svg';
                                                  }}
                                                />
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                        
                                        <div className="space-y-6">
                                          <div>
                                            <h3 className="font-semibold text-lg mb-2">Description</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                              {selectedProduct.full_description || selectedProduct.short_description}
                                            </p>
                                          </div>
                                          
                                          <div>
                                            <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                              {selectedProduct.power_kva && (
                                                <div>
                                                  <span className="font-medium">Power (kVA):</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.power_kva}</span>
                                                </div>
                                              )}
                                              {selectedProduct.power_kw && (
                                                <div>
                                                  <span className="font-medium">Power (kW):</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.power_kw}</span>
                                                </div>
                                              )}
                                              {selectedProduct.engine_brand && (
                                                <div>
                                                  <span className="font-medium">Engine Brand:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.engine_brand}</span>
                                                </div>
                                              )}
                                              {selectedProduct.engine_model && (
                                                <div>
                                                  <span className="font-medium">Engine Model:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.engine_model}</span>
                                                </div>
                                              )}
                                              {selectedProduct.fuel_type && (
                                                <div>
                                                  <span className="font-medium">Fuel Type:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.fuel_type}</span>
                                                </div>
                                              )}
                                              {selectedProduct.cooling_type && (
                                                <div>
                                                  <span className="font-medium">Cooling:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.cooling_type}</span>
                                                </div>
                                              )}
                                              {selectedProduct.voltage && (
                                                <div>
                                                  <span className="font-medium">Voltage:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.voltage}</span>
                                                </div>
                                              )}
                                              {selectedProduct.frequency && (
                                                <div>
                                                  <span className="font-medium">Frequency:</span>
                                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedProduct.frequency}</span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          
                                          {selectedProduct.key_features && selectedProduct.key_features.length > 0 && (
                                            <div>
                                              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                                              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                {selectedProduct.key_features.map((feature, idx) => (
                                                  <li key={idx}>{feature}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                          
                                          {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                                            <div>
                                              <h3 className="font-semibold text-lg mb-2">Applications</h3>
                                              <div className="flex flex-wrap gap-2">
                                                {selectedProduct.applications.map((app, idx) => (
                                                  <Badge key={idx} variant="secondary">{app}</Badge>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                          
                                          <div className="pt-4 border-t">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                              {formatPrice(selectedProduct.price, selectedProduct.currency)}
                                            </div>
                                            <Button 
                                              className="w-full hover:bg-blue-700 transition-colors duration-200"
                                              onClick={() => {
                                                setPartRequestProduct(selectedProduct);
                                                setIsMobilePartSelectorOpen(true);
                                              }}
                                            >
                                              Request Quote
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                size="sm"
                                onClick={() => {
                                  setPartRequestProduct(product);
                                  setIsMobilePartSelectorOpen(true);
                                }}
                                className="hover:bg-blue-700 transition-colors duration-200"
                              >
                                Request Part
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-8">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              categoryServices.length > 0 && (
                <div key={category} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Wrench className="w-6 h-6 text-blue-600" />
                    <h2 className="text-3xl font-bold capitalize text-gray-800 dark:text-gray-200">
                      {category} Services
                    </h2>
                    <Badge variant="secondary" className="px-3 py-1">
                      {categoryServices.length} services
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryServices.map((service) => (
                      <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                            {service.name}
                          </CardTitle>
                          <p className="text-gray-600 dark:text-gray-400">
                            {service.description}
                          </p>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {service.duration_hours && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">{service.duration_hours}h</span>
                              </div>
                            )}
                            {service.mobile_service !== null && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Mobile:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                  {service.mobile_service ? 'Yes' : 'No'}
                                </span>
                              </div>
                            )}
                          </div>

                          {service.included_items && service.included_items.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Included:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {service.included_items.slice(0, 3).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                                {service.included_items.length > 3 && (
                                  <li className="text-blue-600 dark:text-blue-400">
                                    +{service.included_items.length - 3} more items
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {formatPrice(service.base_price, service.currency)}
                            </div>
                            <Button 
                              variant="outline"
                              className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 transition-all duration-200"
                            >
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ))}

            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No services available at this time.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Part Request Sheet */}
      <Sheet open={isMobilePartSelectorOpen} onOpenChange={setIsMobilePartSelectorOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Request a Part</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {partRequestProduct && (
              <MobilePartSelector
                image={getImageUrl(partRequestProduct.primary_image_url)}
                onSelect={(imageData: string, metadata: any) => {
                  // Handle the selection
                  console.log('Part selected:', { imageData, metadata });
                }}
                productName={partRequestProduct.name}
                onClose={() => {
                  setIsMobilePartSelectorOpen(false);
                  setPartRequestProduct(null);
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Services;

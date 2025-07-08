
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { LayoutList, LayoutGrid, Filter, Search } from 'lucide-react';
import ImageGallery from '../components/ui/ImageGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Services = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryProductName, setGalleryProductName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Fetch products from database
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products', categoryFilter, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('product_catalog')
        .select('*')
        .eq('status', 'active')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch services from database
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_catalog')
        .select('*')
        .eq('status', 'active')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  useEffect(() => {
    // Get category from URL query parameter
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    if (category && ['generators', 'engines', 'parts'].includes(category)) {
      setCategoryFilter(category);
      
      // Scroll to products section with a slight delay to ensure DOM is ready
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Handle hash for direct section navigation
    if (location.hash === '#installation') {
      setTimeout(() => {
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Add this helper function at the top of your component
const getImageUrl = (path: string) => {
  if (!path) return 'https://via.placeholder.com/400x300?text=No+Image';
  
  // If it's already a full URL, return as-is
  if (path.startsWith('http')) return path;
  
  // If it's a relative path, convert to full URL
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${path}`;
};

  const openGallery = (product: any) => {
    const images = product.additional_images && product.additional_images.length > 0 
      ? product.additional_images.map(getImageUrl)
    : product.primary_image_url 
      ? [getImageUrl(product.primary_image_url)] 
      : [];
    setGalleryImages(images);
    setGalleryProductName(product.name);
    setGalleryOpen(true);
  };

  const selectedProductData = selectedProduct 
    ? products.find(p => p.id === selectedProduct)
    : null;

  const formatSpecifications = (product: any) => {
    const specs = [];
    if (product.power_kva) specs.push({ name: 'Power Output', value: `${product.power_kva} kVA` });
    if (product.power_kw) specs.push({ name: 'Power (kW)', value: `${product.power_kw} kW` });
    if (product.engine_brand) specs.push({ name: 'Engine Brand', value: product.engine_brand });
    if (product.engine_model) specs.push({ name: 'Engine Model', value: product.engine_model });
    if (product.fuel_type) specs.push({ name: 'Fuel Type', value: product.fuel_type });
    if (product.cooling_type) specs.push({ name: 'Cooling', value: product.cooling_type });
    if (product.starting_type) specs.push({ name: 'Starting', value: product.starting_type });
    if (product.voltage) specs.push({ name: 'Voltage', value: product.voltage });
    if (product.frequency) specs.push({ name: 'Frequency', value: product.frequency });
    if (product.rpm) specs.push({ name: 'RPM', value: product.rpm });
    if (product.phase_type) specs.push({ name: 'Phase', value: product.phase_type });
    if (product.cylinders) specs.push({ name: 'Cylinders', value: product.cylinders.toString() });
    if (product.mounting_type) specs.push({ name: 'Mounting', value: product.mounting_type });
    if (product.service_interval_hours) specs.push({ name: 'Service Interval', value: `${product.service_interval_hours} hours` });
    return specs;
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'maintenance':
        return (
          <svg className="w-16 h-16 text-wings-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'installation':
        return (
          <svg className="w-16 h-16 text-wings-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'rental':
        return (
          <svg className="w-16 h-16 text-wings-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'repair':
        return (
          <svg className="w-16 h-16 text-wings-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      default:
        return (
          <svg className="w-16 h-16 text-wings-navy dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-wings-navy py-20">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://i.imgur.com/iOeMacP.jpeg?q=80&w=1470&auto=format&fit=crop" 
              alt="Engineering equipment" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white heading-lg mb-6">Services & Products</h1>
              <p className="text-white/90 text-xl">
                Comprehensive engineering solutions for power generation needs.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services-section" className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy dark:text-white mb-4">Our Services</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Wings Ltd. offers a comprehensive range of engineering services to meet your power generation needs.
              </p>
            </div>
            
            {servicesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <Card key={service.id} className="flex">
                    <div className="p-6 mr-6 flex-shrink-0">
                      {getServiceIcon(service.category)}
                    </div>
                    <div className="p-6 pl-0">
                      <CardTitle className="text-xl font-semibold text-wings-navy dark:text-white mb-3">
                        {service.name}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section id="products-section" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy dark:text-white mb-4">Our Products</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Browse our selection of high-quality generators, engines, and spare parts.
              </p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row justify-between mb-8 gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                {/* Category Filter */}
                <div className="inline-flex rounded-md shadow-sm">
                  <Button
                    onClick={() => setCategoryFilter(null)}
                    variant={categoryFilter === null ? "default" : "outline"}
                    className="rounded-r-none"
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setCategoryFilter('generators')}
                    variant={categoryFilter === 'generators' ? "default" : "outline"}
                    className="rounded-none border-l-0"
                  >
                    Generators
                  </Button>
                  <Button
                    onClick={() => setCategoryFilter('engines')}
                    variant={categoryFilter === 'engines' ? "default" : "outline"}
                    className="rounded-none border-l-0"
                  >
                    Engines
                  </Button>
                  <Button
                    onClick={() => setCategoryFilter('parts')}
                    variant={categoryFilter === 'parts' ? "default" : "outline"}
                    className="rounded-l-none border-l-0"
                  >
                    Parts
                  </Button>
                </div>
              </div>
              
              {/* View Mode */}
              <div className="inline-flex rounded-md shadow-sm">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  className="rounded-r-none"
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? "default" : "outline"}
                  className="rounded-l-none border-l-0"
                >
                  <LayoutList className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>
            
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <Card 
                        key={product.id} 
                        className="overflow-hidden transition-transform hover:shadow-md hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={getImageUrl(product.primary_image_url) || 'https://via.placeholder.com/400x300?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary">{product.brand}</Badge>
                          </div>
                          {product.power_kva && (
                            <div className="absolute top-2 right-2">
                              <Badge>{product.power_kva} kVA</Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-wings-navy dark:text-white mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {product.short_description}
                          </p>
                          <div className="flex justify-between items-center">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product.id);
                              }}
                              variant="outline"
                              size="sm"
                            >
                              View Details
                            </Button>
                            {(product.additional_images?.length > 0 || product.primary_image_url) && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openGallery(product);
                                }}
                                variant="ghost"
                                size="sm"
                              >
                                Gallery
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-6">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 lg:w-1/4">
                            <img 
                              src={getImageUrl(product.primary_image_url) || 'https://via.placeholder.com/400x300?text=No+Image'}
                              alt={product.name}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-6 md:w-2/3 lg:w-3/4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-xl font-semibold text-wings-navy dark:text-white">
                                    {product.name}
                                  </h3>
                                  <Badge variant="outline">{product.brand}</Badge>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                  {product.full_description || product.short_description}
                                </p>
                                
                                {/* Key Features */}
                                {product.key_features && product.key_features.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="font-medium text-wings-navy dark:text-white mb-2">Key Features</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {product.key_features.slice(0, 3).map((feature, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {feature}
                                        </Badge>
                                      ))}
                                      {product.key_features.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{product.key_features.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4">
                                <Button
                                  onClick={() => setSelectedProduct(product.id)}
                                  variant="outline"
                                  size="sm"
                                >
                                  View Details
                                </Button>
                                <Button
                                  onClick={() => {
                                    const message = `I'm interested in ${product.name}. Please provide more information.`;
                                    window.open(`https://wa.me/254719719991?text=${encodeURIComponent(message)}`, '_blank');
                                  }}
                                  size="sm"
                                  className="flex items-center justify-center"
                                >
                                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                                  </svg>
                                  Inquire
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Product Detail Modal */}
            {selectedProduct && selectedProductData && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-wings-navy dark:text-white mb-2">
                          {selectedProductData.name}
                        </h3>
                        <div className="flex gap-2">
                          <Badge>{selectedProductData.brand}</Badge>
                          {selectedProductData.model && (
                            <Badge variant="outline">{selectedProductData.model}</Badge>
                          )}
                          <Badge variant="secondary">{selectedProductData.category}</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedProduct(null)}
                        variant="ghost"
                        size="sm"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img 
                            src={getImageUrl(selectedProductData.primary_image_url) || 'https://via.placeholder.com/400x300?text=No+Image'}
                            alt={selectedProductData.name}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        
                        <div className="flex gap-3 justify-center">
                          <Button 
                            onClick={() => {
                              const message = `I'm interested in ${selectedProductData.name}. Please provide more information.`;
                              window.open(`https://wa.me/254719719991?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                            </svg>
                            Inquire on WhatsApp
                          </Button>
                          
                          {(selectedProductData.additional_images?.length > 0 || selectedProductData.primary_image_url) && (
                            <Button 
                              variant="outline"
                              onClick={() => openGallery(selectedProductData)}
                            >
                              View Gallery
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-wings-navy dark:text-white mb-3">Description</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {selectedProductData.full_description || selectedProductData.short_description}
                        </p>
                        
                        {/* Key Features */}
                        {selectedProductData.key_features && selectedProductData.key_features.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-wings-navy dark:text-white mb-3">Key Features</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                              {selectedProductData.key_features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Applications */}
                        {selectedProductData.applications && selectedProductData.applications.length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-wings-navy dark:text-white mb-3">Applications</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProductData.applications.map((app, index) => (
                                <Badge key={index} variant="outline">{app}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Specifications */}
                        <h4 className="text-lg font-semibold text-wings-navy dark:text-white mb-3">Specifications</h4>
                        <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                          {formatSpecifications(selectedProductData).map((spec, index) => (
                            <div 
                              key={index} 
                              className={`flex ${
                                index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-750' : 'bg-white dark:bg-gray-800'
                              }`}
                            >
                              <div className="w-1/2 p-3 border-r border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300">
                                {spec.name}
                              </div>
                              <div className="w-1/2 p-3 text-gray-800 dark:text-gray-200">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Maintenance Notes */}
                        {selectedProductData.maintenance_notes && (
                          <div className="mt-6">
                            <h4 className="text-lg font-semibold text-wings-navy dark:text-white mb-3">Maintenance</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {selectedProductData.maintenance_notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {galleryOpen && galleryImages.length > 0 && (
              <ImageGallery 
                images={galleryImages}
                onClose={() => setGalleryOpen(false)}
                productName={galleryProductName}
              />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-wings-navy">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="heading-md text-white mb-6">Need a Custom Solution?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Our team of engineers can design and implement tailored power solutions for your specific requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="btn-primary">
                  Contact Our Team
                </a>
                <Button
                  variant="outline"
                  className="
                  border-wings-navy 
                  text-wings-navy 
                  bg-white 
                  dark:bg-transparent 
                  dark:text-white 
                  dark:border-white 
                  hover:bg-wings-navy 
                  hover:text-white 
                  dark:hover:bg-white 
                  dark:hover:text-wings-navy 
                  transition-colors 
                  duration-200 
                  flex items-center
                  "
                  onClick={() => {
                    window.open('https://wa.me/254719719991?text=I%20need%20a%20custom%20power%20solution.%20Please%20contact%20me.', '_blank');
                  }}
                  >
  Contact Us
</Button>

                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                  </svg>
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254719719991" />
    </>
  );
};

export default Services;

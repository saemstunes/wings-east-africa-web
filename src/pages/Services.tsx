
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const products = [
  {
    id: 1,
    name: 'Lister Petter TR Generator Engines TR3',
    category: 'engines',
    image: 'https://www.sleeman-hawken.com/wp-content/uploads/2022/08/Lister-Petter-TR-Engines-4.png?q=80&w=1469&auto=format&fit=crop',
    shortDesc: 'Powerful, robust & easy-to-maintain air-cooled engine',
    fullDesc: 'A compact, air-cooled diesel generator engine designed for unregulated emissions territories. With fixed speeds of 1500 rpm, up to 7.4kW power output, direct injection, and durable construction, it offers reliable performance and low maintenance.',
    specs: [
      { name: 'Power Output', value: '7.4kW' },
      { name: 'Fuel Type', value: 'Diesel' },
      { name: 'Series', value: 'TR 3' },
      { name: 'Injection', value: 'Direct' },
      { name: 'Max Power', value: '1500 r/min—18.5kW' },
      { name: 'Fixed Speeds', value: '1500rpm' },
    ]
  },
  {
    id: 2,
    name: 'Lister Petter Lutian Generator 6.5 kVA',
    category: 'generators',
    image: 'https://5.imimg.com/data5/ANDROID/Default/2022/7/NN/KJ/OY/125411766/product-jpeg-1000x1000.jpg?q=80&w=1469&auto=format&fit=crop',
    shortDesc: 'Medium-sized generator for commercial buildings',
    fullDesc: 'Ideal for medium-sized businesses, hospitals, and commercial buildings. Features advanced control systems and fuel efficiency.',
    specs: [
      { name: 'Power Output', value: '6.6 kVA' },
      { name: 'Fuel Type', value: 'Diesel' },
      { name: 'Engine', value: '4-stroke, single cylinder' },
      { name: 'Start', value: 'Electric' },
      { name: 'Noise', value: 'Silent, 68db' },
      { name: 'Warranty', value: '2 years' },
    ]
  },
  {
    id: 3,
    name: 'Perkins 30KVA Diesel Silent Generator Heavy Duty 3phase ',
    category: 'generators',
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/405521346/FH/NH/JT/95857241/30kva-perkins-ee30p-dg-sets-1000x1000.jpg?q=80&w=1470&auto=format&fit=crop',
    shortDesc: 'Ultra-quiet, fuel-efficient, and tough build for nonstop big performance',
    fullDesc: 'Our Perkins 30KVA Diesel Silent Generator delivers industrial-grade performance with automatic backup reliability for your school, business or home.',
    specs: [
      { name: 'Power Output', value: '30kVA' },
      { name: 'Fuel Type', value: 'Diesel' },
      { name: 'Engine', value: 'Perkins® 1103A-33G1' },
      { name: 'Capacity', value: '180 L' },
      { name: 'Design', value: 'Portable' },
    ]
  },
  {
    id: 4,
    name: 'Lister Petter K1 72 Diesel Engine',
    category: 'engines',
    image: 'https://image.made-in-china.com/155f0j00EvZUrDplZAoO/296cc-Small-Air-Cooled-Diesel-Motor-178.webpq=80&w=1470&auto=format&fit=crop',
    shortDesc: 'High-performance engine in a robust build',
    fullDesc: 'An air-cooled, single-cylinder solution for situations requiring a compact and efficient power source.  ',
    specs: [
      { name: 'Power Output', value: '2.1kW to 6.3kW' },
      { name: 'Fuel Type', value: 'Diesel' },
      { name: 'Speed', value: '2000 to 3600 rpm' },
      { name: 'Configuration', value: 'Single Cylinder' },
      { name: 'Stroke', value: '4-stroke' },
      { name: 'Cooling', value: 'Water-cooled' },
    ]
  },
  {
    id: 5,
    name: 'Lister Petter Diesel Fuel Injection Pump,
    category: 'parts',
    image: 'https://media.greenmountaingenerators.com/wp-content/uploads/2014/12/02032446/MEP802A-MEP803A-MEP812A-MEP813A-Diesel-Fuel-Metering-Fuel-Pump-1024x389.jpg?q=80&w=1470&auto=format&fit=crop',
    shortDesc: 'Precision engineered for an economical drive, always',
    fullDesc: 'This piece balances fuel delivery, effectively taking car shaking off and enhance your driving experience.',
    specs: [
      { name: 'Compatibility', value: 'LPW2, LPW3, LPW4' },
      { name: 'Fuel Type', value: 'Diesel' },
      { name: 'Configuration', value: '751-41323' },
      { name: 'Compatibility', value: 'LPW2, LPW3, LPW4' },
      { name: 'Cooling', value: 'Water-cooled' },
    ]
  },
  {
    id: 6,
    name: 'Lister Petter Fuel Filter 751-18100',
    category: 'parts',
    image: 'https://www.lsengineers.co.uk/media/catalog/product/cache/28b0ba77c0e276b9c7aaf38b50ee42ce/7/5/751-18100-2.jpg?q=80&w=1470&auto=format&fit=crop',
    shortDesc: 'Lister Petter Spin-On Agglomerator Type Fuel Filter',
    fullDesc: 'Our fuel filter kits contain genuine parts that ensure optimal engine performance and fuel efficiency.',
    specs: [
      { name: 'Compatibility', value: 'LPA2, LPA3, LPW2, LPW3, LPW4, LPWT4, TR Engines' },
      { name: 'Filter Type', value: '751-18100' },
      { name: 'Material', value: 'High-grade Synthetic' },
      { name: 'Size', value: 'H:110mm x O/D:82mm x 14mm x Thread' },
    ]
  },
];

const services = [
  {
    id: 1,
    name: 'Maintenance & Repair',
    icon: (
      <svg className="w-16 h-16 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Our team provides routine maintenance and emergency repairs for all generator and engine models. Services include oil changes, filter replacements, and comprehensive system diagnostics.'
  },
  {
    id: 2,
    name: 'Installation & Commissioning',
    icon: (
      <svg className="w-16 h-16 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    description: 'Professional installation of generators and power systems, including site assessment, preparation, and full commissioning. We ensure seamless integration with your existing infrastructure.'
  },
  {
    id: 3,
    name: 'Equipment Rental',
    icon: (
      <svg className="w-16 h-16 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Flexible rental options for generators from 10kVA to 500kVA. Perfect for construction sites, events, or temporary power needs. Includes delivery, setup, and technical support.'
  },
  {
    id: 4,
    name: 'Spare Parts Supply',
    icon: (
      <svg className="w-16 h-16 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    description: 'Genuine spare parts for all major generator and engine brands. We maintain an extensive inventory to minimize downtime for your operations.'
  },
];

const Services = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const filteredProducts = categoryFilter 
    ? products.filter(product => product.category === categoryFilter)
    : products;
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-wings-navy py-20">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1470&auto=format&fit=crop" 
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
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wings Ltd. offers a comprehensive range of engineering services to meet your power generation needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex">
                  <div className="mr-6">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-wings-navy mb-3">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy mb-4">Our Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our selection of high-quality generators, engines, and spare parts.
              </p>
            </div>
            
            {/* Category Filters */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    categoryFilter === null
                      ? 'bg-wings-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCategoryFilter('generators')}
                  className={`px-4 py-2 text-sm font-medium ${
                    categoryFilter === 'generators'
                      ? 'bg-wings-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Generators
                </button>
                <button
                  onClick={() => setCategoryFilter('engines')}
                  className={`px-4 py-2 text-sm font-medium ${
                    categoryFilter === 'engines'
                      ? 'bg-wings-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Engines
                </button>
                <button
                  onClick={() => setCategoryFilter('parts')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    categoryFilter === 'parts'
                      ? 'bg-wings-navy text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Spare Parts
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-transform hover:shadow-md hover:scale-105"
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-wings-navy mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.shortDesc}</p>
                    <button
                      onClick={() => setSelectedProduct(product.id)}
                      className="text-wings-orange hover:text-wings-navy transition-colors inline-flex items-center"
                    >
                      View Details 
                      <svg 
                        className="w-4 h-4 ml-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    {products.filter(p => p.id === selectedProduct).map(product => (
                      <div key={product.id}>
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-2xl font-semibold text-wings-navy">{product.name}</h3>
                          <button
                            onClick={() => setSelectedProduct(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <div className="rounded-lg overflow-hidden mb-4">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                            
                            <div className="flex gap-3 justify-center">
                              <button 
                                className="btn-primary flex items-center"
                                onClick={() => {
                                  const message = `I'm interested in ${product.name}. Please provide more information.`;
                                  window.open(`https://wa.me/254123456789?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                              >
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                  <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                                </svg>
                                Inquire on WhatsApp
                              </button>
                              
                              <button className="btn-outline">
                                Download PDF
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold text-wings-navy mb-3">Description</h4>
                            <p className="text-gray-600 mb-6">{product.fullDesc}</p>
                            
                            <h4 className="text-lg font-semibold text-wings-navy mb-3">Specifications</h4>
                            <div className="border rounded-md overflow-hidden">
                              {product.specs.map((spec, index) => (
                                <div 
                                  key={index} 
                                  className={`flex ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                  }`}
                                >
                                  <div className="w-1/2 p-3 border-r border-gray-200 font-medium">
                                    {spec.name}
                                  </div>
                                  <div className="w-1/2 p-3">
                                    {spec.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                <button 
                  className="btn-outline border-white text-white hover:bg-white hover:text-wings-navy flex items-center"
                  onClick={() => {
                    window.open('https://wa.me/254123456789?text=I%20need%20a%20custom%20power%20solution.%20Please%20contact%20me.', '_blank');
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                  </svg>
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254123456789" />
    </>
  );
};

export default Services;

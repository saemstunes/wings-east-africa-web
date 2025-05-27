
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface Product {
  id: number;
  nameKey: string;
  categoryKey: string;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    id: 1,
    nameKey: 'industrialGenerators',
    categoryKey: 'powerGeneration',
    image: 'https://i.imgur.com/oxF3LmG.png?q=80&w=1997&auto=format&fit=crop',
    link: '/services?category=generators'
  },
  {
    id: 2,
    nameKey: 'dieselEngines',
    categoryKey: 'engineCategory',
    image: 'https://i.imgur.com/b82Q5RT.jpeg?q=80&w=2069&auto=format&fit=crop',
    link: '/services?category=engines'
  },
  {
    id: 3,
    nameKey: 'spareParts',
    categoryKey: 'maintenanceCategory',
    image: 'https://i.imgur.com/btN9EmF.png?q=80&w=2069&auto=format&fit=crop',
    link: '/services?category=parts'
  },
  {
    id: 4,
    nameKey: 'installationServices',
    categoryKey: 'serviceCategory',
    image: 'https://i.imgur.com/Qe7RsLM.png?q=80&w=1974&auto=format&fit=crop',
    link: '/services?category=installation'
  }
];

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <section className="py-10 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="heading-lg text-wings-navy dark:text-white mb-3 sm:mb-4">{t('ourProducts')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            {t('productSubtitle')}
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-lg"
              variants={item}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={t(product.nameKey)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wings-navy/80 to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                <span className="text-xs sm:text-sm text-wings-orange font-medium block mb-1">{t(product.categoryKey)}</span>
                <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">{t(product.nameKey)}</h3>
                <Link 
                  to={product.link} 
                  className="inline-flex items-center text-xs sm:text-sm font-medium text-white hover:text-wings-orange transition-colors"
                >
                   {t('learnMore')}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-8 sm:mt-10">
          <Link 
            to="/services" 
            className="btn-secondary inline-flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            {t('viewAll')}
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

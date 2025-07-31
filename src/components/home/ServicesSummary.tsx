
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface Service {
  id: number;
  titleKey: string;
  descriptionKey?: string;
  description?: string;
  icon: JSX.Element;
  link: string;
}

const ServicesSummary = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    {
      id: 1,
      titleKey: 'engineSales',
      description: 'Wide range of industrial engines and generators for various applications.',
      icon: (
        <svg className="w-10 h-10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      link: '/services',
    },
    {
      id: 2,
      titleKey: 'equipmentRentals',
      description: 'Flexible rental options for generators and power equipment.',
      icon: (
        <svg className="w-10 h-10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/services',
    },
    {
      id: 3,
      titleKey: 'maintenanceRepairs',
      description: 'Expert service and maintenance by certified technicians.',
      icon: (
        <svg className="w-10 h-10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/services',
    },
    {
      id: 4,
      titleKey: 'sparePartsSupply',
      description: 'Genuine spare parts for all major engine and generator brands.',
      icon: (
        <svg className="w-10 h-10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      link: '/services',
    },
    {
      id: 5,
      titleKey: 'generatorInstallation',
      description: 'Professional installation and commissioning services.',
      icon: (
        <svg className="w-10 h-10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: '/services',
    },
    {
      id: 6,
      titleKey: 'annualServiceContract',
      description: 'Comprehensive annual service contract including scheduled maintenance, priority emergency service, parts discount, and performance monitoring.',
      icon: (
        <svg className="w=10 h=10 text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-wings-navy mb-4">{t('ourServices')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('serviceDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-wings-navy mb-3">{t(service.titleKey)}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={service.link} 
                className="text-wings-orange hover:text-wings-navy transition-colors inline-flex items-center group"
              >
                {t('learnMore')}
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSummary;

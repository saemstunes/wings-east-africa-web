
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const partners = [
  { id: 1, name: 'Safaricom', logo: 'https://i.imgur.com/3Ma4M2H.png' },
  { id: 2, name: 'Davis & Shirtliff', logo: 'https://i.imgur.com/aKBCcDv.png' },
  { id: 3, name: 'Lister Petter', logo: 'https://i.imgur.com/5HOYAVO.png' },
  { id: 4, name: 'Kenya Power', logo: 'https://i.imgur.com/iGrVCMv.png' },
  { id: 5, name: 'Total Energies', logo: 'https://i.imgur.com/5KzthvD.png' },
];

const Partners = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { t } = useLanguage();
  
  return (
    <section className="bg-gray-50 py-8 sm:py-12">
      <div className="container-custom">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-wings-navy mb-6 sm:mb-8">
          {t('ourPartners')}
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(partner.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className={`h-12 sm:h-16 md:h-20 object-contain transition-opacity duration-300' ${
                  hoveredId !== null && hoveredId !== partner.id ? 'opacity-50' : 'opacity-100'
                } ${partner.name === 'Safaricom' ? 'h-16 sm:h-20 md:h-24' : 'h-12 sm:h-16 md:h-20'}`}
              />
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-600 text-sm sm:text-base mt-6 sm:mt-8 max-w-lg mx-auto px-4">
          {t('partnersDescription')}
        </p>
      </div>
    </section>
  );
};

export default Partners;

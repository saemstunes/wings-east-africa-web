
import { useState } from 'react';

const partners = [
  { id: 1, name: 'Safaricom', logo: 'https://drive.google.com/uc?export=view&id=1xTNXH9Qx2S-7aXiHrKC8eseELLZG_uUQ' },
  { id: 2, name: 'Davis & Shirtliff', logo: 'https://via.placeholder.com/200x80?text=Davis+%26+Shirtliff' },
  { id: 3, name: 'Lister Petter', logo: 'https://via.placeholder.com/200x80?text=Lister+Petter' },
  { id: 4, name: 'Kenya Power', logo: 'https://via.placeholder.com/200x80?text=Kenya+Power' },
  { id: 5, name: 'Total Energies', logo: 'https://via.placeholder.com/200x80?text=Total+Energies' },
];

const Partners = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  return (
    <section className="bg-gray-50 py-12">
      <div className="container-custom">
        <h2 className="text-center text-2xl font-bold text-wings-navy mb-8">
          Our Trusted Partners
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
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
                className={`h-12 md:h-16 object-contain transition-opacity duration-300 ${
                  hoveredId !== null && hoveredId !== partner.id ? 'opacity-50' : 'opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-600 mt-8 max-w-lg mx-auto">
          Wings Ltd. partners with leading brands to deliver the highest quality engineering solutions across East Africa.
        </p>
      </div>
    </section>
  );
};

export default Partners;

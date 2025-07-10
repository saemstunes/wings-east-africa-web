
import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the types for our language context
type Language = 'en' | 'sw';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
};

// Create translation data
export const translationData = {
  en: {
    // Navigation
    home: 'Home',
    aboutPage: 'About Us',
    servicesPage: 'Services & Products',
    contactPage: 'Contact',
    makeInquiry: 'Call',
    requestQuoteNav: 'Request a Quote',
    getInTouch: 'Get in Touch',
    companyName: 'Wings Engineering Services Limited',
    companyShort: 'Wings (Ltd.)',
    
    // Home page
    ourProducts: 'Our Products & Solutions',
    productSubtitle: 'Explore our range of high-quality engineering products and solutions designed to meet your power needs',
    viewAll: 'View All Products',
    learnMore: 'Learn More',
    ourServices: 'Our Services',
    serviceDescription: 'Wings Ltd. offers comprehensive engineering solutions for power generation needs across East Africa.',
    
    // Products
    industrialGenerators: 'Industrial Generators',
    dieselEngines: 'Diesel Engines',
    spareParts: 'Spare Parts',
    installationServices: 'Installation Services',
    
    // Categories
    powerGeneration: 'Power Generation',
    engineCategory: 'Engines',
    maintenanceCategory: 'Maintenance',
    serviceCategory: 'Services',
    
    // Services
    engineSales: 'Engine & Generator Sales',
    equipmentRentals: 'Equipment Rentals',
    maintenanceRepairs: 'Maintenance & Repairs',
    sparePartsSupply: 'Spare Parts Supply',
    generatorInstallation: 'Generator Installation',
    
    // Testimonials
    clientsSay: 'What Our Clients Say',
    
    // Partners
    ourPartners: 'Our Trusted Partners',
    partnersDescription: 'Wings Ltd. partners with leading brands to deliver the highest quality engineering solutions across East Africa.',
    
    // Calls to action
    aboutUsAction: 'About Us',
    contactUsAction: 'Contact Us',
    requestQuote: 'Request a Quote',
    
    // Footer
    quickLinks: 'Quick Links',
    contactUsFooter: 'Contact Us',
    
    // Company info
    companyDesc: 'Leading provider of engine and generator solutions across East Africa. Trusted by businesses and institutions since 2005.',
    poweringEastAfrica: 'Powering East Africa\'s Industry',
    companyHistory: 'For over 15 years, Wings Engineering Service Limited has been a trusted name in engineering excellence. We provide high-quality engines, generators, and power solutions to businesses and institutions throughout Kenya, Uganda, Tanzania, and beyond.',
    expertTeam: 'Our team of certified engineers and technicians deliver expert installation, maintenance, and 24/7 support services to ensure your operations run smoothly without interruption.'
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    aboutPage: 'Kutuhusu',
    servicesPage: 'Huduma na Bidhaa',
    contactPage: 'Wasiliana',
    makeInquiry: 'Piga',
    requestQuoteNav: 'Omba Nukuu ya Bei',
    getInTouch: 'Wasiliana Nasi',
    companyName: 'Wings Engineering Services Limited',
    companyShort: 'Wings (Ltd.)',
    
    // Home page
    ourProducts: 'Bidhaa & Suluhisho Zetu',
    productSubtitle: 'Chunguza bidhaa zetu za ubora wa juu za uhandisi na suluhisho zilizoundwa kukidhi mahitaji yako ya nishati',
    viewAll: 'Tazama Bidhaa Zote',
    learnMore: 'Jifunze Zaidi',
    ourServices: 'Huduma Zetu',
    serviceDescription: 'Wings Ltd. inatoa suluhisho kamili za uhandisi kwa mahitaji ya uzalishaji wa nguvu katika Afrika Mashariki.',
    
    // Products
    industrialGenerators: 'Jenereta za Viwanda',
    dieselEngines: 'Injini za Dizeli',
    spareParts: 'Vipuri',
    installationServices: 'Huduma za Ufungaji',
    
    // Categories
    powerGeneration: 'Uzalishaji wa Nguvu',
    engineCategory: 'Injini',
    maintenanceCategory: 'Matengenezo',
    serviceCategory: 'Huduma',
    
    // Services
    engineSales: 'Mauzo ya Injini na Jenereta',
    equipmentRentals: 'Ukodishaji wa Vifaa',
    maintenanceRepairs: 'Matengenezo na Ukarabati',
    sparePartsSupply: 'Ugavi wa Vipuri',
    generatorInstallation: 'Ufungaji wa Jenereta',
    
    // Testimonials
    clientsSay: 'Wateja Wetu Wanasema',
    
    // Partners
    ourPartners: 'Washirika Wetu Wanaoaminika',
    partnersDescription: 'Wings Ltd. inashirikiana na biashara zinazojulikana ili kutoa suluhisho za uhandisi za ubora wa juu katika Afrika Mashariki.',
    
    // Calls to action
    aboutUsAction: 'Kuhusu Sisi',
    contactUsAction: 'Wasiliana Nasi',
    requestQuote: 'Omba Nukuu ya Bei',
    
    // Footer
    quickLinks: 'Viungo vya Haraka',
    contactUsFooter: 'Wasiliana Nasi',
    
    // Company info
    companyDesc: 'Mtoa huduma mwenye uongozi katika injini na suluhisho za jenereta katika Afrika Mashariki. Inaaminiwa na biashara na taasisi tangu 2005.',
    poweringEastAfrica: 'Kuwezesha Viwanda vya Afrika Mashariki',
    companyHistory: 'Kwa zaidi ya miaka 15, Wings Engineering Service Limited imekuwa jina linaloaminika katika ubora wa uhandisi. Tunatoa injini za ubora wa juu, jenereta, na suluhisho za nguvu kwa biashara na taasisi katika Kenya, Uganda, Tanzania, na zaidi.',
    expertTeam: 'Timu yetu ya wahandisi na mafundi waliothibitishwa wanatoa huduma za ufungaji, matengenezo, na usaidizi wa saa 24/7 ili kuhakikisha shughuli zako zinaendelea vizuri bila kutatizika.'
  }
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the context provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the stored language or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('wings-language') as Language;
      return savedLang || 'en';
    }
    return 'en';
  });

  // Set language and store in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wings-language', lang);
  };

  // Ensure we update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('wings-language', language);
    // Dispatch a storage event so other tabs can listen for changes
    window.dispatchEvent(new Event('storage'));
  }, [language]);

  // Translation helper function
  const t = (key: string): string => {
    return translationData[language][key as keyof typeof translationData[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationData, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

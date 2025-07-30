import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ShinyText from '@/components/ui/ShinyText';
import ClickSpark from '@/components/ui/ClickSpark'; // Add ClickSpark import

const Footer = () => {
  const { t } = useLanguage();
  
  const services = [
    { name: 'engineSales', link: '/services' },
    { name: 'equipmentRentals', link: '/services' },
    { name: 'maintenanceRepairs', link: '/services' },
    { name: 'sparePartsSupply', link: '/services' },
    { name: 'generatorInstallation', link: '/services' }
  ];
  
  const quickLinks = [
    { name: 'home', link: '/' },
    { name: 'aboutPage', link: '/about' },
    { name: 'servicesPage', link: '/services' },
    { name: 'contactPage', link: '/contact' },
    { name: 'requestQuote', link: '#' }
  ];

  return (
    <footer className="bg-wings-dark text-white dark:bg-wings-dark transition-colors duration-300">
    <ClickSpark
            sparkColor="#ffcc00"
            sparkSize={8}
            sparkRadius={25}
            sparkCount={6}
            duration={500}
          >
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Spark Effect */}
          
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.imgur.com/zCRXN6K.png" 
                  alt={t('companyName')} 
                  className="h-10 w-auto mr-2"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.imgur.com/zCRXN6K.png";
                  }}
                />
                <h4 className="text-xl font-bold">{t('companyName')}</h4>
              </div>
              <p className="text-gray-300">
                {t('companyDesc')}
              </p>
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://www.facebook.com/WingsEngineeringServicesLimited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/wingsengineeringserviceskenya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 011.675 1.093 4.92 4.92 0 011.093 1.675c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 01-1.093 1.675 4.92 4.92 0 01-1.675 1.093c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 01-1.675-1.093 4.92 4.92 0 01-1.093-1.675c-.163-.457-.347-1.257-.403-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 011.093-1.675 4.92 4.92 0 011.675-1.093c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.773.129 4.822.307 4.042.593a6.903 6.903 0 00-2.49 1.637A6.903 6.903 0 00.593 4.042C.307 4.822.129 5.773.07 7.052.012 8.332 0 8.741 0 12c0 3.259.012 3.668.07 4.948.059 1.279.237 2.23.523 3.01a6.903 6.903 0 001.637 2.49 6.903 6.903 0 002.49 1.637c.78.286 1.731.464 3.01.523C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.279-.059 2.23-.237 3.01-.523a6.903 6.903 0 002.49-1.637 6.903 6.903 0 001.637-2.49c.286-.78.464-1.731.523-3.01.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.059-1.279-.237-2.23-.523-3.01a6.903 6.903 0 00-1.637-2.49A6.903 6.903 0 0019.958.593c-.78-.286-1.731-.464-3.01-.523C15.668.012 15.259 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">{t('ourServices')}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link to={service.link} className="text-gray-300 hover:text-white flex items-center">
                    <Check size={16} className="mr-2 text-wings-orange" />
                    {t(service.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.link} className="text-gray-300 hover:text-white">
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info with Spark Effect */}
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={6}
            sparkRadius={15}
            sparkCount={6}
            duration={500}
          >
            <div>
              <h4 className="text-xl font-bold mb-6">{t('contactUsFooter')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="mr-3 mt-1 text-wings-orange" size={18} />
                    <a href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=Wings+Engineering+Services+Ltd,+Kenyatta+Highway,+Thika" className="text-gray-300 hover:text-white">
                  <span className="text-gray-300 hover:text-white">                  
                    Township, Kenyatta Highway, <br />
                    Thika, Kenya
                    </span>
                    </a>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 text-wings-orange" size={18} />
                  <ShinyText
                    text="+254 716 052 776"
                    disabled={false}
                    speed={3}
                    className="text-gray-300 hover:text-white transition-colors"
                    shineColor="rgba(255, 165, 0, 0.8)"  // Orange tint to match brand
                    stopOnHover={true}  // Effect will stop on hover
                    size="1rem"
                    />
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 text-wings-orange" size={18} />
                  <a href="mailto:sales@wingsengineeringserviceslimited.com?cc=info@wingsengineeringserviceslimited.com&subject=RE:&body=Dear%20sir/madam,%0A%0AI%20am%20writing%20to%20you%20to..." className="text-gray-300 hover:text-white">
                    Email Us (Inquiries)
                  </a>
                </li>
              </ul>
            </div>
          </ClickSpark>
        </div>
      </div>
    </ClickSpark>
        
      
      <div className="bg-wings-dark dark:bg-black py-4 transition-colors duration-300">
        <div className="container-custom text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Wings Engineering Services Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

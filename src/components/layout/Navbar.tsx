import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../../hooks/use-theme';
import { motion, AnimatePresence } from 'framer-motion';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '../../contexts/LanguageContext';
import ClickSpark from '@/components/ui/ClickSpark'; // Add ClickSpark import

const navigation = [
  { name: 'home', href: '/' },
  { name: 'aboutPage', href: '/about' },
  { name: 'servicesPage', href: '/services' },
  { name: 'contactPage', href: '/contact' },
];

// Language toggle component
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };
  
  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${language === 'en' ? 'font-medium text-wings-navy dark:text-white' : 'text-gray-500 dark:text-gray-300'}`}>
        EN
      </span>
      
      <div className="relative focus-within:ring-container">
        <Toggle
          pressed={language === 'sw'}
          onPressedChange={toggleLanguage}
          aria-label="Toggle language"
          className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex justify-start focus:outline-none focus:ring-2 focus:ring-wings-navy dark:focus:ring-wings-orange focus:ring-opacity-50"
        >
          <motion.div 
            className="bg-wings-navy dark:bg-wings-orange w-4 h-4 rounded-full"
            animate={{ 
              translateX: language === 'sw' ? '100%' : '0%' 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30 
            }}
          />
        </Toggle>
      </div>
      
      <span className={`text-sm ${language === 'sw' ? 'font-medium text-wings-navy dark:text-white' : 'text-gray-500 dark:text-gray-300'}`}>
        SW
      </span>
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, t } = useLanguage();

  const navItems = navigation.map(item => ({
    ...item,
    name: t(item.name)
  }));

  const companyName = t('companyName');
  const companyShort = t('companyShort');

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-wings-dark/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-wings-dark/60 shadow-sm transition-colors duration-300">
      <nav className="container-custom mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          {/* Logo with Spark Effect */}
          <ClickSpark
            sparkColor={theme === 'dark' ? "#ffcc00" : "#1a3a6c"}
            sparkSize={6}
            sparkRadius={15}
            sparkCount={6}
            duration={500}
          >
            <Link to="/" className="flex items-center">
              <div className="w-auto h-10 mr-3">
                {theme === 'dark' ? (
                  <img 
                    src="/logo-light.png" 
                    alt={companyName}
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://i.imgur.com/zCRXN6K.png";
                    }}
                  />
                ) : (
                  <img 
                    src="https://i.imgur.com/zCRXN6K.png" 
                    alt={companyName}
                    className="h-full w-auto object-contain rounded-md" 
                    onError={(e) => {
                      e.currentTarget.src = "https://i.imgur.com/zCRXN6K.png";
                    }}
                  />
                )}
              </div>
              <span className="text-xl font-bold text-wings-navy dark:text-white font-poppins hidden md:block">
                {companyName}
              </span>
              <span className="text-xl font-bold text-wings-navy dark:text-white font-poppins md:hidden">
                {companyShort}
              </span>
            </Link>
          </ClickSpark>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? 'text-wings-navy dark:text-white font-medium border-b-2 border-wings-orange'
                  : 'text-gray-500 dark:text-gray-300 hover:text-wings-navy dark:hover:text-white'
              } transition-colors duration-300 py-1 text-sm lg:text-base`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-5">
            {/* Theme Toggle with Animation */}
            <ClickSpark
              sparkColor={theme === 'dark' ? "#ffcc00" : "#1a3a6c"}
              sparkSize={4}
              sparkRadius={10}
              sparkCount={4}
              duration={400}
            >
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence initial={false} mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Sun size={20} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <Moon size={20} className="text-wings-navy" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </ClickSpark>
            
            {/* Language Toggle */}
            <ClickSpark
              sparkColor={theme === 'dark' ? "#ffcc00" : "#1a3a6c"}
              sparkSize={4}
              sparkRadius={10}
              sparkCount={4}
              duration={400}
            >
              <div className="flex items-center space-x-2 ml-[-10px]">
                <LanguageToggle />
              </div>
            </ClickSpark>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ClickSpark
            sparkColor={theme === 'dark' ? "#ffcc00" : "#1a3a6c"}
            sparkSize={4}
            sparkRadius={10}
            sparkCount={4}
            duration={400}
          >
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence initial={false} mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <Sun size={20} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <Moon size={20} className="text-wings-navy" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </ClickSpark>
          
          <ClickSpark
            sparkColor={theme === 'dark' ? "#ffcc00" : "#1a3a6c"}
            sparkSize={4}
            sparkRadius={10}
            sparkCount={4}
            duration={400}
          >
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-wings-navy dark:text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </ClickSpark>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-wings-dark py-2 px-4 shadow-lg transition-colors duration-300"
          >
            <div className="space-y-1 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${
                    location.pathname === item.href
                      ? 'text-wings-navy dark:text-white font-medium'
                      : 'text-gray-500 dark:text-gray-300'
                  } py-3 border-b border-gray-100 dark:border-gray-700`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 py-3">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

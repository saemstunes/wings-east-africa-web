
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services & Products', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white sticky top-0 shadow-sm z-50">
      <nav className="container-custom mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-wings-navy font-poppins">Wings Ltd.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? 'text-wings-navy font-medium border-b-2 border-wings-orange'
                  : 'text-gray-500 hover:text-wings-navy'
              } transition-colors duration-300 py-1`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">EN</span>
            <div className="w-10 h-6 bg-gray-200 rounded-full p-1 flex items-center">
              <div className="bg-wings-navy w-4 h-4 rounded-full transform translate-x-0"></div>
            </div>
            <span className="text-sm text-gray-500">SW</span>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-wings-navy"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg animate-fade-in">
          <div className="space-y-1 flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  location.pathname === item.href
                    ? 'text-wings-navy font-medium'
                    : 'text-gray-500'
                } py-3 border-b border-gray-100`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 py-3">
              <span className="text-sm text-gray-500">EN</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full p-1 flex items-center">
                <div className="bg-wings-navy w-4 h-4 rounded-full transform translate-x-0"></div>
              </div>
              <span className="text-sm text-gray-500">SW</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

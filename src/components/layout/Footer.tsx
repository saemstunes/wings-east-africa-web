
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Check } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wings-navy text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6">Wings Ltd.</h4>
            <p className="text-gray-300">
              Leading provider of engine and generator solutions across East Africa. Trusted by businesses and institutions since 2005.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2zm4.11 8.32c0 .078 0 .156-.016.234a5.51 5.51 0 01-1.399 3.594 5.656 5.656 0 01-4.66 1.75 5.767 5.767 0 01-3.208-.938c.166.02.333.031.5.031a4.09 4.09 0 002.53-.87 2.04 2.04 0 01-1.908-1.417c.126.02.252.032.378.032.183 0 .366-.024.536-.071a2.039 2.039 0 01-1.636-2v-.025a2.04 2.04 0 00.924.255 2.038 2.038 0 01-.931-1.698c0-.37.1-.72.275-1.02A5.8 5.8 0 0011.5 9.538a2.034 2.034 0 013.474-1.857c.72-.14 1.398-.4 2.004-.758a2.032 2.032 0 01-.894 1.123 4.078 4.078 0 001.168-.317c-.274.41-.62.77-1.017 1.059.014.13.014.258.014.387z"/>
                </svg>
              </a>
              <a href="#" className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center">
                  <Check size={16} className="mr-2 text-wings-orange" />
                  Engine & Generator Sales
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center">
                  <Check size={16} className="mr-2 text-wings-orange" />
                  Equipment Rentals
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center">
                  <Check size={16} className="mr-2 text-wings-orange" />
                  Maintenance & Repairs
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center">
                  <Check size={16} className="mr-2 text-wings-orange" />
                  Spare Parts Supply
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white flex items-center">
                  <Check size={16} className="mr-2 text-wings-orange" />
                  Generator Installation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services & Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 text-wings-orange" size={18} />
                <span className="text-gray-300">
                  123 Industrial Area, <br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-wings-orange" size={18} />
                <a href="tel:+254123456789" className="text-gray-300 hover:text-white">
                  +254 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-wings-orange" size={18} />
                <a href="mailto:info@wingsltd.com" className="text-gray-300 hover:text-white">
                  info@wingsltd.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-wings-dark py-4">
        <div className="container-custom text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Wings Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

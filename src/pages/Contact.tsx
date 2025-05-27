
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import PartRequestPreview from '../components/contact/PartRequestPreview';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';

const Contact = () => {
  const [requestImage, setRequestImage] = useState<string | null>(null);
  const [requestMetadata, setRequestMetadata] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check URL parameters first (for backward compatibility)
    const urlParams = new URLSearchParams(window.location.search);
    const urlImage = urlParams.get('requestImage');
    const urlMetadata = urlParams.get('requestMetadata');
    
    if (urlImage && urlMetadata) {
      try {
        const decodedImage = decodeURIComponent(urlImage);
        const decodedMetadata = JSON.parse(decodeURIComponent(urlMetadata));
        
        // Check if URL length is reasonable
        if (window.location.href.length < 2000) {
          setRequestImage(decodedImage);
          setRequestMetadata(decodedMetadata);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing URL parameters:', error);
      }
    }
    
    // Check sessionStorage
    try {
      const storedImage = sessionStorage.getItem('requestImage');
      const storedMetadata = sessionStorage.getItem('requestMetadata');
      
      if (storedImage && storedMetadata) {
        setRequestImage(storedImage);
        const metadata = JSON.parse(storedMetadata);
        setRequestMetadata(metadata);
        console.log('Successfully loaded request data from sessionStorage');
      }
    } catch (error) {
      console.error('Error loading from sessionStorage:', error);
    }
    
    setIsLoading(false);
  }, []);
  
  const clearRequestData = () => {
    // Clear sessionStorage
    try {
      sessionStorage.removeItem('requestImage');
      sessionStorage.removeItem('requestMetadata');
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
    
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('requestImage');
    url.searchParams.delete('requestMetadata');
    window.history.replaceState({}, '', url.toString());
    
    // Clear state
    setRequestImage(null);
    setRequestMetadata(null);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wings-orange mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-wings-navy py-16 sm:py-20">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1601342550031-d6df73676153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1470&auto=format&fit=crop" 
              alt="Engineering office" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white heading-lg mb-4 sm:mb-6">Contact Us</h1>
              <p className="text-white/90 text-lg sm:text-xl">
                Get in touch with our team for inquiries, quotes, or support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-12 sm:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="heading-md text-wings-navy dark:text-white mb-4 sm:mb-6">Send Us a Message</h2>
                
                {/* Part Request Preview */}
                {requestImage && requestMetadata && (
                  <PartRequestPreview 
                    imageData={requestImage} 
                    metadata={requestMetadata} 
                    onClear={clearRequestData} 
                  />
                )}
                
                <ContactForm 
                  requestImage={requestImage}
                  requestMetadata={requestMetadata}
                  onClearRequest={clearRequestData}
                />
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-6 sm:py-8">
          <div className="container-custom">
            <div className="relative bg-gray-200 dark:bg-gray-800 h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
              <iframe
                title="Wings Engineering Services Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.710869066814!2d37.0880112!3d-1.041453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4fb6d8dca0f3%3A0x926d175be64a844f!2sWings%20Engineering%20Services%20Ltd!5e0!3m2!1sen!2ske!4v1715418916812!5m2!1sen!2ske"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-white dark:bg-gray-900 rounded-xl shadow-md p-3 sm:p-4 max-w-xs z-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">Wings Engineering Services Ltd</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">Township, Kenyatta Highway, Thika</p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=Wings+Engineering+Services+Ltd,+Kenyatta+Highway,+Thika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="heading-md text-wings-navy dark:text-white mb-4">Our Service Areas</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
                Wings Engineering Services Ltd. provides engineering solutions throughout East Africa, with focus on the following regions:
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kampala', 'Dar es Salaam'].map((city) => (
                <div key={city} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <h3 className="text-wings-navy dark:text-white font-medium text-sm sm:text-base">{city}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254716052776" />
    </>
  );
};

export default Contact;

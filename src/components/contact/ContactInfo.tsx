
const ContactInfo = () => {
  return (
    <div>
      <h2 className="heading-md text-wings-navy dark:text-white mb-6">Contact Information</h2>
      
      <div className="space-y-6 sm:space-y-8">
        <div className="flex">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-wings-navy/10 dark:bg-wings-navy/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-wings-navy dark:text-white">Visit Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <a href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=Wings+Engineering+Services+Ltd,+Kenyatta+Highway,+Thika" className="text-gray-600 dark:text-gray-300 hover:text-wings-orange">
                Township, Kenyatta Highway,<br />
                Thika, Kenya
              </a>  
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Monday-Friday: 6am - 5pm<br />
              Saturday: 8am - 3pm
            </p>
          </div>
        </div>
        
        <div className="flex">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-wings-navy/10 dark:bg-wings-navy/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-wings-navy dark:text-white">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <a href="tel:+254716052776" className="hover:text-wings-orange transition-colors">
                +254 716 052 776
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <a href="tel:+254987654321" className="hover:text-wings-orange transition-colors">
                +254 987 654 321
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-wings-navy/10 dark:bg-wings-navy/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-wings-navy dark:text-white">Email Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <a href="mailto:info@wingsengineeringservices.com" className="hover:text-wings-orange transition-colors">
                info@wingsengineeringservices.com
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <a href="mailto:sales@wingsengineeringservices.com" className="hover:text-wings-orange transition-colors">
                sales@wingsengineeringservices.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-wings-navy/10 dark:bg-wings-navy/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.04 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12.04 2zm4.11 8.32c0 .078 0 .156-.016.234a5.51 5.51 0 01-1.399 3.594 5.656 5.656 0 01-4.66 1.75 5.767 5.767 0 01-3.208-.938c.166.02.333.031.5.031a4.09 4.09 0 002.53-.87 2.04 2.04 0 01-1.908-1.417c.126.02.252.032.378.032.183 0 .366-.024.536-.071a2.039 2.039 0 01-1.636-2v-.025a2.04 2.04 0 00.924.255 2.038 2.038 0 01-.931-1.698c0-.37.1-.72.275-1.02A5.8 5.8 0 0011.5 9.538a2.034 2.034 0 013.474-1.857c.72-.14 1.398-.4 2.004-.758a2.032 2.032 0 01-.894 1.123 4.078 4.078 0 001.168-.317c-.274.41-.62.77-1.017 1.059.014.13.014.258.014.387z"/>
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-wings-navy dark:text-white">WhatsApp Us</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
              For quick responses, chat with us on WhatsApp
            </p>
            <button 
              onClick={() => {
                window.open('https://wa.me/254716052776?text=Hello%20Team%20Wings,%20I%20have%20a%20question%20about%20your%20services.', '_blank');
              }}
              className="mt-2 flex items-center text-green-600 hover:text-green-700 transition-colors text-sm"
            >
              <span>Start Chat</span>
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-wings-navy dark:text-white mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/WingsEngineeringServicesLimited/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/wingsengineeringserviceskenya/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5 text-wings-navy dark:text-wings-orange" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

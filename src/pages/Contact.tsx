
import { useState, FormEvent } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
      setLoading(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-wings-navy py-20">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1601342550031-d6df73676153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1470&auto=format&fit=crop" 
              alt="Engineering office" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white heading-lg mb-6">Contact Us</h1>
              <p className="text-white/90 text-xl">
                Get in touch with our team for inquiries, quotes, or support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="heading-md text-wings-navy mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                    >
                      <option value="">Select a subject</option>
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Service Request">Service Request</option>
                      <option value="Parts Request">Spare Parts Request</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="General Information">General Information</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wings-navy"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn-primary py-3 px-6"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="lg:col-span-2">
                <h2 className="heading-md text-wings-navy mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-wings-navy/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-wings-navy">Visit Us</h3>
                      <p className="text-gray-600 mt-1">
                        Township, Kenyatta Highway,<br />
                        Thika, Kenya
                      </p>
                      <p className="text-gray-500 mt-1">
                        Monday-Friday: 6am - 5pm<br />
                        Saturday: 8am - 3pm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-wings-navy/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-wings-navy">Call Us</h3>
                      <p className="text-gray-600 mt-1">
                        <a href="tel:+254123456789" className="hover:text-wings-orange transition-colors">
                          +254 719 719 991
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">
                        <a href="tel:+254987654321" className="hover:text-wings-orange transition-colors">
                          +254 987 654 321
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-wings-navy/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-wings-navy">Email Us</h3>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:sales@wingsengineeringservices.com" className="hover:text-wings-orange transition-colors">
                          info@wingsltd.com
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:sales@wingsengineeringservices.com" className="hover:text-wings-orange transition-colors">
                          support@wingsltd.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-wings-navy/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-wings-navy">WhatsApp Us</h3>
                      <p className="text-gray-600 mt-1">
                        For quick responses, chat with us on WhatsApp
                      </p>
                      <button 
                        onClick={() => {
                          window.open('https://wa.me/254123456789?text=Hello,%20I%20have%20a%20question%20about%20your%20services.', '_blank');
                        }}
                        className="mt-2 flex items-center text-green-600 hover:text-green-700 transition-colors"
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
                  <h3 className="text-lg font-semibold text-wings-navy mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors">
                      <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors">
                      <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2zm4.11 8.32c0 .078 0 .156-.016.234a5.51 5.51 0 01-1.399 3.594 5.656 5.656 0 01-4.66 1.75 5.767 5.767 0 01-3.208-.938c.166.02.333.031.5.031a4.09 4.09 0 002.53-.87 2.04 2.04 0 01-1.908-1.417c.126.02.252.032.378.032.183 0 .366-.024.536-.071a2.039 2.039 0 01-1.636-2v-.025a2.04 2.04 0 00.924.255 2.038 2.038 0 01-.931-1.698c0-.37.1-.72.275-1.02A5.8 5.8 0 0011.5 9.538a2.034 2.034 0 013.474-1.857c.72-.14 1.398-.4 2.004-.758a2.032 2.032 0 01-.894 1.123 4.078 4.078 0 001.168-.317c-.274.41-.62.77-1.017 1.059.014.13.014.258.014.387z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors">
                      <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.02 0H12C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12.02 0zM16 8.56c.36.36.58.85.58 1.4 0 1.1-.9 2-2 2-.55 0-1.04-.22-1.4-.58l-1.58-1.58L10 11.42 8.42 13l1.58 1.58c.36.36.58.85.58 1.4 0 1.1-.9 2-2 2-.55 0-1.04-.22-1.4-.58L5.4 15.4C4.52 14.52 4 13.32 4 12c0-1.32.52-2.52 1.4-3.4L7.4 6.6C8.28 5.72 9.48 5.2 10.8 5.2c1.32 0 2.52.52 3.4 1.4L16 8.56zm2.62-4.96C17.42 2.52 16.22 2 14.9 2c-1.32 0-2.52.52-3.4 1.4L9.6 5.4C8.72 6.28 8.2 7.48 8.2 8.8c0 1.32.52 2.52 1.4 3.4l1.58 1.58L12 12l-1.58-1.58C10.06 10.06 10 9.54 10 9c0-2.76 2.24-5 5-5 .54 0 1.06.06 1.56.18L18.2 5.6z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors">
                      <svg className="w-5 h-5 text-wings-navy" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* Map Section */}
<section className="py-8">
  <div className="container-custom">
    <div className="relative bg-gray-200 h-[400px] rounded-lg overflow-hidden">
      {/* Embedded Google Map */}
      <iframe
        title="Wings Engineering Services Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.710869066814!2d37.0880112!3d-1.041453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4fb6d8dca0f3%3A0x926d175be64a844f!2sWings%20Engineering%20Services%20Ltd!5e0!3m2!1sen!2ske!4v1715418916812!5m2!1sen!2ske"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Map Marker Popup */}
      <div className="absolute top-8 left-8 bg-white rounded-xl shadow-md p-4 max-w-xs z-10">
        <h3 className="text-lg font-semibold text-gray-800">Wings Engineering Services Ltd</h3>
        <p className="text-sm text-gray-600 mb-2">123 Industrial Area, Kenyatta Highway, Thika</p>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Wings+Engineering+Services+Ltd,+Kenyatta+Highway,+Thika"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Get Directions
        </a>
      </div>
    </div>
  </div>
</section>


        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy mb-4">Our Service Areas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Wings Ltd. provides engineering solutions throughout East Africa, with focus on the following regions:
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Nairobi</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Mombasa</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Kisumu</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Nakuru</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Kampala</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-wings-navy font-medium">Dar es Salaam</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254719 719991" />
    </>
  );
};

export default Contact;

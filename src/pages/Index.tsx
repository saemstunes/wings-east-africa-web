import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import ServicesSummary from '../components/home/ServicesSummary';
import Testimonials from '../components/home/Testimonials';
import ProductShowcase from '../components/home/ProductShowcase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import FloatingInquiryTab from '../components/ui/FloatingInquiryTab';
import SplashScreen from '../components/ui/SplashScreen';
import AnimatedSection from '../components/ui/AnimatedSection';
import ClickSpark from '../components/ui/ClickSpark'; // Import ClickSpark
import { Eye, Flag } from 'lucide-react';

const Index = () => {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>
        {/* Hero with spark effect */}
        <ClickSpark
          sparkColor="#ffcc00"
          sparkSize={8}
          sparkRadius={20}
          sparkCount={12}
          duration={600}
        >
          <Hero />
        </ClickSpark>

        <AnimatedSection delay={2}>
          <Partners />
        </AnimatedSection>

        {/* Product showcase with spark effect */}
        <AnimatedSection delay={3}>
          <ClickSpark
            sparkColor="#00aaff"
            sparkSize={8}
            sparkRadius={25}
            sparkCount={10}
            duration={500}
          >
            <ProductShowcase />
          </ClickSpark>
        </AnimatedSection>

        <AnimatedSection delay={4}>
          <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="heading-lg text-wings-navy dark:text-white mb-6">Powering East Africa's Industry</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    For over 15 years, Wings Engineering Service Limited has been a trusted name in engineering excellence. We provide high-quality engines, generators, and power solutions to businesses and institutions throughout Kenya, Uganda, Tanzania, and beyond.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Our team of certified engineers and technicians deliver expert installation, maintenance, and 24/7 support services to ensure your operations run smoothly without interruption.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {/* Button with spark effect */}
                    <ClickSpark
                      sparkColor="#ffffff"
                      sparkSize={6}
                      sparkRadius={15}
                      sparkCount={8}
                      extraScale={1.5}
                    >
                      <a href="/about" className="btn-primary">
                        About Us
                      </a>
                    </ClickSpark>
                    
                    {/* Button with spark effect */}
                    <ClickSpark
                      sparkColor="#ffffff"
                      sparkSize={6}
                      sparkRadius={15}
                      sparkCount={8}
                      extraScale={1.5}
                    >
                      <a href="/contact" className="btn-outline">
                        Contact Us
                      </a>
                    </ClickSpark>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop"
                    alt="Engineer working on generator" 
                    className="w-full h-auto object-cover pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={5}>
          <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container-custom">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="heading-lg text-wings-navy dark:text-white mb-4">
                  Our Guiding Principles
                </h2>
                <div className="w-20 h-1 bg-wings-gold mx-auto"></div>
              </div>
              
              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                {/* Vision Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-wings-blue transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-start mb-4">
                    <div className="bg-gray-90 dark:bg-gray-900/50 p-3 rounded-full mr-4">
                      <Eye className="h-6 w-6 text-wings-blue dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-wings-navy dark:text-white">Our Vision</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pl-14">
                    To be the leading provider of dependable engineering solutions across East Africa, 
                    empowering industries through innovative power technologies and unwavering service excellence.
                  </p>
                </div>
                
                {/* Mission Card */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-wings-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-start mb-4">
                    <div className="bg-gray-90 dark:bg-gray-900/50 p-3 rounded-full mr-4">
                      <Flag className="h-6 w-6 text-wings-blue dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-wings-navy dark:text-white">Our Mission</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pl-14">
                    To deliver high-quality engines, generators, and power systems with precision and reliability, 
                    ensuring seamless operations through expert installation, proactive maintenance, and 24/7 support.
                  </p>
                </div>
              </div>
              
              {/* Core Values */}
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-wings-navy dark:text-white mb-2">
                  Our Core Values
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  The foundation of everything we do at Wings Engineering
                </p>
              </div>
              
              {/* Values Grid - Using only brand colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                   "Reliability",
                   "Excellence",
                   "Integrity",
                   "Customer-Centricity",
                   "Innovation",
                   "Teamwork",
                   "Sustainability"
                 ].map((value, index) => (
              <div 
               key={index}
               className="group p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:shadow-lg dark:hover:shadow-xl/50 hover:border-wings-gold"
              >
                <h4 className="font-bold text-lg mb-2 text-wings-navy dark:text-white group-hover:text-wings-gold transition-colors">
                  {value}
                </h4>
               <p className="text-gray-600 dark:text-gray-400 text-sm">
                 {(() => {
          switch(value) {
            case "Reliability": 
              return "Consistent, dependable power solutions that keep operations running without fail";
            case "Excellence": 
              return "Commitment to engineering precision and quality service in everything we do";
            case "Integrity": 
              return "Building trust through transparency, honesty, and professionalism";
            case "Customer-Centricity": 
              return "Putting clients first with tailored solutions and round-the-clock support";
            case "Innovation": 
              return "Embracing new technologies to offer cutting-edge power solutions";
            case "Teamwork": 
              return "Collaboration through shared expertise and mutual respect";
            case "Sustainability": 
              return "Responsible practices for long-term energy resilience and environmental stewardship";
            default: 
              return "";
          }
        })()}
        </p>
      </div>
    ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Services with spark effect */}
        <AnimatedSection delay={5}>
          <ClickSpark
            sparkColor="#ff6b6b"
            sparkSize={10}
            sparkRadius={20}
            sparkCount={15}
            duration={700}
          >
            <ServicesSummary />
          </ClickSpark>
        </AnimatedSection>

        <AnimatedSection delay={6}>
          <Testimonials />
        </AnimatedSection>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254716052776" />
      <FloatingInquiryTab />
    </>
  );
};

export default Index;

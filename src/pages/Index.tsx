
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

const Index = () => {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>
        <Hero />
        <AnimatedSection delay={2}>
          <Partners />
        </AnimatedSection>
        <AnimatedSection delay={3}>
          <ProductShowcase />
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
                    <a href="/about" className="btn-primary">
                      About Us
                    </a>
                    <a href="/contact" className="btn-outline">
                      Contact Us
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop"
                    alt="Engineer working on generator" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
        <AnimatedSection delay={5}>
          <ServicesSummary />
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

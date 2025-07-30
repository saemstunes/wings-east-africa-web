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

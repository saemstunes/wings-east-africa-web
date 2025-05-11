
import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import ServicesSummary from '../components/home/ServicesSummary';
import Testimonials from '../components/home/Testimonials';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <ServicesSummary />
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg text-wings-navy mb-6">Powering East Africa's Industry</h2>
                <p className="text-gray-700 mb-4">
                  For over 15 years, Wings Ltd. has been a trusted name in engineering excellence. We provide high-quality engines, generators, and power solutions to businesses and institutions throughout Kenya, Uganda, Tanzania, and beyond.
                </p>
                <p className="text-gray-700 mb-8">
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
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop"
                  alt="Engineer working on generator" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254123456789" />
    </>
  );
};

export default Index;

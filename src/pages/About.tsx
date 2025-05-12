
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const About = () => {
  const timeline = [
    { year: '2005', event: 'Wings Ltd. founded in Nairobi' },
    { year: '2008', event: 'Became official Lister Petter distributor for East Africa' },
    { year: '2012', event: 'Expanded operations to Eldoret and Kisumu' },
    { year: '2016', event: 'Launched 24/7 emergency repair services' },
    { year: '2019', event: 'Partnered with Safaricom for IoT generator monitoring' },
    { year: '2022', event: 'Opened a state-of-the-art service center in Mombasa' },
  ];

  const partners = [
    { id: 1, name: 'Safaricom', logo: 'https://i.imgur.com/3Ma4M2H.png' },
    { id: 2, name: 'Davis & Shirtliff', logo: 'https://i.imgur.com/aKBCcDv.png' },
    { id: 3, name: 'Lister Petter', logo: 'https://i.imgur.com/5HOYAVO.png' },
    { id: 4, name: 'Kenya Power', logo: 'https://i.imgur.com/iGrVCMv.png' },
    { id: 5, name: 'Total Energies', logo: 'https://i.imgur.com/5KzthvD.png' },
    { id: 6, name: 'Crown Paints', logo: 'https://via.placeholder.com/200x80?text=Crown+Paints' },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-wings-navy py-20">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.pexels.com/photos/31973806/pexels-photo-31973806/free-photo-of-historic-siemens-halske-generator-at-zeche-zollern.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2?q=80&w=1471&auto=format&fit=crop" 
              alt="Engineering equipment" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-white heading-lg mb-6">About Wings Ltd.</h1>
              <p className="text-white/90 text-xl">
                East Africa's trusted engineering partner for power generation solutions since 2005.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-md text-wings-navy mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Wings Ltd. was established in 2005 with a mission to provide reliable power solutions to businesses and institutions across East Africa. What started as a small engine repair shop has grown into a regional leader in power generation equipment and services.
                </p>
                <p className="text-gray-700 mb-4">
                  Our journey has been defined by a commitment to engineering excellence, customer satisfaction, and innovation. Today, we serve clients in Kenya, Uganda, Tanzania, Rwanda, and beyond, with a team of over 50 dedicated professionals.
                </p>
                <p className="text-gray-700">
                  As we continue to grow, our core values of safety, quality, and reliability remain at the heart of everything we do. We're proud to power East Africa's development through our comprehensive engineering solutions.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1470&auto=format&fit=crop" 
                  alt="Engineers working at Wings Ltd."
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-md text-wings-navy text-center mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-wings-navy"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex-1 px-4">
                        <div className={`p-6 bg-white rounded-lg shadow ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-xl font-semibold text-wings-navy">{item.year}</h3>
                          <p className="text-gray-700">{item.event}</p>
                        </div>
                      </div>
                      
                      {/* Center dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-wings-orange border-4 border-white z-10"></div>
                      
                      <div className="flex-1 px-4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide our business practices and relationships with clients, partners, and communities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-wings-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-wings-navy mb-3">Safety</h3>
                <p className="text-gray-600">
                  We prioritize safety in all our operations, from installations to maintenance, ensuring protection for our team, clients, and equipment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-wings-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-wings-navy mb-3">Quality</h3>
                <p className="text-gray-600">
                  We deliver excellence in every project, using only premium components and adhering to international engineering standards.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-wings-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-wings-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-wings-navy mb-3">Reliability</h3>
                <p className="text-gray-600">
                  We understand the critical nature of power solutions and commit to dependable service, products, and support you can count on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-md text-wings-navy mb-4">Our Strategic Partners</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We collaborate with industry-leading brands to deliver comprehensive engineering solutions to our clients.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center transition-transform hover:scale-105">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className={'h-12 object-contain' ${partner.name === 'Safaricom' ? 'h-24 md:h-32' : 'h-12'}
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-wings-navy">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="heading-md text-white mb-6">Ready to Work With Us?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Contact our team today to discuss your power generation needs and how Wings Ltd. can support your projects.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="btn-primary">
                  Contact Us
                </a>
                <a href="/services" className="btn-outline border-white text-white hover:bg-white hover:text-wings-navy">
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254123456789" />
    </>
  );
};

export default About;

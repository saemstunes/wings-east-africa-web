
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { Award, Users, Globe, Shield, Zap, Heart, Target, TrendingUp } from 'lucide-react';

const AboutEnhanced = () => {
  const achievements = [
    { number: '19+', label: 'Years of Excellence', icon: Award },
    { number: '5000+', label: 'Projects Completed', icon: Target },
    { number: '15+', label: 'Countries Served', icon: Globe },
    { number: '50+', label: 'Expert Engineers', icon: Users },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Uncompromising commitment to safety in every operation, protecting our team, clients, and equipment through rigorous standards and continuous training.',
      color: 'blue'
    },
    {
      icon: Award,
      title: 'Engineering Excellence',
      description: 'Delivering premium solutions using cutting-edge technology, international standards, and the expertise of our certified engineering professionals.',
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Customer Partnership',
      description: 'Building lasting relationships through transparent communication, reliable service, and genuine commitment to our clients\' operational success.',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Innovation Drive',
      description: 'Continuously advancing our capabilities through technological innovation, sustainable practices, and forward-thinking engineering solutions.',
      color: 'purple'
    }
  ];

  const leadership = [
    {
      name: 'James Macharia',
      position: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: '15+ years leading engineering excellence across East Africa',
      credentials: 'MSc Mechanical Engineering, Stanford University'
    },
    {
      name: 'Sarah Wanjiku',
      position: 'Chief Technology Officer',
      image: 'https://i.imgur.com/OFkZ6bk.jpeg?w=300&h=300&fit=crop&crop=face',
      bio: 'Innovation pioneer in power generation solutions',
      credentials: 'PhD Electrical Engineering, MIT'
    },
    {
      name: 'David Kiprop',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Operational excellence across multi-country projects',
      credentials: 'MBA Operations Management, INSEAD'
    }
  ];

  const milestones = [
    { year: '2005', event: 'Wings Ltd. founded with vision to power East Africa', achievement: 'Established headquarters in Nairobi' },
    { year: '2008', event: 'Official Lister Petter distributor partnership', achievement: 'First major OEM partnership secured' },
    { year: '2012', event: 'Regional expansion to Uganda and Tanzania', achievement: 'Multi-country operations launched' },
    { year: '2016', event: 'Launched 24/7 emergency response services', achievement: 'Industry-first rapid response capability' },
    { year: '2019', event: 'IoT integration with Safaricom partnership', achievement: 'Digital transformation leadership' },
    { year: '2022', event: 'State-of-the-art Mombasa facility opened', achievement: 'Coastal operations hub established' },
    { year: '2024', event: 'AI-powered predictive maintenance launched', achievement: 'Next-generation service innovation' }
  ];

  const certifications = [
    'ISO 9001:2015 Quality Management',
    'ISO 14001:2015 Environmental Management',
    'OHSAS 18001 Occupational Health & Safety',
    'Lister Petter Authorized Service Center',
    'Kenya Bureau of Standards Certified',
    'East African Community Trade License'
  ];

  const sustainability = [
    {
      title: 'Carbon Neutral Operations',
      description: 'Committed to achieving carbon neutrality by 2030 through renewable energy integration and efficient operations.',
      progress: 65
    },
    {
      title: 'Local Community Investment',
      description: 'Investing 3% of annual revenue in local education and skills development programs across East Africa.',
      progress: 85
    },
    {
      title: 'Circular Economy Practices',
      description: 'Implementing comprehensive recycling and refurbishment programs for all equipment and components.',
      progress: 45
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - Enhanced */}
        <section className="relative bg-gradient-to-br from-wings-navy via-blue-900 to-gray-900 py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1471&auto=format&fit=crop" 
              alt="Wings Ltd. Engineering Excellence" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-wings-navy/90 to-transparent"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-wings-orange/20 text-wings-orange rounded-full text-sm font-medium">
                  Engineering Excellence Since 2005
                </span>
              </div>
              <h1 className="text-white heading-xl mb-8 leading-tight">
                Powering East Africa's
                <span className="block text-wings-orange">Industrial Future</span>
              </h1>
              <p className="text-white/90 text-xl mb-8 leading-relaxed max-w-2xl">
                We are the trusted engineering partner behind the region's most critical infrastructure, 
                delivering world-class power generation solutions that drive economic growth and development.
              </p>
              
              {/* Achievement Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {achievements.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="w-8 h-8 text-wings-orange" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-wings-navy mb-4">Visionary Leadership</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Our executive team combines decades of engineering expertise with strategic vision, 
                driving innovation and excellence across all operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div key={index} className="group text-center">
                  <div className="relative w-32 h-32 mb-6 mx-auto">
                    <img 
                      src={leader.image}
                      alt={leader.name}
                      className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                      />
                    <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-wings-navy/10 group-hover:bg-wings-navy/20 transition-colors pointer-events-none"></div>
                  </div>

                  <h3 className="text-xl font-bold text-wings-navy mb-1">{leader.name}</h3>
                  <p className="text-wings-orange font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600 mb-2">{leader.bio}</p>
                  <p className="text-sm text-gray-500 italic">{leader.credentials}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-wings-navy mb-4">Our Journey of Excellence</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From a small engine repair shop to East Africa's leading power solutions provider - 
                every milestone has been a step toward engineering excellence.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-wings-navy to-wings-orange"></div>
                
                <div className="space-y-16">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex-1 px-8">
                        <div className={`p-8 bg-white rounded-xl shadow-lg border-l-4 ${index % 2 === 0 ? 'text-right border-l-wings-navy' : 'text-left border-l-wings-orange'}`}>
                          <div className="inline-block px-3 py-1 bg-wings-orange/10 text-wings-orange rounded-full text-sm font-medium mb-4">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-wings-navy mb-3">{milestone.event}</h3>
                          <p className="text-gray-600 mb-2">{milestone.achievement}</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-wings-navy to-wings-orange border-4 border-white shadow-lg z-10"></div>
                      
                      <div className="flex-1 px-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-wings-navy mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                These fundamental principles guide every decision, every project, and every relationship we build. 
                They are the foundation of our reputation and the promise we make to every client.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-${value.color}-100 group-hover:bg-${value.color}-200 transition-colors`}>
                    <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-wings-navy mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-wings-navy mb-4">Sustainable Engineering</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                We believe in engineering solutions that not only power today's needs but protect tomorrow's possibilities. 
                Our commitment to sustainability drives innovation in every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sustainability.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-wings-navy mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-wings-orange h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{item.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-wings-navy">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-white mb-4">Industry Certifications</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Our commitment to excellence is validated by rigorous international standards and certifications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
                  <Award className="w-8 h-8 text-wings-orange mx-auto mb-3" />
                  <p className="text-white font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA */}
        <section className="py-20 bg-gradient-to-r from-wings-orange to-orange-600">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="heading-lg text-white mb-6">Partner with East Africa's Engineering Leaders</h2>
              <p className="text-white/90 max-w-3xl mx-auto mb-8 text-lg">
                Join the hundreds of organizations across East Africa who trust Wings Ltd. 
                for their most critical power generation needs. Let's engineer your success together.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="/contact" className="btn-secondary bg-white text-wings-orange hover:bg-gray-100">
                  Start Your Project
                </a>
                <a href="/services" className="btn-outline border-white text-white hover:bg-white hover:text-wings-orange">
                  Explore Solutions
                </a>
                <a href="tel:+254716052776" className="btn-outline border-white text-white hover:bg-white hover:text-wings-orange">
                  Call Now: +254 716 052 776
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="254716052776" />
    </>
  );
};

export default AboutEnhanced;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SlideProps {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1706722015091-58bb0f17cad1?q=80&w=2070&auto=format&fit=crop',
    title: 'Industrial Generators',
    description: 'High-performance power solutions for businesses across East Africa'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop',
    title: 'Diesel Engines',
    description: 'Reliable engines for industrial and commercial applications'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg?auto=compress&cs=tinysrgbq=80&w=2070&auto=format&fit=crop',
    title: 'Expert Maintenance',
    description: 'Professional service and maintenance from experienced technicians'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full w-full image-gradient-overlay">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/30 z-[15]"></div>
            <div className="container-custom relative h-full flex flex-col justify-center items-start z-20 pt-16">
              <h1 className="text-white heading-xl max-w-2xl animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mt-4 max-w-xl animate-fade-in">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in">
                <Link to="/services" className="btn-primary">
                  View Products
                </Link>
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-wings-navy">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-wings-orange' : 'bg-white/50'
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

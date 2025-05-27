
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideProps {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

const slides: SlideProps[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1706722015091-58bb0f17cad1?q=80&w=2070&auto=format&fit=crop',
    title: 'Industrial Generators',
    description: 'High-performance power solutions for businesses across East Africa',
    ctaText: 'View Products',
    ctaLink: '/services'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop',
    title: 'Diesel Engines',
    description: 'Reliable engines for industrial and commercial applications',
    ctaText: 'Explore Solutions',
    ctaLink: '/services'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/955395/pexels-photo-955395.jpeg?auto=compress&cs=tinysrgb&w=2070&auto=format&fit=crop',
    title: 'Expert Maintenance',
    description: 'Professional service and maintenance from experienced technicians',
    ctaText: 'Book Service',
    ctaLink: '/contact'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideDuration = 5000; // 5 seconds per slide
  
  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 700); // Match this with CSS transition duration
  }, [isAnimating]);
  
  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700); // Match this with CSS transition duration
  }, [isAnimating]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, slideDuration);
    
    return () => clearInterval(interval);
  }, [goToNextSlide]);
  
  return (
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
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
            <div className="container-custom relative h-full flex flex-col justify-center items-start z-20 pt-10 sm:pt-16">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mt-3 md:mt-4 max-w-md sm:max-w-xl animate-fade-in delay-100">
                {slide.description}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-in delay-200">
                {slide.ctaText && slide.ctaLink && (
                  <Link to={slide.ctaLink} className="btn-primary text-sm sm:text-base">
                    {slide.ctaText}
                  </Link>
                )}
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-wings-navy text-sm sm:text-base">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Dots navigation */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 700);
              }
            }}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-wings-orange w-4 sm:w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

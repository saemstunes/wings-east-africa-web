
import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Wings Ltd. has been instrumental in keeping our hospital's backup power systems running smoothly. Their 24/7 service is exceptional.",
    author: "Dr. Sarah Kamau",
    position: "Facilities Director",
    company: "Nairobi Hospital",
    image: "https://i.imgur.com/JLPTFon.jpeg"
  },
  {
    id: 2,
    quote: "As a manufacturing company, reliable power is critical for our operations. Wings Ltd. provides not just equipment but real solutions.",
    author: "James Omondi",
    position: "Plant Manager",
    company: "Kenya Breweries Limited",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: 3,
    quote: "The team at Wings Ltd. understands our technical requirements perfectly. Their generators have never failed us, even in the harshest conditions.",
    author: "Thomas Mutiso",
    position: "Operations Director",
    company: "East African Mining Co.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section className="bg-wings-navy py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-wings-orange mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeIndex 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <blockquote className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white/90 text-lg md:text-xl italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <cite className="not-italic">
                    <p className="text-wings-orange font-semibold text-lg">{testimonial.author}</p>
                    <p className="text-white/70">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </cite>
                </blockquote>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-wings-orange' : 'bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      location: "Delhi, India",
      image: "/images/testimonials/man.png",
      destination: "Kedarnath Trek",
      text: "Our spiritual journey to Kedarnath was truly transformative. The team's attention to detail made it unforgettable."
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Mumbai, India",
      image: "/images/testimonials/woman.png",
      destination: "Valley of Flowers",
      text: "The Valley of Flowers exceeded all expectations. Perfect planning and breathtaking views throughout."
    },
    {
      id: 3,
      name: "John Williams",
      location: "London, UK",
      image: "/images/testimonials/man.png",
      destination: "Rishikesh Retreat",
      text: "From yoga by the Ganges to thrilling rafting adventures, every moment in Rishikesh was perfectly curated."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] font-medium tracking-wider">TESTIMONIALS</h3>
            <div className="h-[2px] w-12 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Travelers Say</h2>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-6xl mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-6">
                      {/* Left Side - Profile */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#84cc16]">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Quote className="w-6 h-6 text-[#84cc16] absolute -bottom-2 -right-2 bg-white rounded-full p-1" />
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                          </div>
                          <span className="px-3 py-1 bg-[#84cc16]/10 text-[#84cc16] text-xs font-medium rounded-full">
                            {testimonial.destination}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-white shadow-md hover:bg-[#84cc16] hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#84cc16] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}

            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-white shadow-md hover:bg-[#84cc16] hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 
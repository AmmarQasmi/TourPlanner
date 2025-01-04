import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2, image3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const goToNextSlide = (e) => {
    e.preventDefault();
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content w-full px-4 md:px-6 lg:px-8">
        {/* Text content - full width on small/medium screens */}
        <div className="max-w-3xl mx-auto lg:max-w-none lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your Dream Vacation
          </h1>
          <p className="text-lg md:text-xl italic mb-6">
            "The world is a book, and those who do not travel read only one page." - Saint Augustine
          </p>
          <p className="text-base md:text-lg mb-6">
            Discover breathtaking landscapes, immerse yourself in diverse cultures, and create unforgettable
            memories. Let your adventure begin today!
          </p>
          <Link 
            to="/destinations" 
            className="btn btn-primary text-lg"
          >
            Explore Destinations
          </Link>
        </div>

        {/* Carousel - only visible on large screens */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="carousel w-full h-[500px] relative">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item absolute w-full h-full transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image} 
                  className="w-full h-full object-cover rounded-lg shadow-2xl" 
                  alt={`Tour destination ${index + 1}`} 
                />
              </div>
            ))}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <button 
                onClick={goToPrevSlide} 
                className="btn btn-circle bg-white/80 hover:bg-white"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button 
                onClick={goToNextSlide} 
                className="btn btn-circle bg-white/80 hover:bg-white"
                aria-label="Next slide"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
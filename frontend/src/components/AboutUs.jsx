import React from 'react';
import { Check } from 'lucide-react';
import aboutUs from '../assets/aboutUs.svg';

const VALUES = [
  {
    title: 'Customer Satisfaction',
    description: 'We prioritize your happiness and strive to exceed your expectations at every touchpoint.'
  },
  {
    title: 'Quality Experiences',
    description: 'Every journey we plan is crafted with attention to detail, ensuring memorable adventures.'
  },
  {
    title: 'Sustainability',
    description: `We're committed to promoting responsible tourism that respects local communities and environments.`
  },
  {
    title: 'Innovation',
    description: 'Continuously improving our services with cutting-edge travel planning technology.'
  }
];

const AboutUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-base-content">About Us</h2>
          <p className="text-base-content/70 text-center mb-12 max-w-2xl mx-auto">
            We're passionate about creating unforgettable travel experiences that inspire and delight our customers.
          </p>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <img 
                  src={aboutUs} 
                  alt="About Tour Planner" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full -z-10"></div>
            </div>

            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-base-content">What We Value Most</h3>
              <div className="space-y-6">
                {VALUES.map((value, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-base-content mb-1">{value.title}</h4>
                      <p className="text-base-content/70 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


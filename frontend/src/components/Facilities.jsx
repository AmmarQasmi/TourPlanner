import React from 'react';

const Facilities = () => {
  const facilities = [
    { icon: '🏨', name: 'Hotel Booking' },
    { icon: '🚗', name: 'Car Rentals' },
    { icon: '🧭', name: 'Destination selection' },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="card-title">{facility.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;


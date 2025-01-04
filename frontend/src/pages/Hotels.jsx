import React from 'react';
import HotelsList from '../components/HotelsList';

const Hotels = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Hotels</h1>
      <HotelsList />
    </div>
  );
};

export default Hotels;

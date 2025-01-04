import React from 'react';
import RentalsList from '../components/RentalsList';

const RentalsPage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Car Rentals</h1>
      <RentalsList />
    </div>
  );
};

export default RentalsPage;

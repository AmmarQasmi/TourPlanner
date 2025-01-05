import React from 'react';
import { Link } from 'react-router-dom';

const CarRentalCard = ({ rental }) => {
  return (
    <div className="p-4 mb-4 shadow rounded bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img
        src={rental.image}
        alt={`${rental.make} ${rental.model}`}
        className="w-full h-48 object-fit rounded mb-4"
      />
      <h3 className="text-xl font-semibold">{rental.make} {rental.model} ({rental.year})</h3>
      <p className="text-gray-600">Capacity: {rental.capacity} people</p>
      <p className="text-gray-600">Rental Price: ${rental.rental_price_per_day} / day</p>
      <p className="text-gray-600">Status: {rental.availability_status}</p>
      <br />
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
        Book Now
      </Link>
    </div>
  );
};

export default CarRentalCard;

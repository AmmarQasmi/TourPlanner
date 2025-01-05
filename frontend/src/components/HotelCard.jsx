import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="p-4 mb-4 shadow rounded bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold">{hotel.name}</h3>
      <p className="text-gray-600">Rating: {hotel.rating} ⭐</p>
      <p className="text-gray-600">Location: {hotel.location}</p>
      <p className="text-gray-600">Capacity: {hotel.capacity} people</p>
      <p className="text-gray-600">Description: {hotel.description}</p>
      <br />
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
        Book Now
      </Link>
    </div>
  );
};

export default HotelCard;

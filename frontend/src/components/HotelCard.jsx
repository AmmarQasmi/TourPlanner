import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="p-4 mb-4 shadow rounded bg-white">
      <h3 className="text-xl font-semibold">{hotel.name}</h3>
      <p>Rating: {hotel.rating} ⭐</p>
      <p>Location: {hotel.location}</p>
      <p>Description: {hotel.description}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );
};

export default HotelCard;

import React from 'react';

const CarRentalCard = ({ rental }) => {
  return (
    <div className="p-4 mb-4 shadow rounded bg-white">
      <h3 className="text-xl font-semibold">{rental.name}</h3>
      <p>Rating: {rental.rating} ⭐</p>
      <p>Price: ${rental.price} / day</p>
      <p>Description: {rental.description}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Book Now
      </button>
    </div>
  );
};

export default CarRentalCard;

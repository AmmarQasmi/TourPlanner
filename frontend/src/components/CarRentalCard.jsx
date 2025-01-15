import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const CarRentalCard = ({ rental }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 mb-4 rounded w-full transform transition-all duration-300
      hover:scale-105 cursor-pointer
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
        : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl hover:shadow-gray-400/50'}`}>
      <img
        src={rental.image}
        alt={`${rental.make} ${rental.model}`}
        className="w-full h-48 object-fit rounded mb-4"
      />
      <h3 className="text-xl font-semibold">{rental.make} {rental.model} ({rental.year})</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Capacity: {rental.capacity} people
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Rental Price: ${rental.rental_price_per_day} / day
      </p>

      <br />
    </div>
  );
};

export default CarRentalCard;

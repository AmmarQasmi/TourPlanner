import React from 'react';
import { useTheme } from './ThemeContext';

const HotelCard = ({ hotel }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 mb-4 rounded w-full transform transition-all duration-300
      hover:scale-105 cursor-pointer
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
        : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl hover:shadow-gray-400/50'}`}>
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        Location: {hotel.location}
      </p>
      <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        <p className="flex items-center gap-1">
          Rating: <span className="text-yellow-500">{hotel.rating} ⭐</span>
        </p>
      </div>
    </div>
  );
};

export default HotelCard;

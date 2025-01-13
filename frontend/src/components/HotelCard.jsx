import React from 'react';
import { Link } from 'react-router-dom';
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
      <h3 className="text-xl font-semibold">{hotel.name}</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Rating: {hotel.rating} ⭐
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Location: {hotel.location}
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Capacity: {hotel.capacity} people
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Description: {hotel.description}
      </p>
      <br />
      <Link 
        to="/" 
        className={`inline-block px-4 py-2 rounded mt-4 transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-blue-500 text-white hover:bg-blue-700 transform hover:scale-105' 
            : 'bg-blue-600 text-white hover:bg-blue-800 transform hover:scale-105'}`}
      >
        Book Now
      </Link>
    </div>
  );
};

export default HotelCard;

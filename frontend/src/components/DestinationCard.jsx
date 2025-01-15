import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useSelector } from 'react-redux';

const DestinationCard = ({ destination }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 mb-4 rounded w-full transform transition-all duration-300
      hover:scale-105 cursor-pointer
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
        : 'bg-white text-gray-900 shadow-lg hover:shadow-2xl hover:shadow-gray-400/50'}`}>
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
        Country: {destination.country}
      </p>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        {destination.description.length > 100 
          ? `${destination.description.substring(0, 100)}...` 
          : destination.description}
      </p>
      <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
        <p>Duration: {destination.days} days</p>
        <p>Cost: ${destination.average_cost}</p>
      </div>
    </div>
  );
};

export default DestinationCard;

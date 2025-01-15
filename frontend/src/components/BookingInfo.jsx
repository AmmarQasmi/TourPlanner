import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const BookingInfo = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, agent, destination, hotel, car, total } = location.state || {};

  if (!booking || !destination) {
    return navigate('/booking/new');
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg 
        ${theme === 'dark' 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-gray-900'}`}>
        
        <h2 className="text-3xl font-bold mb-6">Booking Summary</h2>

        {/* Booking Status */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white">
            Status: {booking.status}
          </span>
        </div>

        {/* Destination Details */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Destination</h3>
          <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="mb-1">{destination.name}</p>
            <p className="mb-1">Country: {destination.country}</p>
            <p className="mb-1">Duration: {destination.days} days</p>
            <p className="text-lg font-semibold text-green-600">Cost: ${destination.average_cost}</p>
          </div>
        </div>

        {/* Hotel Details if selected */}
        {hotel && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Hotel</h3>
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="mb-1">{hotel.name}</p>
              <p>Location: {hotel.location}</p>
            </div>
          </div>
        )}

        {/* Car Details if selected */}
        {car && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Car Rental</h3>
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="mb-1">{car.make} {car.model} ({car.year})</p>
              <p className="text-lg font-semibold text-green-600">Rental price per day: ${car.rental_price_per_day}</p>
            </div>
          </div>
        )}

        {/* Assigned Agent */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Assigned Agent</h3>
          <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="mb-1">Name: {agent.first_name} {agent.last_name}</p>
            <p className="mb-1">Email: {agent.email}</p>
            <p>Phone: {agent.phone}</p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-xl font-semibold mb-4">Cost Breakdown</h3>
          <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Destination Cost:</span>
                <span>${destination.average_cost}</span>
              </div>
              {car && (
                <div className="flex justify-between">
                  <span>Car Rental Cost:</span>
                  <span>${car.rental_price_per_day}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Cost:</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/')}
            className={`flex-1 py-2 px-4 rounded transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Return Home
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Print Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo; 
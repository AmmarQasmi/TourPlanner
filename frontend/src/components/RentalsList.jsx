import React, { useEffect, useState } from 'react';
import CarRentalCard from '../components/CarRentalCard';
import { useTheme } from './ThemeContext';

const RentalsList = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTopRentals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars'); 
        const data = await response.json();
        
        const availableCars = data.car.filter((rental) => rental.availability_status === 'Available');
        setRentals(availableCars.sort(() => 0.5 - Math.random()).slice(0, 5)); 
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRentals();
  }, []);

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Available Top Car Rentals
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : rentals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rentals.map((rental) => (
            <CarRentalCard key={rental.car_id} rental={rental} />
          ))}
        </div>
      ) : (
        <p className={`text-lg text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          No available rentals found.
        </p>
      )}
    </div>
  );
};

export default RentalsList;

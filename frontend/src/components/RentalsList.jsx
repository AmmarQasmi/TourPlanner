import React, { useEffect, useState } from 'react';
import CarRentalCard from '../components/CarRentalCard';

const RentalsList = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchTopRentals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars'); 
        const data = await response.json();
        
        const availableCars = data.car.filter((rental) => rental.availability_status === 'Available');

        // Randomize and limit to 5 cars
        setRentals(availableCars.sort(() => 0.5 - Math.random()).slice(0, 5)); 
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      }
    };

    fetchTopRentals();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Top Car Rentals</h2>
      {rentals.length > 0 ? (
        rentals.map((rental) => <CarRentalCard key={rental.car_id} rental={rental} />)
      ) : (
        <p>No available rentals found.</p>
      )}
    </div>
  );
};

export default RentalsList;

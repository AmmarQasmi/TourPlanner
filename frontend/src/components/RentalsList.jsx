import React, { useEffect, useState } from 'react';
import CarRentalCard from '../components/CarRentalCard';

const RentalsList = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchTopRentals = async () => {
      try {
        const response = await fetch('/api/rentals/get'); // Adjust endpoint as needed
        const data = await response.json();
        const topRated = data.filter((rental) => rental.rating > 4);
        setRentals(topRated.sort(() => 0.5 - Math.random()).slice(0, 5)); // Randomize and limit
      } catch (error) {
        console.error('Failed to fetch rentals:', error);
      }
    };

    fetchTopRentals();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Car Rentals</h2>
      {rentals.length > 0 ? (
        rentals.map((rental) => <CarRentalCard key={rental.id} rental={rental} />)
      ) : (
        <p>Loading rentals...</p>
      )}
    </div>
  );
};

export default RentalsList;

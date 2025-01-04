import React, { useEffect, useState } from 'react';
import HotelCard from '../components/HotelCard';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchTopHotels = async () => {
      try {
        const response = await fetch('/api/hotels/get'); // Adjust the endpoint as necessary
        const data = await response.json();
        const topRated = data.filter((hotel) => hotel.rating > 4);
        setHotels(topRated.sort(() => 0.5 - Math.random()).slice(0, 5)); // Randomize and limit
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchTopHotels();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Hotels</h2>
      {hotels.length > 0 ? (
        hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      ) : (
        <p>Loading hotels...</p>
      )}
    </div>
  );
};

export default HotelsList;

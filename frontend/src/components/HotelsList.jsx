import React, { useEffect, useState } from 'react';
import HotelCard from '../components/HotelCard';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchTopHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels/get'); // Adjust the endpoint as necessary
        const data = await response.json();

        // Log data to inspect its structure
        console.log('Fetched Hotels:', data);

        // Check if the hotels array exists
        if (data.hotels && Array.isArray(data.hotels)) {
          const topRated = data.hotels.filter((hotel) => hotel.rating > 4);
          setHotels(topRated.sort(() => 0.5 - Math.random()).slice(0, 5)); // Randomize and limit
        } else {
          console.error('Expected an array under data.hotels but got:', data);
        }
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
        hotels.map((hotel) => <HotelCard key={hotel.hotel_id} hotel={hotel} />)
      ) : (
        <p>Loading hotels...</p>
      )}
    </div>
  );
};

export default HotelsList;

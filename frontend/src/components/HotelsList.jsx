import React, { useEffect, useState } from 'react';
import HotelCard from '../components/HotelCard';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels/get');
        const data = await response.json();

        console.log('Fetched Hotels:', data);

        if (data.hotels && Array.isArray(data.hotels)) {
          const topRated = data.hotels.filter((hotel) => hotel.rating > 4);
          setHotels(topRated);
        } else {
          console.error('Expected an array under data.hotels but got:', data);
        }
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopHotels();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Hotels</h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : hotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No hotels found.</p>
      )}
    </div>
  );
};

export default HotelsList;

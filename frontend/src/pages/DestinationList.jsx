import React, { useEffect, useState } from 'react';
import DestinationCard from '../components/DestinationCard';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations');
        const data = await response.json();
        
        if (data.destinations && Array.isArray(data.destinations)) {
          setDestinations(data.destinations);
        } else {
          console.error('Expected an array of destinations but got:', data);
        }
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Popular Destinations
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard 
              key={destination.destination_id} 
              destination={destination} 
            />
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">
          No destinations found.
        </p>
      )}
    </div>
  );
};

export default DestinationList;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookingForm = () => {
  const location = useLocation();
  const selectedDestination = location.state?.selectedDestination;

  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    destination_id: selectedDestination ? String(selectedDestination) : '',
    hotel_id: '',
    car_id: '',
  });
  
  const navigate = useNavigate();
  const clientId = useSelector(state => state.auth.userId);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/clientlogin', { 
        state: { from: '/booking/new' },
        replace: true 
      });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinationsRes, hotelsRes, carsRes, agentsRes] = await Promise.all([
          fetch('http://localhost:5000/api/destinations'),
          fetch('http://localhost:5000/api/hotels/get'),
          fetch('http://localhost:5000/api/cars'),
          fetch('http://localhost:5000/api/agents/get')
        ]);

        const destinationsData = await destinationsRes.json();
        const hotelsData = await hotelsRes.json();
        const carsData = await carsRes.json();
        const agentsData = await agentsRes.json();

        setDestinations(destinationsData.destinations);
        setHotels(hotelsData.hotels);
        const availableCars = carsData.car.filter(car => car.availability_status === 'Available');
        setCars(availableCars);
        setAgents(agentsData.agents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRandomAgent = () => {
    if (agents.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * agents.length);
    return agents[randomIndex];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination_id) {
      alert('Please select a destination');
      return;
    }

    try {
      const selectedAgent = getRandomAgent();
      
      if (!selectedAgent) {
        throw new Error('No agent available');
      }

      // Find selected items
      const selectedDestination = destinations.find(d => 
        d.destination_id === parseInt(formData.destination_id)
      );

      if (!selectedDestination) {
        throw new Error('Selected destination not found');
      }

      const selectedHotel = formData.hotel_id ? hotels.find(h => h.hotel_id === parseInt(formData.hotel_id)) : null;
      const selectedCar = formData.car_id ? cars.find(c => c.car_id === parseInt(formData.car_id)) : null;

      // Calculate total
      const total = Number(selectedDestination.average_cost) || 0;

      // Create booking
      const response = await fetch('http://localhost:5000/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination_id: parseInt(formData.destination_id),
          hotel_id: selectedHotel ? parseInt(formData.hotel_id) : null,
          car_id: selectedCar ? parseInt(formData.car_id) : null,
          client_id: clientId,
          agent_id: selectedAgent.agent_id,
          status: 'Pending',
          total_amount: total
        }),
      });

      console.log(formData.hotel_id);
      console.log(formData.car_id);

      const bookingData = await response.json();

      if (!response.ok) {
        throw new Error(bookingData.message || 'Failed to create booking');
      }

      // Update car status to 'Rented'
      if (selectedCar) {
        await updateCarStatus(selectedCar.car_id, 'Rented');
      }

      navigate('/booking-info', { 
        state: { 
          booking: bookingData.booking,
          agent: selectedAgent,
          destination: selectedDestination,
          hotel: selectedHotel,
          car: selectedCar,
          total
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.message || 'Failed to create booking. Please try again.');
    }
  };

  const updateCarStatus = async (carId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availability_status: status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update car status');
      }
    } catch (error) {
      console.error('Error updating car status:', error);
      alert('Failed to update car status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="flex w-full max-w-6xl bg-base-100 rounded-lg shadow-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Create New Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Destination (Required)</label>
              <select 
                className="select select-bordered w-full"
                value={formData.destination_id}
                onChange={(e) => setFormData({...formData, destination_id: e.target.value})}
                required
              >
                <option value="">Choose a destination</option>
                {destinations.map(dest => (
                  <option key={dest.destination_id} value={dest.destination_id.toString()}>
                    {dest.name} - {dest.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Hotel (Optional)</label>
              <select 
                className="select select-bordered w-full"
                value={formData.hotel_id}
                onChange={(e) => setFormData({...formData, hotel_id: e.target.value})}
              >
                <option value="">Choose a hotel</option>
                {hotels.map(hotel => (
                  <option key={hotel.hotel_id} value={hotel.hotel_id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Car (Optional)</label>
              <select 
                className="select select-bordered w-full"
                value={formData.car_id}
                onChange={(e) => setFormData({...formData, car_id: e.target.value})}
              >
                <option value="">Choose a car</option>
                {cars.map(car => (
                  <option key={car.car_id} value={car.car_id}>
                    {car.make} {car.model} ({car.year}) - ${car.rental_price_per_day}/day
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              className="btn btn-primary w-full"
            >
              Proceed to Booking Info
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80"
            alt="Travel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-100/50 to-transparent">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                Start Your Journey
              </h3>
              <p className="text-white/90 mt-2 drop-shadow-lg">
                Book your dream vacation today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 
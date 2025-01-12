import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp, User, Hotel, Car, BookOpen, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const ExpandableBlock = ({ title, icon: Icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:bg-gray-100">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </div>
      {isExpanded && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

const AgentDashboard = () => {
  const [agentInfo, setAgentInfo] = useState(null);
  const [clients, setClients] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    rating: 0,
    capacity: 0,
    image: '',
    description: ''
  });
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: '',
    capacity: '',
    rental_price_per_day: '',
    availability_status: 'Available',
    image: ''
  });

  const [loading, setLoading] = useState(false); // State for loader
  const [confirmationMessage, setConfirmationMessage] = useState(''); // State for confirmation message

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('agent_token');
        console.log('Token from localStorage:', token);

        if (!token) {
          navigate('/login');
          return;
        }

        const decodedToken = jwt_decode.jwtDecode(token);
        const agentId = decodedToken.id;
        console.log('Decoded Token:', decodedToken);
        console.log('agent ID:', agentId);

        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        };

        const [
          agentResponse,
          clientResponse,
          hotelResponse,
          carResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/agents/get/${agentId}`, config),
          axios.get('http://localhost:5000/api/clients', config),
          axios.get('http://localhost:5000/api/hotels/get', config),
          axios.get('http://localhost:5000/api/cars', config),
        ]);

        setAgentInfo(agentResponse.data.agent || null);
        setClients(clientResponse.data.Clients || []);
        setHotels(hotelResponse.data.hotels || []);
        setCars(carResponse.data.car || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleRemoveClient = async (clientId) => {
    try {
      const token = localStorage.getItem('agent_token');
      await axios.delete(`http://localhost:5000/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setClients(clients.filter(client => client.client_id !== clientId));
    } catch (error) {
      console.error('Failed to remove client:', error);
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('agent_token');
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}`,
        { status: 'Confirmed' },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      setBookings(bookings.map(booking =>
        booking.booking_id === bookingId ? { ...booking, status: 'Confirmed' } : booking
      ));
    } catch (error) {
      console.error('Failed to approve booking:', error);
    }
  };

  const handleNavigateToRentals = () => {
    navigate('/rentals');
  };

  const handleNavigateToHotels = () => {
    navigate('/hotels');
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    if (newHotel.rating < 0 || newHotel.rating > 5) {
      alert('Rating must be between 0 and 5');
      return;
    }
    if (newHotel.capacity < 1) {
      alert('Capacity must be at least 1');
      return;
    }
    setLoading(true); // Start loader
    try {
      const token = localStorage.getItem('agent_token');
      const response = await axios.post('http://localhost:5000/api/hotels', newHotel, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setHotels([...hotels, response.data.hotel]);
      setNewHotel({
        name: '',
        location: '',
        rating: 0,
        capacity: 0,
        image: '',
        description: ''
      });
      setConfirmationMessage('Hotel added successfully!'); // Success message
    } catch (error) {
      console.error('Failed to add hotel:', error);
      alert('Failed to add hotel. Please try again.');
    } finally {
      setLoading(false); // Stop loader
      setTimeout(() => setConfirmationMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const token = localStorage.getItem('agent_token');
      const response = await axios.post('http://localhost:5000/api/cars', newCar, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setCars([...cars, response.data.car]);
      setNewCar({
        make: '',
        model: '',
        year: '',
        capacity: '',
        rental_price_per_day: '',
        availability_status: 'Available',
        image: ''
      });
      setConfirmationMessage('Car added successfully!'); // Success message
    } catch (error) {
      console.error('Failed to add car:', error);
    } finally {
      setLoading(false); // Stop loader
      setTimeout(() => setConfirmationMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Agent Dashboard</h1>

      {agentInfo ? (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {agentInfo.first_name} {agentInfo.last_name}</h2>
          <p><strong>Email:</strong> {agentInfo.email}</p>
          <p><strong>Phone:</strong> {agentInfo.phone}</p>
          <p><strong>Region:</strong> {agentInfo.region}</p>
        </div>
      ) : (
        <p>Loading agent information...</p>
      )}

      <ExpandableBlock title="Manage Clients" icon={User}>
        {clients.length ? clients.map(client => (
          <div key={client.client_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <p><strong>Name:</strong> {client.first_name} {client.last_name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Address:</strong> {client.address}</p>
            <button
              onClick={() => handleRemoveClient(client.client_id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600 transition-colors"
            >
              Remove Client
            </button>
          </div>
        )) : <p>No clients found.</p>}
      </ExpandableBlock>

      {loading && <div className="text-center mb-4">Loading...</div>}
      {confirmationMessage && <div className="text-center text-green-500 mb-4">{confirmationMessage}</div>}

      {/* Form for adding hotels */}
      <ExpandableBlock title="Add Hotel" icon={Plus}>
        <form onSubmit={handleAddHotel} className="space-y-4">
          <input
            type="text"
            placeholder="Hotel Name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newHotel.location}
            onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Rating"
            value={newHotel.rating}
            onChange={(e) => setNewHotel({ ...newHotel, rating: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded"
            required
            min="0"
            max="5"
            step="0.1"
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newHotel.capacity}
            onChange={(e) => setNewHotel({ ...newHotel, capacity: parseInt(e.target.value, 10) })}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newHotel.image}
            onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newHotel.description}
            onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Add Hotel
          </button>
        </form>
      </ExpandableBlock>

      
      {/* Form for adding cars */}
      <ExpandableBlock title="Add Car" icon={Plus}>
        <form onSubmit={handleAddCar} className="space-y-4">
          <input
            type="text"
            placeholder="Make"
            value={newCar.make}
            onChange={(e) => setNewCar({...newCar, make: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={newCar.model}
            onChange={(e) => setNewCar({...newCar, model: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={newCar.year}
            onChange={(e) => setNewCar({...newCar, year: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newCar.capacity}
            onChange={(e) => setNewCar({...newCar, capacity: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Rental Price Per Day"
            value={newCar.rental_price_per_day}
            onChange={(e) => setNewCar({...newCar, rental_price_per_day: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={newCar.availability_status}
            onChange={(e) => setNewCar({...newCar, availability_status: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={newCar.image}
            onChange={(e) => setNewCar({...newCar, image: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Add Car
          </button>
        </form>
      </ExpandableBlock>
      
      <ExpandableBlock title="Available Cars" icon={Car}>
        {cars.length ? cars.filter(car => car.availability_status === 'Available').map(car => (
          <div key={car.car_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="flex items-start cursor-pointer" onClick={handleNavigateToRentals}>
              {car.image && <img src={car.image} alt={`${car.make} ${car.model}`} className="w-32 h-32 object-fit mr-4 rounded" />}
              <div>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Capacity:</strong> {car.capacity}</p>
                <p><strong>Rental Price:</strong> ${car.rental_price_per_day} per day</p>
                <p><strong>Availability:</strong> {car.availability_status}</p>
              </div>
            </div>
          </div>
        )) : <p>No cars available for rent.</p>}
      </ExpandableBlock>

      <ExpandableBlock title="Rented Cars" icon={Car}>
        {cars.length ? cars.filter(car => car.availability_status === 'Rented').map(car => (
          <div key={car.car_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="flex items-start">
              {car.image && <img src={car.image} alt={`${car.make} ${car.model}`} className="w-32 h-32 object-fit mr-4 rounded" />}
              <div>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Capacity:</strong> {car.capacity}</p>
                <p><strong>Rental Price:</strong> ${car.rental_price_per_day} per day</p>
                <p><strong>Availability:</strong> {car.availability_status}</p>
              </div>
            </div>
          </div>
        )) : <p>No cars currently rented.</p>}
      </ExpandableBlock>

      <ExpandableBlock title="Hotels" icon={Hotel}>
        {hotels.length ? hotels.map(hotel => (
          <div key={hotel.hotel_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <div className="flex items-start cursor-pointer" onClick={handleNavigateToHotels}>
              {hotel.image && <img src={hotel.image} alt={hotel.name} className="w-32 h-32 object-fit mr-4 rounded" />}
              <div>
                <p><strong>Name:</strong> {hotel.name}</p>
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Rating:</strong> {hotel.rating}</p>
                <p><strong>Capacity:</strong> {hotel.capacity}</p>
                <p><strong>Description:</strong> {hotel.description}</p>
              </div>
            </div>
          </div>
        )) : <p>No hotels listed.</p>}
      </ExpandableBlock>

      <ExpandableBlock title="Bookings" icon={BookOpen}>
        {bookings.length ? bookings.map(booking => (
          <div key={booking.booking_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
            <p><strong>Client ID:</strong> {booking.client_id}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <button
              onClick={() => handleApproveBooking(booking.booking_id)}
              className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600 transition-colors"
            >
              Approve Booking
            </button>
          </div>
        )) : <p>No bookings found.</p>}
      </ExpandableBlock>

      <ExpandableBlock title="Transactions" icon={DollarSign}>
        {transactions.length ? transactions.map(transaction => (
          <div key={transaction.transaction_id} className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <p><strong>Transaction ID:</strong> {transaction.transaction_id}</p>
            <p><strong>Client ID:</strong> {transaction.client_id}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
          </div>
        )) : <p>No transactions found.</p>}
      </ExpandableBlock>
    </div>
  );
};

export default AgentDashboard;



// const handleLogout = async () => {
//   try {
//     const token = localStorage.getItem('agent_token');
//     await axios.post('http://localhost:5000/api/auth/agents/logout', {}, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true
//     });
//     localStorage.removeItem('agent_token');
//     navigate('/login');
//   } catch (error) {
//     console.error('Logout failed:', error);
//   }
// };
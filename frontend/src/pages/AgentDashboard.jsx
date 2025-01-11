import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp, User, Hotel, Car, BookOpen, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'; // Changed this line

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

        const decodedToken = jwt_decode.jwtDecode(token); // Changed this line
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
          // bookingResponse,
          // transactionResponse
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/agents/get/${agentId}`, config),
          axios.get('http://localhost:5000/api/clients', config),
          axios.get('http://localhost:5000/api/hotels/get', config),
          axios.get('http://localhost:5000/api/cars', config),
          // axios.get('http://localhost:5000/api/bookings', config),
          // axios.get('http://localhost:5000/api/transactions', config)  
        ]);

        setAgentInfo(agentResponse.data.agent || null); 
        setClients(clientResponse.data.Clients || []);
        setHotels(hotelResponse.data.hotels || []);
        setCars(carResponse.data.car || []);
        // setBookings(bookingResponse.data.bookings || []);
        // setTransactions(transactionResponse.data || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

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

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Agent Dashboard</h1>

      {agentInfo ? (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {agentInfo.first_name} {agentInfo.last_name}</h2>
          <p><strong>Email:</strong> {agentInfo.email}</p>
          <p><strong>Phone:</strong> {agentInfo.phone}</p>
          <p><strong>Region:</strong> {agentInfo.region}</p>
          {/* <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button> */}
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


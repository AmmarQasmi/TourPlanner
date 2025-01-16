import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import { User, Hotel, Car, BookOpen, DollarSign, Plus, ChevronDown, ChevronUp, Search, Bell, Trash2 } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [sectionLoading, setSectionLoading] = useState({
    clients: false,
    hotels: false,
    cars: false,
    bookings: false,
    transactions: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('agent_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const decodedToken = jwt_decode.jwtDecode(token);
        const agentId = decodedToken.id;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        };

        setSectionLoading(prev => ({ ...prev, clients: true, hotels: true, cars: true, bookings: true, transactions: true }));

        const [
          agentResponse,
          clientResponse,
          hotelResponse,
          carResponse,
          bookingResponse,
          transactionResponse
        ] = await Promise.all([
          axios.get(`http://localhost:5000/api/agents/get/${agentId}`, config),
          axios.get('http://localhost:5000/api/clients', config),
          axios.get('http://localhost:5000/api/hotels/get', config),
          axios.get('http://localhost:5000/api/cars', config),
          axios.get('http://localhost:5000/api/bookings/get', config),
          axios.get('http://localhost:5000/api/transactions', config),
        ]);

        setAgentInfo(agentResponse.data.agent || null);
        setClients(clientResponse.data.Clients || []);
        setHotels(hotelResponse.data.hotels || []);
        setCars(carResponse.data.car || []);
        setBookings(bookingResponse.data.bookings || []);
        setTransactions(transactionResponse.data.transactions || []);

        setSectionLoading(prev => ({ ...prev, clients: false, hotels: false, cars: false, bookings: false, transactions: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        setSectionLoading({ clients: false, hotels: false, cars: false, bookings: false, transactions: false });
      }
    };

    fetchData();
  }, [navigate]);

  const handleRemoveClient = async (clientId) => {
    try {
      setSectionLoading(prev => ({ ...prev, clients: true }));
      const token = localStorage.getItem('agent_token');
      await axios.delete(`http://localhost:5000/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setClients(clients.filter(client => client.client_id !== clientId));
    } catch (error) {
      console.error('Failed to remove client:', error);
    } finally {
      setSectionLoading(prev => ({ ...prev, clients: false }));
    }
  };

  const handleUpdateBooking = async (bookingId, status) => {
    try {
      setSectionLoading(prev => ({ ...prev, bookings: true }));
      const token = localStorage.getItem('agent_token');
      await axios.put(
        `http://localhost:5000/api/bookings/update/${bookingId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setBookings(bookings.map(booking =>
        booking.booking_id === bookingId ? { ...booking, status } : booking
      ));
    } catch (error) {
      console.error(`Failed to ${status.toLowerCase()} booking:`, error);
    } finally {
      setSectionLoading(prev => ({ ...prev, bookings: false }));
    }
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
    setSectionLoading(prev => ({ ...prev, hotels: true }));
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
      setConfirmationMessage('Hotel added successfully!');
    } catch (error) {
      console.error('Failed to add hotel:', error);
      alert('Failed to add hotel. Please try again.');
    } finally {
      setSectionLoading(prev => ({ ...prev, hotels: false }));
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setSectionLoading(prev => ({ ...prev, cars: true }));
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
      setConfirmationMessage('Car added successfully!');
    } catch (error) {
      console.error('Failed to add car:', error);
    } finally {
      setSectionLoading(prev => ({ ...prev, cars: false }));
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      const token = localStorage.getItem('agent_token');
      await axios.delete(`http://localhost:5000/api/hotels/delete/${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setHotels(hotels.filter(hotel => hotel.hotel_id !== hotelId));
      setConfirmationMessage('Hotel deleted successfully!');
    } catch (error) {
      console.error('Failed to delete hotel:', error);
      alert('Failed to delete hotel. Please try again.');
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      const token = localStorage.getItem('agent_token');
      await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setCars(cars.filter(car => car.car_id !== carId));
      setConfirmationMessage('Car deleted successfully!');
    } catch (error) {
      console.error('Failed to delete car:', error);
      alert('Failed to delete car. Please try again.');
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Total Clients" value={clients.length} icon={<User />} />
      <DashboardCard title="Total Hotels" value={hotels.length} icon={<Hotel />} />
      <DashboardCard title="Total Cars" value={cars.length} icon={<Car />} />
      <DashboardCard title="Pending Bookings" value={bookings.filter(b => b.status === 'Pending').length} icon={<BookOpen />} />
      <DashboardCard title="Confirmed Bookings" value={bookings.filter(b => b.status === 'Confirmed').length} icon={<BookOpen />} />
      <DashboardCard title="Total Transactions" value={transactions.length} icon={<DollarSign />} />
    </div>
  );

  const renderClients = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Clients</h2>
      {sectionLoading.clients ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.client_id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {client.first_name} {client.last_name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{client.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{client.phone}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleRemoveClient(client.client_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderHotels = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Hotels</h2>
      {sectionLoading.hotels ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map(hotel => (
            <div key={hotel.hotel_id} className="border rounded-lg p-4 relative">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              <p className="text-sm">Rating: {hotel.rating}/5</p>
              <p className="text-sm">Capacity: {hotel.capacity}</p>
              <button
                onClick={() => handleDeleteHotel(hotel.hotel_id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={() => setShowAddHotelForm(!showAddHotelForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
        >
          {showAddHotelForm ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
          {showAddHotelForm ? 'Hide Form' : 'Add New Hotel'}
        </button>
        {showAddHotelForm && (
          <form onSubmit={handleAddHotel} className="mt-4 space-y-4">
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
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Add Hotel
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const renderCars = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Cars</h2>
      {sectionLoading.cars ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map(car => (
            <div key={car.car_id} className="border rounded-lg p-4 relative">
              <img src={car.image || "/placeholder.svg"} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h3 className="font-semibold">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-600">Year: {car.year}</p>
              <p className="text-sm">Capacity: {car.capacity}</p>
              <p className="text-sm">Price: ${car.rental_price_per_day}/day</p>
              <p className="text-sm">Status: {car.availability_status}</p>
              <button
                onClick={() => handleDeleteCar(car.car_id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        <button
          onClick={() => setShowAddCarForm(!showAddCarForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
        >
          {showAddCarForm ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
          {showAddCarForm ? 'Hide Form' : 'Add New Car'}
        </button>
        {showAddCarForm && (
          <form onSubmit={handleAddCar} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newCar.capacity}
              onChange={(e) => setNewCar({ ...newCar, capacity: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Rental Price Per Day"
              value={newCar.rental_price_per_day}
              onChange={(e) => setNewCar({ ...newCar, rental_price_per_day: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={newCar.availability_status}
              onChange={(e) => setNewCar({ ...newCar, availability_status: e.target.value })}
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
              onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Add Car
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const renderBookings = () => {
    const pendingBookings = bookings.filter(b => b.status === 'Pending');
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');

    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Manage Bookings</h2>
        {sectionLoading.bookings ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BookingSection
              title="Pending Bookings"
              bookings={pendingBookings}
              handleUpdateBooking={handleUpdateBooking}
              showActions={true}
            />
            <BookingSection
              title="Confirmed Bookings"
              bookings={confirmedBookings}
              handleUpdateBooking={handleUpdateBooking}
              showActions={false}
            />
            <BookingSection
              title="Cancelled Bookings"
              bookings={cancelledBookings}
              handleUpdateBooking={handleUpdateBooking}
              showActions={false}
            />
          </div>
        )}
      </div>
    );
  };

  const renderTransactions = () => (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {sectionLoading.transactions ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.transaction_id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.transaction_id}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.client_id}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${transaction.amount}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{transaction.status}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const DashboardCard = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-blue-500 text-4xl">{icon}</div>
    </div>
  );

  const BookingSection = ({ title, bookings, handleUpdateBooking, showActions }) => (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-2">{title} <span className="text-sm font-normal">({bookings.length})</span></h3>
      <div className="space-y-2">
        {bookings.map(booking => (
          <div key={booking.booking_id} className="border-b pb-2">
            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
            <p><strong>Client ID:</strong> {booking.client_id}</p>
            {showActions && (
              <div className="mt-2">
                <button
                  onClick={() => handleUpdateBooking(booking.booking_id, 'Confirmed')}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateBooking(booking.booking_id, 'Cancelled')}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Agent Dashboard</h1>
          {agentInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Agent Info</h2>
              <p><strong>Name:</strong> {agentInfo.first_name} {agentInfo.last_name}</p>
              <p><strong>Email:</strong> {agentInfo.email}</p>
              <p><strong>Region:</strong> {agentInfo.region}</p>
            </div>
          )}
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'dashboard' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'clients' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('clients')}
          >
            Clients
          </a>
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'hotels' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hotels
          </a>
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'cars' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('cars')}
          >
            Cars
          </a>
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'bookings' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </a>
          <a
            href="#"
            className={`block py-2 px-4 text-sm ${activeTab === 'transactions' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm h-16">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="h-[calc(100%-4rem)] max-w-full w-full p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {confirmationMessage && <div className="text-center text-green-500 mb-4">{confirmationMessage}</div>}

              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'clients' && renderClients()}
              {activeTab === 'hotels' && renderHotels()}
              {activeTab === 'cars' && renderCars()}
              {activeTab === 'bookings' && renderBookings()}
              {activeTab === 'transactions' && renderTransactions()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;


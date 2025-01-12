import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import { User, Mail, Phone, MapPin, Calendar, Car, Building, CreditCard } from 'lucide-react';

function ClientDashboard() {
    const [clientInfo, setClientInfo] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [bookedHotels, setBookedHotels] = useState([]);
    const [bookedCars, setBookedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('client_token');
                console.log('Token from localStorage:', token);

                if (!token) {
                    navigate('/login');
                    return;
                }

                const decodedToken = jwt_decode.jwtDecode(token);
                const clientId = decodedToken.id;
                console.log('Decoded Token:', decodedToken);
                console.log('Client ID:', clientId);

                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                };

                const [clientResponse, bookingsResponse, hotelsResponse, carsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/clients/${clientId}`, config),
                    // axios.get(`http://localhost:5000/api/bookings/${clientId}`, config),
                    // axios.get(`http://localhost:5000/api/hotels/booked/${clientId}`, config),
                    // axios.get(`http://localhost:5000/api/cars/booked/${clientId}`, config)
                ]);

                console.log("API Response:", clientResponse.data);

                const clientData = clientResponse.data.Clients;
                if (clientData && clientData.client_id === Number(clientId)) {
                    setClientInfo(clientData);
                    // setBookings(bookingsResponse.data.bookings || []);
                    // setBookedHotels(hotelsResponse.data.hotels || []);
                    // setBookedCars(carsResponse.data.cars || []);
                } else {
                    setError('Client not found.');
                }

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center text-red-500 text-xl font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome to Your Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Information Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
                        {clientInfo && (
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 mr-3 text-blue-500" />
                                    <span className="text-gray-600">{clientInfo.first_name} {clientInfo.last_name}</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                                    <span className="text-gray-600">{clientInfo.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 mr-3 text-blue-500" />
                                    <span className="text-gray-600">{clientInfo.phone || 'Not provided'}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                                    <span className="text-gray-600">{clientInfo.address || 'Not provided'}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Stats</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Bookings</span>
                                <span className="font-semibold text-blue-500">{bookings.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Active Bookings</span>
                                <span className="font-semibold text-green-500">
                                    {bookings.filter(booking => booking.status === 'Active').length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Booked Hotels</span>
                                <span className="font-semibold text-purple-500">{bookedHotels.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Booked Cars</span>
                                <span className="font-semibold text-orange-500">{bookedCars.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings Card */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Bookings</h2>
                    {bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.slice(0, 5).map((booking) => (
                                        <tr key={booking.booking_id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.booking_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.hotel_id ? (
                                                    <span className="flex items-center">
                                                        <Building className="w-4 h-4 mr-2 text-blue-500" />
                                                        Hotel
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center">
                                                        <Car className="w-4 h-4 mr-2 text-green-500" />
                                                        Car
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                    {new Date(booking.booking_date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    booking.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No bookings found.</p>
                    )}
                </div>

                {/* Booked Hotels Card */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Booked Hotels</h2>
                    {bookedHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookedHotels.map((hotel) => (
                                <div key={hotel.hotel_id} className="border rounded-lg p-4 flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <Building className="w-5 h-5 mr-2 text-blue-500" />
                                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">Location: {hotel.location}</p>
                                    <p className="text-sm text-gray-600 mb-1">Check-in: {new Date(hotel.check_in_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600 mb-1">Check-out: {new Date(hotel.check_out_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">Guests: {hotel.guests}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No booked hotels found.</p>
                    )}
                </div>

                {/* Booked Cars Card */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Booked Cars</h2>
                    {bookedCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookedCars.map((car) => (
                                <div key={car.car_id} className="border rounded-lg p-4 flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <Car className="w-5 h-5 mr-2 text-green-500" />
                                        <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">Year: {car.year}</p>
                                    <p className="text-sm text-gray-600 mb-1">Pickup Date: {new Date(car.pickup_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600 mb-1">Return Date: {new Date(car.return_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">Daily Rate: ${car.rental_price_per_day}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No booked cars found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClientDashboard;


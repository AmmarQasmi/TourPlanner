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

    const formatDate = (dateString) => {
        try {
            // First try to create a valid date object
            const date = new Date(dateString);
            
            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return 'Invalid Date';
            }

            // Format the date
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'Invalid Date';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('client_token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const decodedToken = jwt_decode.jwtDecode(token);
                const clientId = decodedToken.id;

                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                };

                // Fetch all required data
                const [clientResponse, bookingsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/clients/${clientId}`, config),
                    axios.get('http://localhost:5000/api/bookings/get', config)
                ]);

                const clientData = clientResponse.data.Clients;
                const allBookings = bookingsResponse.data.bookings;
                const clientBookings = allBookings.filter(booking => booking.client_id === clientId);

                if (clientData && clientData.client_id === Number(clientId)) {
                    setClientInfo(clientData);
                    setBookings(clientBookings);
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

    useEffect(() => {
        if (bookings.length > 0) {
            console.log('Raw date value:', bookings[0].booking_date);
        }
    }, [bookings]);

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

                    {/* Stats Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Stats</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Bookings</span>
                                <span className="font-semibold text-blue-500">{bookings.length}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Pending Bookings</span>
                                <span className="font-semibold text-yellow-500">
                                    {bookings.filter(booking => booking.status === 'Pending').length}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Completed Bookings</span>
                                <span className="font-semibold text-purple-500">
                                    {bookings.filter(booking => booking.status === 'Completed').length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings Table */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Bookings</h2>
                    {bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.booking_id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{booking.booking_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.destination_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(booking.booking_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${booking.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                                    booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${booking.total_amount}
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
            </div>
        </div>
    );
}

export default ClientDashboard;


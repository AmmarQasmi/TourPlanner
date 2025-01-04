import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); 

        try {
            const response = await axios.post('http://localhost:5000/api/clients/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful');
                navigate("/home"); 
            }
        } catch (err) {
            setError('Invalid credentials or server error'); 
            console.error('Login failed:', err);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-md shadow-lg rounded-lg p-8 mt-12 border">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome to TourPlanner</h2>
                <p className="text-lg text-center text-blue-600 mb-4">Please log in as Client</p>

                {/* Display error message if login fails */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={validate} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <Link
                        to="/clientsignup"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

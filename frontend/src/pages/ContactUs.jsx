import React, { useState } from 'react';
import axios from 'axios';
import tour from '../assets/tour.jpg'; 

function ContactUs() {
    const [formData, setFormData] = useState({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccess('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/contact/notify', formData);
            setSuccess(response.data.message);
            setFormData({
                subject: '',
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (err) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error('Error submitting form:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl p-5 bg-white bg-opacity-95 rounded-lg shadow-2xl grid lg:grid-cols-2 overflow-hidden">
                <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: `url(${tour})` }}></div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact Us</h2>
                    {success && <p className="text-green-600 mb-4">{success}</p>}
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="w-full">
                        <input 
                            type="text" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject" 
                            className="w-full mb-4 p-3 bg-blue-50 border border-transparent rounded-md focus:border-blue-500 focus:bg-white outline-none" 
                            required
                        />
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name" 
                            className="w-full mb-4 p-3 bg-blue-50 border border-transparent rounded-md focus:border-blue-500 focus:bg-white outline-none" 
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email" 
                            className="w-full mb-4 p-3 bg-blue-50 border border-transparent rounded-md focus:border-blue-500 focus:bg-white outline-none" 
                            required
                        />
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone" 
                            className="w-full mb-4 p-3 bg-blue-50 border border-transparent rounded-md focus:border-blue-500 focus:bg-white outline-none" 
                            required
                        />
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message" 
                            className="w-full mb-6 p-3 bg-blue-50 border border-transparent rounded-md focus:border-blue-500 focus:bg-white outline-none min-h-[120px] resize-none"
                            required
                        ></textarea>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;


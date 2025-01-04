import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const addressOptions = [
    'Karachi, Pakistan',
    'Lahore, Pakistan',
    'Islamabad, Pakistan',
    'Rawalpindi, Pakistan'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/clients', {
          client_id: undefined, // Let backend handle auto-generated ID
          ...formData
        });
        if (response.status === 201) {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 border">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-blue-600">
          Create your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="py-8 px-4 sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.first_name && <p className="text-error text-sm mt-1">{errors.first_name}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.last_name && <p className="text-error text-sm mt-1">{errors.last_name}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.phone && <p className="text-error text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <select
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select an address</option>
                {addressOptions.map((address, index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>
              {errors.address && <p className="text-error text-sm mt-1">{errors.address}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/clientlogin"
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;

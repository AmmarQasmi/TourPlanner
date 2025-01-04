import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AgentSignupForm = ({ 
  initialData = {}, 
  regions = ['north', 'south', 'east', 'west']
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    region: '',
    ...initialData
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.region) newErrors.region = 'Region is required';
    return newErrors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-box">
      <h2 className="text-2xl font-bold mb-6 text-center">Agent Signup</h2>
      <form method="post" className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="phone">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {errors.phone && <p className="text-error text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="region">
            <span className="label-text">Region</span>
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </option>
            ))}
          </select>
          {errors.region && <p className="text-error text-sm mt-1">{errors.region}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/agentlogin" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              sign in to your existing account
            </Link>
          </p>
      </form>
    </div>
  );
};

export default AgentSignupForm;

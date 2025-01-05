import React from 'react';
import { Link, Form } from 'react-router-dom';

const AgentSignupForm = ({ 
  initialData = {}, 
  regions = ['north', 'south', 'east', 'west']
}) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-box">
      <h2 className="text-2xl font-bold mb-6 text-center">Agent Signup</h2>
      <Form method="post" className="space-y-4"> {/* Removed 'action' attribute */}
        <div className="form-control">
          <label className="label" htmlFor="first_name">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name" // Updated name attribute to match backend
            defaultValue={initialData.first_name || ''} // Match backend field name
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="last_name">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            defaultValue={initialData.last_name || ''}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={initialData.email || ''}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="phone">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={initialData.phone || ''}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={initialData.password || ''}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label" htmlFor="region">
            <span className="label-text">Region</span>
          </label>
          <select
            id="region"
            name="region"
            defaultValue={initialData.region || ''}
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
        </div>

        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/agentlogin" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              sign in to your existing account
            </Link>
          </p>
      </Form>
    </div>
  );
};

export default AgentSignupForm;

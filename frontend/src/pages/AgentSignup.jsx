import React from 'react';
import axios from 'axios';
import signup from '../assets/signup.svg';
import { redirect, Form, Link } from 'react-router-dom';

// Action will be executed after submitting *this is done by REACT itself*
export const formAction = async ({ request }) => {
  try {
    // Collect and transform form data into JSON
    const formData = await request.formData();
    const agentData = Object.fromEntries(formData); // Auto-convert FormData to JSON

    console.log('Form data sent:', agentData); // Debugging log

    // Make API request
    const response = await axios.post(
      'http://localhost:5000/api/agents/create',
      agentData, // Send JSON body
      {
        headers: {
          'Content-Type': 'application/json' // Explicitly set JSON header
        }
      }
    );

    // Handle success
    if (response.status === 201) {
      console.log('Signup successful:', response.data);
      return redirect('/dashboard'); // Redirect to dashboard after success
    } else {
      // Handle validation errors from backend
      return new Response(
        JSON.stringify({ error: response.data.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error during signup:', error);

    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data.message
      : 'An unexpected error occurred. Please try again later.';

    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

const AgentSignup = () => {
  const initialData = {
    first_name: 'John', // Matches backend expectations
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '',
    region: '',
    password: '',
  };

  const customRegions = ['north', 'south', 'east', 'west', 'central'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <div className="max-w-md mx-auto mt-8 p-6 bg-base-200 rounded-box">
            <h2 className="text-2xl font-bold mb-6 text-center">Agent Signup</h2>
            <Form method="post" className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  defaultValue={initialData.first_name || ''}
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
                  {customRegions.map((region) => (
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
        </div>

        <div className="hidden lg:block w-full lg:w-1/2">
          <img
            src={signup}
            alt="Travel Agent"
            className="w-full h-[600px] object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;

import React from 'react';
import AgentSignupForm from '../components/AgentSignupForm';
import axios from 'axios';

//action will be executed after submitting *this is done by REACT itself*

export const formAction = async ({ request }) => {
    // Collect form data
    const formData = await request.formData();
    const agentData = {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        region: formData.get('region'),
        password: formData.get('password')
    };

    try {
        // API call using Axios
        const response = await axios.post('http://localhost:5000/api/agents/create', agentData);

        // Handle success
        if (response.status === 201) {
            const { message, agent } = response.data;
            console.log(message);
            console.log(agent);
            return redirect('/dashboard'); // Redirect after success
        } else {
            // Handle validation errors from backend
            const { error } = response.data;
            return json({ error }, { status: 400 });
        }
    } catch (error) {
        console.log(error);

        // Handle validation errors (400 Bad Request)
        if (error.response && error.response.status === 400) {
            return json({ error: error.response.data.message }, { status: 400 });
        }

        // Handle all other errors (500 or network issues)
        return json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
    }
};

const AgentSignup = () => {
  const initialData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '',
    password: '',
    region: ''
  };

  const customRegions = ['north', 'south', 'east', 'west', 'central'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Agent Signup Page</h1>
      <AgentSignupForm 
        initialData={initialData}
        regions={customRegions}
        successRedirect="/dashboard"
      />
    </div>
  );
};

export default AgentSignup;


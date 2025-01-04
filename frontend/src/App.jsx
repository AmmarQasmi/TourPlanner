import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import AgentSignup from './pages/AgentSignup';
import Destinations from './pages/Destinations';
import Rentals from './pages/Rentals';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import ClientSignup from './pages/clientSignup';
import ClientLogin from './pages/ClientLogin';
import AgentLogin from './pages/AgentLogin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="home" element={<Home />} />
      <Route path="agentsignup" element={<AgentSignup />} />
      <Route path="agentlogin" element={<AgentLogin />} />
      <Route path="clientlogin" element={<ClientLogin />} />
      <Route path="clientsignup" element={<ClientSignup />} />
      <Route path="destinations" element={<Destinations />} />
      <Route path="rentals" element={<Rentals />} />
      <Route path="hotels" element={<Hotels />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

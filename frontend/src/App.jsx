import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import AgentSignup, { formAction } from './pages/AgentSignup';
import Destinations from './pages/Destinations';
import Rentals from './pages/Rentals';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import ClientSignup from './pages/ClientSignup';
import ClientLogin from './pages/ClientLogin';
import AgentLogin from './pages/AgentLogin';
import { ThemeProvider } from './components/ThemeContext';
import ContactUs from './pages/ContactUs';
import FAQ from './components/FAQ';
import PrivacyPolicy from './components/PrivacyPolicy';
import HelpCenter from './components/HelpCenter';
import AgentDashboard from './pages/AgentDashboard';
import VerifyEmail from './pages/VerifyEmail';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", index: true, element: <Home />, },
      { path: "agentsignup", element: <AgentSignup />, action: formAction },
      { path: "agentlogin", element: <AgentLogin /> },
      { path: 'agentdashboard', element: <AgentDashboard /> },
      { path: "clientlogin", element: <ClientLogin /> },
      { path: "clientsignup", element: <ClientSignup /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "destinations", element: <Destinations /> },
      { path: "rentals", element: <Rentals /> },
      { path: "hotels", element: <Hotels /> },
      { path: "contact", element: <ContactUs /> },
      { path: "faq", element: <FAQ /> },
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "help", element: <HelpCenter /> },
    ],
  },
]);

const App = () => {
  return <ThemeProvider >
    <RouterProvider router={router} />
  </ThemeProvider>;
};

export default App;

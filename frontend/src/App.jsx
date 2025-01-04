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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", 
        index:true ,
        element: <Home />,
        action: formAction
      },
      { path: "agentsignup", element: <AgentSignup /> },
      { path: "agentlogin", element: <AgentLogin /> },
      { path: "clientlogin", element: <ClientLogin /> },
      { path: "clientsignup", element: <ClientSignup /> },
      { path: "destinations", element: <Destinations /> },
      { path: "rentals", element: <Rentals /> },
      { path: "hotels", element: <Hotels /> },
    ],
  },
]);


const App = () => {
  return <ThemeProvider >
    <RouterProvider router={router} />
  </ThemeProvider>;
};

export default App;

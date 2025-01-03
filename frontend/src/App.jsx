import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import AgentSignup from './pages/AgentSignup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: "/agents/signup",
        element: <AgentSignup />
      }
    ]
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

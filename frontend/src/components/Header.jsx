import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlannerMenuOpen, setIsPlannerMenuOpen] = useState(false); // Dropdown state
  const [isSignupMenuOpen, setIsSignupMenuOpen] = useState(false); // Sign In dropdown state
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false); // Login dropdown state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePlannerMenu = () => {
    setIsPlannerMenuOpen(!isPlannerMenuOpen);
  };

  const toggleSignupMenu = () => {
    setIsSignupMenuOpen(!isSignupMenuOpen);
  };

  const toggleLoginMenu = () => {
    setIsLoginMenuOpen(!isLoginMenuOpen);
  };

  return (
    <header className="bg-white shadow-md hover:bg-gray-100 hover:border-b-4 hover:border-gray-600 transition-all duration-300">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            Tourist Planner
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Destinations
            </Link>
            <div className="relative">
              <button
                onClick={togglePlannerMenu}
                className="nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Plan Trip
              </button>
              {isPlannerMenuOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md">
                  <Link
                    to="/hotels"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Hotel Book
                  </Link>
                  <Link
                    to="/rentals"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Car Rentals
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleSignupMenu}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Sign Up
              </button>
              {isSignupMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
                  <Link
                    to="/agentsignup"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Agent
                  </Link>
                  <Link
                    to="/clientsignup"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Client
                  </Link>
                </div>
              )}
            </div>
            {/* Login Button and Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLoginMenu}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Login
              </button>
              {isLoginMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
                  <Link
                    to="/agentlogin"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Agent
                  </Link>
                  <Link
                    to="/clientlogin"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300"
                  >
                    Client
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <Link
              to="/home"
              className="mobile-nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className="mobile-nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <div>
              <button
                onClick={togglePlannerMenu}
                className="w-full text-left mobile-nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Plan Trip
              </button>
              {isPlannerMenuOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/hotel-book"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPlannerMenuOpen(false);
                    }}
                  >
                    Hotel Book
                  </Link>
                  <Link
                    to="/car-rentals"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPlannerMenuOpen(false);
                    }}
                  >
                    Car Rentals
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={toggleSignupMenu}
                className="w-full text-left mobile-nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Sign Up
              </button>
              {isSignupMenuOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/agentsignup"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSignupMenuOpen(false);
                    }}
                  >
                    Agent
                  </Link>
                  <Link
                    to="/clientsignup"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSignupMenuOpen(false);
                    }}
                  >
                    Client
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile Login Dropdown */}
            <div>
              <button
                onClick={toggleLoginMenu}
                className="w-full text-left mobile-nav-link text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Login
              </button>
              {isLoginMenuOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/agentlogin"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginMenuOpen(false);
                    }}
                  >
                    Agent
                  </Link>
                  <Link
                    to="/clientlogin"
                    className="block text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginMenuOpen(false);
                    }}
                  >
                    Client
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

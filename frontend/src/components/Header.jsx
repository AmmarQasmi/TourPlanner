import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlannerMenuOpen, setIsPlannerMenuOpen] = useState(false);
  const [isSignupMenuOpen, setIsSignupMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Get auth state
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userRole = useSelector(state => state.auth.userRole);
  const isClient = userRole === 'client';

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !isClient) {
      navigate('/clientlogin', { 
        state: { from: '/booking/new' },
        replace: true 
      });
      return;
    }
    navigate('/booking/new');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePlannerMenu = () => setIsPlannerMenuOpen(!isPlannerMenuOpen);
  const toggleSignupMenu = () => setIsSignupMenuOpen(!isSignupMenuOpen);
  const toggleLoginMenu = () => setIsLoginMenuOpen(!isLoginMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="bg-base-100 shadow-md transition-all duration-300">
      <nav className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Tour Planner
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/destinations"
              className="btn btn-ghost btn-sm normal-case"
            >
              Destinations
            </Link>
            <Link
              to={isLoggedIn && isClient ? "/booking/new" : "/clientlogin"}
              onClick={handleBookNow}
              className="btn btn-ghost btn-sm normal-case"
            >
              Book Now
            </Link>
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn btn-ghost btn-sm normal-case m-1">
                Explore
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/hotels">Hotel Book</Link></li>
                <li><Link to="/rentals">Car Rentals</Link></li>
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-primary btn-sm normal-case m-1">
                  Sign Up
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link to="/agentsignup">Agent</Link></li>
                  <li><Link to="/clientsignup">Client</Link></li>
                </ul>
              </div>
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-primary btn-sm normal-case m-1">
                  Login
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link to="/agentlogin">Agent</Link></li>
                  <li><Link to="/clientlogin">Client</Link></li>
                </ul>
              </div>
            </div>
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
          </div>
          <button
            onClick={toggleMenu}
            className="lg:hidden btn btn-square btn-ghost"
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
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-base-100 shadow-md z-20`}>
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to={isLoggedIn && isClient ? "/booking/new" : "/clientlogin"}
              onClick={handleBookNow}
              className="btn btn-ghost btn-sm normal-case justify-start"
            >
              Book Now
            </Link>
            <Link
              to="/destinations"
              className="btn btn-ghost btn-sm normal-case justify-start"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <div className="collapse collapse-arrow">
              <input type="checkbox" checked={isPlannerMenuOpen} onChange={togglePlannerMenu} /> 
              <div className="collapse-title btn btn-ghost btn-sm normal-case justify-start">
                Explore
              </div>
              <div className="collapse-content">
                <Link
                  to="/hotels"
                  className="btn btn-ghost btn-sm normal-case justify-start block"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsPlannerMenuOpen(false);
                  }}
                >
                  Hotel Book
                </Link>
                <Link
                  to="/rentals"
                  className="btn btn-ghost btn-sm normal-case justify-start block mt-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsPlannerMenuOpen(false);
                  }}
                >
                  Car Rentals
                </Link>
              </div>
            </div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" checked={isSignupMenuOpen} onChange={toggleSignupMenu} />
              <div className="collapse-title btn btn-ghost btn-sm normal-case justify-start">
                Sign Up
              </div>
              <div className="collapse-content">
                <Link
                  to="/agentsignup"
                  className="btn btn-ghost btn-sm normal-case justify-start block"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignupMenuOpen(false);
                  }}
                >
                  Agent
                </Link>
                <Link
                  to="/clientsignup"
                  className="btn btn-ghost btn-sm normal-case justify-start block mt-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignupMenuOpen(false);
                  }}
                >
                  Client
                </Link>
              </div>
            </div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" checked={isLoginMenuOpen} onChange={toggleLoginMenu} />
              <div className="collapse-title btn btn-ghost btn-sm normal-case justify-start">
                Login
              </div>
              <div className="collapse-content">
                <Link
                  to="/agentlogin"
                  className="btn btn-ghost btn-sm normal-case justify-start block"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginMenuOpen(false);
                  }}
                >
                  Agent
                </Link>
                <Link
                  to="/clientlogin"
                  className="btn btn-ghost btn-sm normal-case justify-start block mt-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginMenuOpen(false);
                  }}
                >
                  Client
                </Link>
              </div>
            </div>
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


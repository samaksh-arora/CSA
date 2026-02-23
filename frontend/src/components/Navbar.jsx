import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg border-b-2 border-primary sticky top-0 z-50 px-2 sm:px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-sm lg:hidden p-2" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/officers" className="hover:text-primary">Officers</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/payment" className="hover:text-primary">Payment</Link></li>
            {currentUser && <li><Link to="/members" className="hover:text-primary">Members</Link></li>}
            {userRole === 'admin' && <li><Link to="/admin" className="hover:text-primary">Admin</Link></li>}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-sm sm:text-base md:text-xl font-bold px-1 sm:px-2 min-h-0 h-auto py-2">
          <span className="text-primary">WAYNE STATE</span>
          <span className="text-secondary ml-1 sm:ml-2 hidden xs:inline">GSCMA</span>
          <span className="text-secondary ml-1 sm:ml-2 inline xs:hidden">GSCMA</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
          <li><Link to="/officers" className="hover:text-primary transition-colors">Officers</Link></li>
          <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          {currentUser && <li><Link to="/members" className="hover:text-primary transition-colors">Members</Link></li>}
          {userRole === 'admin' && <li><Link to="/admin" className="hover:text-primary transition-colors">Admin</Link></li>}
          <li><Link to="/payment" className="hover:text-primary transition-colors">Payment</Link></li>
        </ul>
      </div>
      
      <div className="navbar-end gap-1 sm:gap-2">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-secondary btn-sm sm:btn-md" aria-label="User menu">
              <div className="w-8 sm:w-10 rounded-full">
                <img src={`https://ui-avatars.com/api/?name=${currentUser.email}&background=4ade80&color=ffffff`} alt="Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
              <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
              <li><a onClick={handleLogout} className="hover:text-error">Logout</a></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/join" className="btn btn-primary btn-xs sm:btn-sm hover:btn-secondary px-2 sm:px-4 min-h-0 h-8 sm:h-10">
              Join
            </Link>
            <Link to="/login" className="btn btn-ghost btn-xs sm:btn-sm hover:text-primary px-2 sm:px-4 min-h-0 h-8 sm:h-10">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

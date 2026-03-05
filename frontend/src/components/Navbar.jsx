import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCode } from 'react-icons/fa';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/officers', label: 'Officers' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userRole, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const linkClass = (path) =>
    `transition-colors text-sm font-medium px-3 py-1.5 rounded-lg ${
      isActive(path)
        ? 'text-primary bg-primary/10'
        : 'text-base-content/70 hover:text-primary hover:bg-primary/5'
    }`;

  return (
    <div
      className={`navbar sticky top-0 z-50 px-2 sm:px-6 transition-all duration-300 ${
        scrolled
          ? 'bg-base-100/95 backdrop-blur-md shadow-lg border-b border-base-300'
          : 'bg-base-100 border-b border-base-300'
      }`}
    >
      {/* ── Logo ── */}
      <div className="navbar-start">
        {/* Mobile hamburger */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm lg:hidden p-2"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-300"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={linkClass(to)}>{label}</Link>
              </li>
            ))}
            {currentUser && (
              <li><Link to="/members" className={linkClass('/members')}>Members</Link></li>
            )}
            {userRole === 'admin' && (
              <li><Link to="/admin" className={linkClass('/admin')}>Admin</Link></li>
            )}
          </ul>
        </div>

        {/* Brand */}
        <Link
          to="/"
          className="btn btn-ghost normal-case px-1 sm:px-2 min-h-0 h-auto py-2 hover:bg-transparent group"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <FaCode className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs text-primary font-mono tracking-widest uppercase">
                Wayne State
              </span>
              <span className="text-sm sm:text-base font-bold text-base-content tracking-tight">
                CS Association
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Desktop Nav ── */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={linkClass(to)}>{label}</Link>
            </li>
          ))}
          {currentUser && (
            <li><Link to="/members" className={linkClass('/members')}>Members</Link></li>
          )}
          {userRole === 'admin' && (
            <li>
              <Link to="/admin" className={linkClass('/admin')}>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Admin
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* ── Auth Controls ── */}
      <div className="navbar-end gap-1 sm:gap-2">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle btn-sm sm:btn-md p-0 border-2 border-primary/40 hover:border-primary transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 sm:w-10 rounded-full overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${currentUser.email}&background=random&color=ffffff&bold=true`}
                  alt="Profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-300"
            >
              <li className="menu-title px-3 py-1">
                <span className="text-xs text-base-content/40 font-mono truncate">{currentUser.email}</span>
              </li>
              <li>
                <Link to="/profile" className="text-base-content/70 hover:text-primary rounded-lg">
                  Profile
                </Link>
              </li>
              <div className="divider my-1 h-px" />
              <li>
                <a
                  onClick={handleLogout}
                  className="text-base-content/70 hover:text-error rounded-lg cursor-pointer"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-xs sm:btn-sm px-3 min-h-0 h-9"
            >
              Login
            </Link>
            <Link
              to="/join"
              className="btn btn-primary btn-xs sm:btn-sm px-3 sm:px-5 min-h-0 h-9 font-semibold"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

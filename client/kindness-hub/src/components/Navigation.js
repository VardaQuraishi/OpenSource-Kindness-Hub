// Navbar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <NavLink
        exact
        to="/"
        className={`navbar-link ${location.pathname === '/' ? 'active-link' : ''}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/completed-acts"
        className={`navbar-link ${location.pathname === '/completed-acts' ? 'active-link' : ''}`}
      >
        Completed Acts
      </NavLink>
      <NavLink
        to="/generate-random-act"
        className={`navbar-link ${location.pathname === '/generate-random-act' ? 'active-link' : ''}`}
      >
        Generate Random Act
      </NavLink>
      <NavLink
        to="/list-of-random-acts"
        className={`navbar-link ${location.pathname === '/list-of-random-acts' ? 'active-link' : ''}`}
      >
        List of Random Acts
      </NavLink>
    </nav>
  );
};

export default Navbar;

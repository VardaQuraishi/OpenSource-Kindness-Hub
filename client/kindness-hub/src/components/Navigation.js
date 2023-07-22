// NavigationBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <NavLink
        exact
        to="/"
        className="navbar-link"
        activeClassName="active-link"
      >
        Home
      </NavLink>
      <NavLink
        to="/completed-acts"
        className="navbar-link"
        activeClassName="active-link"
      >
        Completed Acts
      </NavLink>
      <NavLink
        to="/generate-random-act"
        className="navbar-link"
        activeClassName="active-link"
      >
        Generate Random Act
      </NavLink>
      <NavLink
        to="/list-of-random-acts"
        className="navbar-link"
        activeClassName="active-link"
      >
        List of Random Acts
      </NavLink>
    </nav>
  );
};

export default NavigationBar;

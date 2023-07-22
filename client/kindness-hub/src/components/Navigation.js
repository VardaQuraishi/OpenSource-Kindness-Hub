// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/completed-acts">My Completed Acts</Link>
        </li>
        <li>
          <Link to="/generate-random-act">Generate a Random Act</Link>
        </li>
        <li>
          <Link to="/list-of-random-acts">List of Random Acts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

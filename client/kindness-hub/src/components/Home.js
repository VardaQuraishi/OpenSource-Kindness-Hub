import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActCard from './ActCard';
import './Home';

const Home = () => {
  const [actsOfKindness, setActsOfKindness] = useState([]);

  useEffect(() => {
    // Fetch all acts of kindness from the server when the component mounts
    axios.get('/api/acts-of-kindness')
      .then((response) => {
        setActsOfKindness(response.data);
      })
      .catch((error) => {
        console.log('Error fetching acts of kindness:', error);
      });
  }, []);

  return (
    <div className="home-page">
      <h1>Random Acts of Kindness</h1>
      <div className="acts-container">
        {actsOfKindness.map((act) => (
          <ActCard key={act._id} act={act} />
        ))}
      </div>
    </div>
  );
};

export default Home;

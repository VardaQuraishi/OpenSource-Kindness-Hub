import React, { useState, useEffect } from 'react';
import ActCard from './ActCard';
import '../styles/Home.css';

const Home = () => {
  const [actsOfKindness, setActsOfKindness] = useState([]);

  useEffect(() => {
    // Fetch all acts of kindness from the server when the component mounts
    fetch('/api/acts-of-kindness')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActsOfKindness(data);
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

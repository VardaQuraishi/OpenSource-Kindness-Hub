// ListOfRandomActs.js
import React, { useState, useEffect } from 'react';

const ListOfRandomActs = () => {
  const [actsOfKindness, setActsOfKindness] = useState([]);

  useEffect(() => {
    // Fetch all acts of kindness from the server when the component mounts
    fetch('/api/acts-of-kindness', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
    <div>
      <h1>List of Random Acts</h1>
      <ul>
        {actsOfKindness.map((act) => (
          <li key={act._id}>
            <h2>{act.title}</h2>
            <p>Category: {act.category}</p>
            <p>{act.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default ListOfRandomActs;

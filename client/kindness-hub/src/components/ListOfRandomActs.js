import React, { useState, useEffect } from 'react';

const ListOfRandomActs = () => {
  const [actsOfKindness, setActsOfKindness] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Define the number of acts to show per page
  const actsPerPage = 2;

  // Calculate the starting and ending indices for the current page
  const startIndex = (currentPage - 1) * actsPerPage;
  const endIndex = startIndex + actsPerPage;

  // Use the filter method to show acts that match the selected filter
  const filteredActs = actsOfKindness.filter((act) => {
    if (selectedFilter === 'all') {
      return true;
    }
    return act.category === selectedFilter;
  });

  // Use the filter method to show acts that match the search query
  const searchedActs = filteredActs.filter((act) => {
    if (searchQuery === '') {
      return true;
    }
    // Perform search based on act title or description, for example
    return act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           act.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>List of Random Acts</h1>
      <div>
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search acts by title or description"
        />
        {/* Filter Dropdown */}
        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="all">All</option>
          {/* Add other filter options here */}
        </select>
      </div>
      <ul>
        {searchedActs.slice(startIndex, endIndex).map((act) => (
          <li key={act._id}>
            <h2>{act.title}</h2>
            <p>Category: {act.category}</p>
            <p>{act.description}</p>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= searchedActs.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ListOfRandomActs;

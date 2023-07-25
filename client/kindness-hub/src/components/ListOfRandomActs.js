import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import '../styles/ListOfRandomAct.css';

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
      <div className="container">
        <h1>List of Random Acts</h1>
        <div className="search-row">
          {/* Search Bar */}
          <input
            className="search-bar"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search acts by title or description"
          />
          {/* Filter Dropdown */}
          <select
            className="filter-dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All</option>
            {/* Add other filter options here */}
          </select>
        </div>
      </div>
      <div className="acts-table-container">
        <table className="acts-table">
          <thead>
            <tr>
              <th><h3>Title</h3></th>
              <th><h3>Category</h3></th>
              <th><h3>Description</h3></th>
            </tr>
          </thead>
          <tbody>
            {searchedActs.slice(startIndex, endIndex).map((act) => (
              <tr key={act._id}>
                <td>{act.title}</td>
                <td>{act.category}</td>
                <td>{act.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: Math.ceil(searchedActs.length / actsPerPage) }, (_, index) => (
          <button
            key={index}
            className="pagination-button"
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= searchedActs.length}
        >
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
};

export default ListOfRandomActs;

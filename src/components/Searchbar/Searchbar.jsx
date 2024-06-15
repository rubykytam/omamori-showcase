import React, { useState } from 'react';
import './Searchbar.css';

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search query:', query);
    onSearch(query);
  };

  return (
    <form className="searchbar input-group" onSubmit={handleSearch}>
      <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
      <input
        placeholder="Search here"
        type="text"
        className="form-control"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default Searchbar;

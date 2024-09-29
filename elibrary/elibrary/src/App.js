import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './comp/SearchBar.js';
import Cards from './comp/Cards.js';
import Login from './comp/Login.js';
import Signup from './comp/SignUp.js';

function App() {
  const [searchText, setSearchText] = useState('');
  const [randomQuery, setRandomQuery] = useState(null); // New state for random query

  const handleSearch = (text) => {
    setSearchText(text);
    setRandomQuery(null); // Clear random query on search
  };

  const handleHomeClick = () => {
    setSearchText(''); // Clear the search input
    const randomQueries = [
      'fantasy',
      'science fiction',
      'mystery',
      'romance',
      'non-fiction',
      'history',
      'biography',
      'self-help',
      'cookbooks',
      'travel',
    ];
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    setRandomQuery(randomQueries[randomIndex]); // Set random query
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} onHomeClick={handleHomeClick} />
      <Routes>
        <Route path="/" element={<Cards text={searchText || randomQuery} />} /> {/* Use random query */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

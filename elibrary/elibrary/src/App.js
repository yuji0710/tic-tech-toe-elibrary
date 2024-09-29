import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from "./comp/SearchBar";
import Cards from './comp/Cards';
import Login from './comp/Login';
import Signup from './comp/SignUp';

function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Routes>
        {/* Define the routes for different components */}
        <Route path="/" element={<Cards text={searchText} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

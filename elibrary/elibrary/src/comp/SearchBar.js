import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setDropdownOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setDropdownOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile-dropdown')) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="searchbar-container">
      <div className="searchbar-content">
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
        <form className="search-form" role="search" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="search"
            placeholder="Search for news, articles..."
            aria-label="Search"
            onChange={handleOnChange}
            value={searchText}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <button
            className="profile-button"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <li onClick={handleLoginClick} className="dropdown-item">
              Login
            </li>
            <li onClick={handleSignupClick} className="dropdown-item">
              Sign Up
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;

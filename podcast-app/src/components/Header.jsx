import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/categories">Categories</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      {/* Search input field */}
      <div className="search-container">
        <input type="text" placeholder="Search podcasts..." />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import './Header.css';
import { SlButton } from '@shoelace-style/shoelace/dist/react';

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
        <SlButton variant="primary">Search</SlButton>
      </div>
    </header>
  );
};

export default Header;

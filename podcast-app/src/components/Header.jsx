import React from "react";
import "./Header.css";
import { SlButton, SlInput } from "@shoelace-style/shoelace/dist/react";

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/discover">Discover</a>
          </li>
          <li>
            <a href="/favourites">Favourites</a>
          </li>
        </ul>
      </nav>

      {/* Search input field */}
      <div className="search-container">
        <SlInput type="text" placeholder="Search podcasts..." />
        <SlButton variant="primary">Search</SlButton>
      </div>
    </header>
  );
};

export default Header;

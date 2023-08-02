import React from "react";
import "./Header.css";
import { SlButton, SlInput } from "@shoelace-style/shoelace/dist/react";

const Header = () => {
  return (
    <header className="app-header">
      <nav className="navbar">
        <ul>
          <li>
            <SlButton href="/home">Home</SlButton>
          </li>
          <li>
            <SlButton href="/discover">Discover</SlButton>
          </li>
          <li>
            <SlButton href="/favourites">Favourites</SlButton>
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

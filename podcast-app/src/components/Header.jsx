import React, { useState } from "react";
import "./Header.css";
import micImage from '../images/mic.png'; // Update the path based on your project structure


const Header = ({
  handleSort,
  sortDirection,
  handleSearch,
  handleGenreChange,
  selectedGenre,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Call the handleSearch function passed from App
  };

  return (
    <header className="app-header">

      {/* Mic Image */}
      <div className="mic-image-container">
        <img src={micImage} alt="Mic" className="mic-image" />
        <h3 className="PodcastName">Mic Drop Moments</h3>
      </div>

      {/* Search input */}
      <div className="search-box">
        <input
          id="input"
          type="text"
          placeholder="Search podcasts by title..."
          value={searchQuery}
          onChange={handleSearchInputChange} // Handle search input change
        />
      </div>

      {/* Sorting dropdown */}
      <div className="sort-dropdown">
        <select
          id="sort"
          value={sortDirection}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Genre selection dropdown */}
      <div className="genre-dropdown">
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select a Genre</option>
          {Object.keys(genreMapping).map((genreId) => (
            <option key={genreId} value={genreId}>
              {genreMapping[genreId]}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;

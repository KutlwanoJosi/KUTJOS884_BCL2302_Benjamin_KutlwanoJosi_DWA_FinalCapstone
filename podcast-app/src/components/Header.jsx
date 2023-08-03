import React from "react";
import "./Header.css";


const Header = ({
  handleSort,
  sortDirection,
  handleSearch,
  handleGenreChange,
  selectedGenre,
}) => {
  
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

  return (
    <header className="app-header">
      <nav>
        {/* Navigation links */}
        <button type="button" class="btn btn-outline-dark">
          Home
        </button>
      </nav>

      <div className="search-container">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search podcasts..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="button" class="btn btn-outline-dark">
          Search
        </button>
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
        <select id="sortGenre" value={selectedGenre} onChange={handleGenreChange}>
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

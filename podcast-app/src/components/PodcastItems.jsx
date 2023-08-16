import React, { useState } from "react";
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast, handlePodcastClick }) => {
  // State for controlling the overlay and loading state
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for tracking the favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to toggle the overlay and simulate loading
  const handleToggleOverlay = async () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
    if (!showOverlay) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
      setIsLoading(false);
    }
  };

  // Mapping of genre IDs to genre names
  const genreMapping = {
    1: "Personal Growth",
    // ... (other genre mappings)
  };

  // Create an array of genre titles based on the genre IDs
  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  // Format the last updated date in a human-readable format
  const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to handle clicking on the favorite button
  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <div
      className={`podcast-item ${showOverlay ? "show-overlay" : ""}`}
      onClick={handleToggleOverlay}
    >
      {/* Display the podcast title and image */}
      <h3>{podcast.title}</h3>
      <img
        src={podcast.image}
        alt={`Podcast - ${podcast.title}`}
        height="200"
        width="200"
      />

      {showOverlay && (
        // Display the overlay with podcast details
        <div className="overlay">
          <div className="podcast-item">
            {isLoading ? (
              // Show loading message during loading state
              <h1>Loading...</h1>
            ) : (
              <div>
                {/* Display podcast details */}
                <h2>{podcast.title}</h2>
                <img
                  src={podcast.image}
                  alt={`Podcast - ${podcast.title}`}
                  height="200"
                  width="200"
                />
                <p>{podcast.description}</p>
                <strong>
                  <p>Genre: {genreTitles.join(", ")}</p>
                  <p>Last Updated: {lastUpdatedDate}</p>
                </strong> 
                {/* Button to toggle favorite status */}
                <button className="favBtn" onClick={handleFavoriteClick}>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Display the number of seasons */}
      <div className="seasons">
        <strong>
          <p>Seasons: {podcast.seasons}</p>
        </strong>
      </div>
    </div>
  );
};

export default PodcastItem;

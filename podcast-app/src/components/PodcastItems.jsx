import React, { useState } from "react";
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast, handlePodcastClick }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite status

  const handleToggleOverlay = async () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
    if (!showOverlay) {
      setIsLoading(true);
      // Simulate loading with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust the delay time as needed
      setIsLoading(false);
    }
  };

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
    // Add more genre mappings here
  };

  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <div
      className={`podcast-item ${showOverlay ? "show-overlay" : ""}`}
      onClick={handleToggleOverlay}
    >
      {/* Display the podcast image with fixed height and width */}
      <h3>{podcast.title}</h3>
      <img
        src={podcast.image}
        alt={`Podcast - ${podcast.title}`}
        height="200"
        width="200"
      />

      {showOverlay && (
        <div className="overlay">
          <div className="podcast-item">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div>
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
                </strong>
                <button onClick={handleFavoriteClick}>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="seasons">
        <strong>
          <p>Seasons: {podcast.seasons}</p>
        </strong>
      </div>
    </div>
  );
};

export default PodcastItem;

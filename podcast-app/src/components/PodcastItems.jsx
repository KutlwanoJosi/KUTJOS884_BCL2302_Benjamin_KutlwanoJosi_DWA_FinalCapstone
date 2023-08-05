import React, { useState } from "react";
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast, handlePodcastClick }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

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
  };

  const genreTitles = podcast.genres.map((genreId) => genreMapping[genreId]);

  const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
              <h1>Loading...</h1> // Display loading message
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
                  <p>Last Updated: {lastUpdatedDate}</p> {/* Display last updated date */}
                </strong>
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

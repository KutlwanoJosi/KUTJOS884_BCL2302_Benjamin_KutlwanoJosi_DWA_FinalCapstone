import React, { useState, useEffect } from "react";
import { SlButton, SlCard, SlRating } from '@shoelace-style/shoelace/dist/react';
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [detailedData, setDetailedData] = useState(null);

  useEffect(() => {
    const fetchDetailedData = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${podcast.id}`);
        const data = await response.json();
        setDetailedData(data);
      } catch (error) {
        console.error('Error fetching detailed data:', error);
      }
    };

    if (showOverlay && !detailedData) {
      fetchDetailedData();
    }
  }, [showOverlay, podcast.id, detailedData]);

  const handleToggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  const handleCloseOverlay = (event) => {
    if (event.target.closest('.overlay')) return;
    setShowOverlay(false);
  };

  return (
    <div
      className={`podcast-item ${showOverlay ? "show-overlay" : ""}`}
      onClick={handleCloseOverlay}
    >
      <SlCard className="card-overview">
        <img
          slot="image"
          src={podcast.image}
          alt={`Podcast - ${podcast.title}`}
          height="200"
          width="200"
        />

        <strong>{podcast.title}</strong>
        <br />
        <div slot="footer">
          <SlButton variant="primary" pill>
            More Info
          </SlButton>
          <SlRating></SlRating>
        </div>
      </SlCard>

      {showOverlay && detailedData && (
        <div className={`overlay ${showOverlay ? "active" : ""}`}>
          <h3>{detailedData.title}</h3>
          <p className="description">{detailedData.description}</p>
          
          {/* Display seasons and episodes */}
          {detailedData.SEASONS.map((season) => (
            <div key={season.id}>
              <h4>Season {season.title}</h4>
              <ul>
                {season.EPISODES.map((episode) => (
                  <li key={episode.id}>{episode.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <audio controls>
        <source src={podcast.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PodcastItem;

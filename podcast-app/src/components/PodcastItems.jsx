import React, { useState } from "react";
import { SlButton, SlCard, SlRating } from '@shoelace-style/shoelace/dist/react';
import "./PodcastItem.css"; // Import the custom CSS file

const PodcastItem = ({ podcast }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggleOverlay = () => {
    setShowOverlay((prevShowOverlay) => !prevShowOverlay);
  };

  return (
    <div className={`podcast-item ${showOverlay ? "show-overlay" : ""}`}>
      <SlCard className="card-overview" onClick={handleToggleOverlay}>
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

      <div className="overlay">
        <h3>{podcast.title}</h3>
        {showOverlay ? (
          <p className="description">{podcast.description}</p>
        ) : (
          <p className="description-preview">
            {podcast.description.slice(0, 100)}...
          </p>
        )}
      </div>

      <audio controls>
        <source src={podcast.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PodcastItem;

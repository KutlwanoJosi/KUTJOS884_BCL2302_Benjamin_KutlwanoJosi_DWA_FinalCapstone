import React from "react";
import "./PodcastItem.css";

const PodcastItem = ({ podcast }) => {
  return (
    <div className="podcast-item">
      <img src={podcast.image} alt={`Podcast - ${podcast.title}`} />
      <h3>{podcast.title}</h3>
      <p>{podcast.description}</p>
      <audio controls>
        <source src={podcast.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PodcastItem;

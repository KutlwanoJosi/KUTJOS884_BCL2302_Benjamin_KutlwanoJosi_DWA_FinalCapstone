import React, { useState, useEffect } from 'react';
import './PodcastItem.css';

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

  const handleToggleOverlay = (event) => {
    const isAudioElementClicked = event.target.tagName.toLowerCase() === 'audio'
      || event.target.closest('audio');
    if (!isAudioElementClicked) {
      setShowOverlay((prevShowOverlay) => !prevShowOverlay);
    }
  };

  return (
    <div
      className={`podcast-item ${showOverlay ? 'show-overlay' : ''}`}
      onClick={handleToggleOverlay}
    >
      {/* Display the podcast image with fixed height and width */}
      <img
        src={podcast.image}
        alt={`Podcast - ${podcast.title}`}
        height="200"
        width="200"
      />

      <div className="overlay">
        <h3>{podcast.title}</h3>
        {showOverlay && detailedData ? (
          <div>
            <p>{podcast.description}</p>
            {/* Display other relevant data like SEASON and EPISODES here */}
            <h4>SEASONS:</h4>
            <ul>
              {detailedData.SEASONS.map((season) => (
                <li key={season.id}>
                  {season.title} - {season.episode_count} episodes
                </li>
              ))}
            </ul>
            <h4>EPISODES:</h4>
            <ul>
              {detailedData.EPISODES.map((episode) => (
                <li key={episode.id}>
                  {episode.title}
                </li>
              ))}
            </ul>
            <audio controls>
              <source src={detailedData.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <p className="description-preview">{podcast.description.slice(0, 100)}...</p>
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

import React, { useState, useEffect } from "react";
import { Fragment } from "react"; // Import Fragment

const ShowDetailsPage = ({
  selectedShow,
  selectedSeason,
  selectedEpisode,
  loading,
  handlePodcastClick, // Pass the handlePodcastClick function
}) => {
  // Implement the UI for show details, seasons, and episodes
  const [favorites, setFavorites] = useState([]);

  // Define the addToFavourites function
  const addToFavourites = (episode) => {
    setFavorites((prevFavorites) => [...prevFavorites, episode]);
  };

  // Define the handleButtonClick function
  const handleButtonClick = () => {
    // Implement logic to show favorites
    console.log(favorites);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <button onClick={() => handlePodcastClick(null)}>
            Back to Show List
          </button>
          <h2>{selectedShow.title}</h2>
          {selectedShow.seasons.map((season) => (
            <div key={season.season}>
              <h3>Season {season.season}</h3>
              {selectedSeason === season.number ? (
                <ul>
                  {season.episodes.map((episode) => (
                    <Fragment key={episode.id}>
                      <h4>Episode: {episode.episode}</h4>
                      <li>{episode.title}</li>
                      <p>{episode.description}</p>
                      <audio controls>
                        <source src={episode.file} />
                      </audio>
                      {/* Add To Favorites button */}
                      <button
                        onClick={() => addToFavourites(episode)}
                      >
                        Add To Favorites
                      </button>

                      {/* Show Favorites button */}
                      <button onClick={handleButtonClick}>
                        Show Favorites
                      </button>
                    </Fragment>
                  ))}
                </ul>
              ) : (
                <div>
                  <img
                    src={season.image}
                    alt={`Season ${season.number}`}
                  />
                  <div>{season.episodes.length} Episodes</div>
                  <button
                    onClick={() =>
                      handlePodcastClick(selectedShow.id, season.number)
                    }
                  >
                    View Episodes
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDetailsPage;

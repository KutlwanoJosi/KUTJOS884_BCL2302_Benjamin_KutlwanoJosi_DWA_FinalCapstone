import React, { useEffect, useState } from 'react';
import PodcastList from './components/PodcastList';
import Header from './components/Header';

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSort = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const handlePodcastClick = (podcast) => {
    fetch(`https://podcast-api.netlify.app/id/${podcast.id}`)
      .then((response) => response.json())
      .then((data) => setSelectedShow(data))
      .catch((error) => console.error('Error fetching show details:', error));
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div className="app">
      <Header
        handleSort={handleSort}
        sortDirection={sortDirection}
        handleGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
      />
      <h1>Mic Drop Moments</h1>
      <PodcastList
        podcasts={shows}
        sortDirection={sortDirection}
        selectedGenre={selectedGenre}
        handlePodcastClick={handlePodcastClick}
        selectedPodcast={selectedShow}
      />
      {selectedShow && (
        <div>
          <h2>{selectedShow.title}</h2>
          <p>{selectedShow.description}</p>
          <strong>
            <p>Genres: {selectedShow.genre.join(', ')}</p>
          </strong>
          <div>
            <h3>Seasons:</h3>
            {selectedShow.seasons.map((season) => (
              <div key={season.id}>
                <p>{season.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

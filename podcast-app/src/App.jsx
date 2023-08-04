import React, { useEffect, useState } from 'react';
import PodcastList from './components/PodcastList';
import Header from './components/Header';
import PodcastItems from './components/PodcastItems';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; // Import the custom carousel styles

const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSort = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Header
        handleSort={handleSort}
        sortDirection={sortDirection}
        handleGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
        handleSearch={handleSearch}
      />
      
      <div className="carousel-container">
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true}>
          {podcasts.map((podcast) => (
            <div className="carousel-slide" key={podcast.id}>
              <img src={podcast.image} alt={`Podcast - ${podcast.title}`} />
            </div>
          ))}
        </Carousel>
      </div>
      

      <PodcastList
        podcasts={podcasts}
        sortDirection={sortDirection}
        selectedGenre={selectedGenre}
        searchQuery={searchQuery}
        handlePodcastClick={handlePodcastClick}
      />
      {selectedPodcast && <PodcastItems selectedPodcast={selectedPodcast} />}
    </div>
  );
};

export default App;

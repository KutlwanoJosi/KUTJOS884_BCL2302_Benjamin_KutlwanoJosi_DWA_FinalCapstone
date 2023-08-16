import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // Import BrowserRouter and Route
import PodcastList from './components/PodcastList';
import Header from './components/Header';
import ShowDetailsPage from './components/ShowDetailsPage';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const App = () => {
  // State variables for various app features
  const [podcasts, setPodcasts] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch podcast data from the API when the component mounts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPodcasts();
  }, []);

  // Fetch detailed show information including seasons and episodes
  const fetchShowDetails = async (showId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${showId}`
      );
      const data = await response.json();
      setSelectedShow(data);
      setSelectedSeason(null);
      setSelectedEpisode(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  // Toggle sorting direction between ascending and descending
  const handleSort = () => {
    setSortDirection((prevSortDirection) =>
      prevSortDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  // Handle clicking on a podcast to fetch its details
  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
    fetchShowDetails(podcast.id); // Fetch show details when podcast is clicked
  };

  // Handle changing the selected genre filter
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // Handle user search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      {/* Header component with sorting, filtering, and search options */}
      <Header
        handleSort={handleSort}
        sortDirection={sortDirection}
        handleGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
        handleSearch={handleSearch}
      />
      
      {/* Carousel of podcast images */}
      <div className="carousel-container">
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true}>
          {podcasts.map((podcast) => (
            <div className="carousel-slide" key={podcast.id}>
              <img src={podcast.image} alt={`Podcast - ${podcast.title}`} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Conditionally render ShowDetailsPage or PodcastList */}
      {selectedShow ? (
        <ShowDetailsPage
          selectedShow={selectedShow}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          loading={loading}
        />
      ) : (
        <PodcastList
          podcasts={podcasts}
          sortDirection={sortDirection}
          selectedGenre={selectedGenre}
          searchQuery={searchQuery}
          handlePodcastClick={handlePodcastClick}
        />
      )}
      
      {/* Conditionally render PodcastItems */}
      {selectedPodcast && (
        <PodcastItems
          selectedPodcast={selectedPodcast}
          selectedShow={selectedShow}
          selectedSeason={selectedSeason}
          selectedEpisode={selectedEpisode}
          loading={loading}
        />
      )}
    </div>
  );
};

export default App;

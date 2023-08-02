import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PodcastList from './components/PodcastList';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/cdn/');


const App = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  return (
    <div className="app">
      <Header />
      <h1>Podcast App</h1>
      <PodcastList podcasts={podcasts} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import PodcastItem from './PodcastItem';
import './PodcastList.css';

const PodcastList = ({ podcasts, sortDirection, selectedGenre }) => {
  const [sortedPodcasts, setSortedPodcasts] = useState([]);

  useEffect(() => {
    // Apply sorting
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortDirection === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    // Apply filtering based on selectedGenre
    const filteredPodcasts = selectedGenre
      ? sorted.filter((podcast) => podcast.genres.includes(parseInt(selectedGenre)))
      : sorted;

    setSortedPodcasts(filteredPodcasts);
  }, [podcasts, sortDirection, selectedGenre]);

  return (
    <div className="podcast-list">
      {sortedPodcasts.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastList;

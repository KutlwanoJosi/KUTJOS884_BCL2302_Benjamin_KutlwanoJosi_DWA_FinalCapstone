import React, { useEffect, useState } from 'react';
import PodcastItem from './PodcastItems';
import './PodcastList.css';
import Fuse from 'fuse.js';

const PodcastList = ({ podcasts, sortDirection, selectedGenre, searchQuery }) => {
  // State for holding the sorted and filtered podcasts
  const [sortedPodcasts, setSortedPodcasts] = useState([]);

  useEffect(() => {
    // Create a new instance of Fuse with your podcast data
    const fuse = new Fuse(podcasts, {
      keys: ['title', 'description'], // Fields to search within
      threshold: 0.3, // Fuzzy matching threshold (adjust as needed)
    });

    // Apply filtering based on selectedGenre
    const filteredPodcasts = selectedGenre
      ? podcasts.filter((podcast) => podcast.genres.includes(parseInt(selectedGenre)))
      : podcasts;

    // Apply searching based on searchQuery using Fuse.js
    const searchedPodcasts = searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : filteredPodcasts;

    // Apply sorting based on selected sortDirection
    const sorted = [...searchedPodcasts];
    sorted.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortDirection === 'asc') {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    // Update the state with the sorted and filtered podcasts
    setSortedPodcasts(sorted);
  }, [podcasts, sortDirection, selectedGenre, searchQuery]);

  return (
    <div className="podcast-list">
      {sortedPodcasts.map((podcast) => (
        // Render each PodcastItem component with the sorted and filtered podcast data
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastList;

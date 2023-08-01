import React from 'react';
import PodcastItem from './PodcastItems';
import './PodcastList.css'; 

const PodcastList = ({ podcasts }) => {
  return (
    <div className="podcast-list">
      {podcasts.map((podcast) => (
        <PodcastItem key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastList;

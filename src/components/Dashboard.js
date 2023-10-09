import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../src/style/dashboard.css';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Your YouTube Data API Key
    const apiKey = 'AIzaSyA8Z3mFNt8Cca9iL8KWI6ZMbZINvcRTfjA';

    // Fetch YouTube videos
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=YOUR_SEARCH_QUERY`
      )
      .then((response) => {
        const videoData = response.data.items;
        setVideos(videoData);
      })
      .catch((error) => {
        console.error('Error fetching YouTube videos:', error);
      });
  }, []);

  return (
    <div className="video-container">
      <nav>  
        <Link to="/upload" className="upload-button"> Project Upload</Link> {/* Use Link to navigate to /upload */}
      </nav>
      <h2>Study Lectures</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div className="video-card" key={video.id.videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-title">{video.snippet.title}</h3>
                <p className="video-description">{video.snippet.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


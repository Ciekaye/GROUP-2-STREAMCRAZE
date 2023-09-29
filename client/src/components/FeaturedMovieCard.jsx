import React, { useState, useEffect } from "react";
import "../styles/FeaturedMovieCard.css";

const FeaturedMovieCard = ({ featuredMovie, loading }) => {
  const [fade, setFade] = useState("");
  const baseUrl = "https://image.tmdb.org/t/p/w500";  // Base URL for TMDB images
  
  useEffect(() => {
    if (featuredMovie) {
      setFade(""); // reset any previous fade
      const timeout = setTimeout(() => {
        setFade("featured-fade-out");
      }, 1000); // wait for 1s then apply the fade-out effect

      return () => clearTimeout(timeout); // cleanup timeout on unmount
    }
  }, [featuredMovie]);

  // If loading is true, return the loading spinner
  if (loading) {
    return (
      <div className="card-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className={`row custom-fade-header ${fade}`} style={{ position: 'relative' }}>
      <img 
        className="home-child col-12" 
        alt={featuredMovie?.title} 
        src={`${baseUrl}${featuredMovie?.backdrop_path}`}
        style={{minWidth: '100%', filter: 'blur(4px)', textAlign: 'left'}} 
      />
 
        <div className="heart-wrapper col-1">
          <img className="heart-icon" alt="" src="/heart.svg" />
        </div>
        <div className="sci-fi-movie col-3">
          {featuredMovie?.release_date} | {featuredMovie?.genre} | Movie
        </div>
        <div className="watch-now-wrapper">
          <div className="watch-now">Watch now</div>
          
        </div>
        <div className="popularity-and-rating col-2">
            Popularity: {featuredMovie?.popularity} | Rating: {featuredMovie?.vote_average}
          </div>
        <div className="col-6 movie-title">
          <div className="avatar-the-way">{featuredMovie?.title}</div>

        </div>
      
    </div>
  );
};

export default FeaturedMovieCard;

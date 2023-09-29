import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useHistory} from 'react-router-dom';

const DetailedMoviePage = () => {
  const goBack = () => {
    window.history.back();
  }
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  console.log('Movie ID:', id);
  const [loading, setLoading] = useState(true); // Add a loading state
  const TMDB_API_KEY = '4848bcd4d1b10e9fecb6dea36217ab66'
  const [genreNames, setGenreNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  const formatRevenue = (revenue) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(revenue);
  };

  // Step 1: Add state for sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Step 2: Create a toggle function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchSearchResults = (query) => {
    fetch(`http://localhost:5000/movies?search=${query}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        console.log(data)
      })
      .catch(error => console.error(error));
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchResults([]);  // Clear search results if search bar is empty
    } else {
      // Call a function to fetch results based on search term
      fetchSearchResults(e.target.value);
    }
  };

  useEffect(() => {
    console.log("DetailedMoviePage mounted with ID:", id);
    // Fetch movie details using the id
    const apiUrl = `http://localhost:5000/movies/${id}`;
    console.log('Fetching data from:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data); // Check if data is received
  
        // Ensure that the 'poster_path' property is set correctly
        data.poster_path = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
  
        console.log('Modified data:', data); // Check the modified data
  
        setMovie(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error.message);
        // Handle the error as needed, e.g., display an error message
        setLoading(false); // Set loading to false in case of an error
      });
  }, [id]);
  
  
  if (loading) {
    // Display a loading message while data is being fetched
    return <div>Loading...</div>;
  }

  if (!movie) {
    // Handle the case when movie data is not available
    return <div>Movie not found</div>;
  }

  // Render movie details when data is available
  return (
    <div className='Custombody'>    
<div className="container d-container">


  <div className="row">
    <div className="col-md-6">
      <div className='poster-img'>
        <img src={movie.poster_path} alt={movie.title} className="img-fluid" />
      </div>
    </div>
    <div className="col-md-6">
      <div className='all-info'>
        <h1>{movie.title}</h1>
        <p>"{movie.tagline}"</p>
        <p>Rating: {movie.vote_average} &#x2f; {movie.vote_count}</p>
        <p>Duration: {movie.runtime} minutes</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Popularity: {movie.popularity}</p>
        <p>Revenue: {formatRevenue(movie.revenue)}</p>
        <p>Overview: {movie.overview}</p>
        <a href={movie.homepage} className="btn btn-primary">Learn More</a>
        <a href='#' className="btn btn-primary goback" onClick={goBack}>Back</a>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default DetailedMoviePage;

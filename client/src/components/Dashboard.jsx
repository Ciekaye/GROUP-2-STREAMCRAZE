import React, { useState, useEffect, useRef } from 'react';
import "../styles/Dashboard.css";
import CardContainer from "../components/CardContainer";
import Container from "../components/Container";
import FeaturedMovieCard from "./FeaturedMovieCard";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  try {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const topRef = useRef(null);
    const [clickedShowMore, setClickedShowMore] = useState(false);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    // Step 1: Add state for sidebar open/close
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Step 2: Create a toggle function
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearchEnter = (e) => {
      if (e.key === 'Enter') {
        handleSearchChange(e);
        console.log("Search for:", e.target.value);
      }
    };

const handleCardClick = (movie) => {
  // Log to check if the function is triggered
  console.log("Card clicked:", movie);

  // Navigate to the detailed movie page and pass the movie data
  navigate(`/movie/${movie.id}`);
};

const generateMovieKey = (movie, index) => {
  return `${movie.id}_${index}`;
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
// Add a new state variable to manage the current page
const [currentPage, setCurrentPage] = useState(1);
  const getGenreName = (id) => {
    const genre = genres.find(gen => gen.id === id);
    return genre ? genre.name : 'Unknown';
  };

  const fetchMovies = (page = 1) => {
    setLoading(true);
    fetch(`http://localhost:5000/movies?page=${page}`)  // <-- Updated the fetch URL to include the page parameter
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data]);
        setCurrentPage(page);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error.message);
        setError(error.message);
        setLoading(false);
      });
};

  const lastMovieRef = useRef(null);

  const handleShowMore = () => {
    setClickedShowMore(true); // update the state when "Show More" is clicked
    fetchMovies(currentPage + 1);
    fetchMovies(currentPage + 1);
  };

  useEffect(() => {
    fetch('http://localhost:5000/dashboard', {
      credentials: 'include' // Important for sending the session cookie
    })
    .then(response => {
      if (response.status === 401) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    })
    .catch(error => {
      console.error('Error checking authentication:', error);
    });
  }, [navigate]);

  useEffect(() => {

    // Fetch movies from the API when the component mounts
    fetch('http://localhost:5000/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
          // Set a random movie as the featured movie

  
  const randomIndex = Math.floor(Math.random() * data.length);
  setFeaturedMovie(data[randomIndex]);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error.message);
        setError(error.message);
      });
      fetchMovies();
  }, []);

  useEffect(() => {
    if (clickedShowMore && lastMovieRef.current) {
      lastMovieRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [movies, clickedShowMore]);

  useEffect(() => {
    if (movies.length === 0) return; // Don't set an interval if there are no movies
  
    // Change the featured movie every 2 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setFeaturedMovie(movies[randomIndex]);
    }, 2000);
  
    // Clear interval when component is unmounted
    return () => clearInterval(interval);
  }, [movies]); // Dependency on the movies array so it will reset if movies change
  
  return (
    <div className={`home container-fluid ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="row">
          {isSidebarOpen && <Container className="col-12" />}
    </div>
    <div className="row custom-full-width">
    <div className="home-child col-12"  ref={topRef} style={{maxWidth: '100%'}} >
    <FeaturedMovieCard featuredMovie={featuredMovie} loading={loading} />

    </div>
    </div>

    <div className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button className="btn btn-primary menu-opener" onClick={toggleSidebar}>Menu</button>

        <div className="mx-auto order-0">
        <div className="input-group">
        <input 
            type="text" 
            className="form-control" 
            placeholder="Search a movie..." 
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <div className="input-group-append">
            <span className="input-group-text" onClick={() => fetchSearchResults(searchTerm)}>
                <i className="fas fa-search"></i>
            </span>
        </div>
      </div>
        </div>

        <div className="navbar-nav">
            <a className="nav-item nav-link active account-username" href="#">
                <img className="rounded-circle mr-2" alt="Account" src="/ellipse-757@2x.png" style={{width: '30px', height: '30px'}} />
                User
            </a>
        </div>
    </div>
</div>


<div className="row movie-div">
  <div className="parent-div">
    {error ? (
      <div className="col-12">Error: {error}</div>
    ) : searchResults.length > 0 ? (
      searchResults.map((movie, index) => (
        <React.Fragment key={generateMovieKey(movie, index)}>
          <div className="movie-list" onClick={() => handleCardClick(movie)} ref={index === searchResults.length - 1 ? lastMovieRef : null}>
            <CardContainer
              image={movie.poster_path}
              title={movie.title}
              genreYear={`${new Date(movie.release_date).getFullYear()} | ${getGenreName(movie.genre_ids[0])}`}
              loading={loading}
              // onClick={() => handleCardClick(movie)}
              movie={movie}
            />
          </div>
        </React.Fragment>
      ))
    ) : (
      movies.map((movie, index) => (
        <React.Fragment key={generateMovieKey(movie, index)}>
          <div className="movie-list" onClick={() => handleCardClick(movie)} ref={index === movies.length - 1 ? lastMovieRef : null}>
            <CardContainer
              image={movie.poster_path}
              title={movie.title}
              genreYear={`${new Date(movie.release_date).getFullYear()} | ${getGenreName(movie.genre_ids[0])}`}
              loading={loading}
              // onClick={() => handleCardClick(movie)}
              movie={movie}
            />
          </div>
        </React.Fragment>
      ))
    )}
  </div>
  <div className="buttons-wrapper">
    <button className="btn btn-primary back-to-top-button" onClick={() => topRef.current.scrollIntoView({ behavior: 'smooth' })}>
      Back to Top
    </button>
    <button className="btn btn-primary show-more-button" onClick={handleShowMore}>
      Show More
    </button>
  </div>
</div>



</div>

  );

} catch (error) {
  console.error('Dashboard error:', error);
}

};

export default Dashboard;

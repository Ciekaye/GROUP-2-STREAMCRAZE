const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();
const session = require('express-session');
app.use(cors({
  origin: 'http://localhost:3000', // replace with your front-end domain
  credentials: true
}));
app.use(express.json());

const TMDB_API_KEY = '4848bcd4d1b10e9fecb6dea36217ab66'
// Set up SQLite database connection
const db = new sqlite3.Database('./database.sqlite');


db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);


app.use(session({
  secret: 'mySecretKey', // Change this to a long random string
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, // Set to true if you're using HTTPS
      maxAge: 3600000 // 1 hour
  }
}));

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function(err) {
    if (err) {
      return res.json({ success: false, error: 'Error signing up. Please try again.' });
    }
    res.json({ success: true });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login endpoint hit with:", req.body);
  
  db.get('SELECT password FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.json({ success: false, error: 'Error logging in. Please try again.' });
    }
    if (row && await bcrypt.compare(password, row.password)) {
      req.session.isAuthenticated = true;
      req.session.userId = row.id;
      res.json({ success: true });
  } else {
      res.json({ success: false, error: 'Invalid email or password.' });
  }
  });
});

const fetchMultiplePages = async (pages) => {
  let allMovies = [];

  for (let page = 1; page <= pages; page++) {
      try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
          allMovies = allMovies.concat(response.data.results);
      } catch (error) {
          console.error(`Error fetching movies from TMDb on page ${page}:`, error);
          throw new Error('Failed to fetch movies');
      }
  }

  return allMovies;
};

app.get('/movies', async (req, res) => {
  try {
    const page = req.query.page || 1; // Get the page number from the query parameter
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching movies from TMDb:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ success: true, message: 'User is authenticated' });
});

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
      return res.status(400).json({ error: 'Query parameter q is required.' });
  }
  
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_API_KEY}`);
      res.json(response.data.results);
  } catch (error) {
      console.error('Error searching for movies:', error);
      res.status(500).json({ error: 'Failed to search movies' });
  }
});


function isAuthenticated(req, res, next) {
  console.log('Session:', req.session);
  if (req.session && req.session.isAuthenticated) {
      next();
  } else {
      res.status(401).json({ error: 'You are not authenticated' });
  }
}

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});

app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
    res.json(response.data); // Respond with the movie details in JSON format
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId} from TMDb:`, error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

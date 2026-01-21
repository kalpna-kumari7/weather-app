// import React, { useState } from 'react';
// import axios from 'axios';
// import WeatherDisplay from './WeatherDisplay';
// import './App.css';

// const API_KEY = '4e1439739cb3aaf8adabd5b23b4f1970'; // API key
// const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// function App() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState('');

//   const fetchWeather = async () => {
//     if (!city) return;
//     try {
//       const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
//       setWeather(response.data);
//       setError('');
//     } catch (err) {
//       setError('City not found or API error. Please try again.');
//       setWeather(null);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeather();
//   };

//   return (
//     <div className="app">
//       <h1>Weather App</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           type="text"
//           placeholder="Enter city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="input"
//         />
//         <button type="submit" className="button">Get Weather</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {weather && <WeatherDisplay weather={weather} />}
//     </div>
//   );
// }

// export default App;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import { ClipLoader } from 'react-spinners';
import { WiDaySunny, WiNightClear } from 'react-icons/wi'; 
import './App.css';

const API_KEY = '4e1439739cb3aaf8adabd5b23b4f1970'; // API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // New: Dark mode state

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const fetchWeather = async (lat = null, lon = null) => {
    setLoading(true);
    try {
      let url = `${API_URL}?appid=${API_KEY}&units=metric`;
      if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
      } else {
        url += `&q=${city}`;
      }
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Unable to fetch weather. Check city name or try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather();
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => setError('Geolocation access denied. Please enter a city.')
      );
    } else {
      setError('Geolocation not supported by this browser.');
    }
  };

  const handleClear = () => {
    setCity('');
    setWeather(null);
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1 text-ali >Weather App</h1>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <WiNightClear /> : <WiDaySunny />}
          </button>
        </header>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter city name (e.g., London)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
          />
          <div className="button-group">
            <button type="submit" className="button primary" disabled={loading}>
              {loading ? 'Fetching...' : 'Get Weather'}
            </button>
            <button type="button" onClick={handleGeolocation} className="button geo">
              Use My Location
            </button>
            <button type="button" onClick={handleClear} className="button secondary">
              Clear
            </button>
          </div>
        </form>
        {loading && <ClipLoader color={darkMode ? '#fff' : '#007bff'} size={50} className="spinner" />}
        {error && (
          <div className="error">
            <span>⚠️</span> {error}
            <button onClick={() => setError('')} className="retry">Dismiss</button>
          </div>
        )}
        {weather && <WeatherDisplay weather={weather} darkMode={darkMode} />}
        <footer>
          <p>Powered by OpenWeatherMap | Built with React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
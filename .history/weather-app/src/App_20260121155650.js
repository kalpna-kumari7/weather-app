import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import './App.css';

const API_KEY = '4e1439739cb3aaf8adabd5b23b4f1970'; // API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found or API error. Please try again.');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
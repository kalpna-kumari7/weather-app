import React from 'react';

function WeatherDisplay({ weather }) {
  const { name, main, weather: weatherDetails } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weatherDetails[0].description} />
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Description: {weatherDetails[0].description}</p>
    </div>
  );
}

export default WeatherDisplay;
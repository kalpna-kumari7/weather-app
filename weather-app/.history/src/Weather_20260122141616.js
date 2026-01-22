import React from 'react';

import { WiHumidity, WiThermometer, WiStrongWind, WiFog } from 'react-icons/wi';
import "react-tooltip/dist/react-tooltip.css";

function Weather({ weather, darkMode }) {
  const { name, main, weather: weatherDetails, wind, visibility } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className={`weather-card ${darkMode ? 'dark' : ''}`}>
      <h2>{name}</h2>
      <div className="weather-main">
        <img src={iconUrl} alt={weatherDetails[0].description} className="weather-icon" />
        <div className="weather-details">
          <p className="temp" data-tip="Current Temperature"><WiThermometer /> {main.temp}°C</p>
          <p className="feels-like" data-tip="Feels Like Temperature">Feels like: {main.feels_like}°C</p>
          <p className="desc">{weatherDetails[0].description}</p>
        </div>
      </div>
      <div className="weather-extra">
        <p data-tip="Humidity Level"><WiHumidity /> Humidity: {main.humidity}%</p>
        <p data-tip="Wind Speed"><WiStrongWind /> Wind: {wind.speed} m/s</p>
        <p data-tip="Visibility"><WiFog /> Visibility: {(visibility / 1000).toFixed(1)} km</p>
      </div>
      <data-tooltip place="top" type={darkMode ? 'light' : 'dark'} />
    </div>
  );
}

export default Weather;
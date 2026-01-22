import React from "react";
import Lottie from "lottie-react";
import {
  WiHumidity,
  WiThermometer,
  WiStrongWind,
  WiFog,
} from "react-icons/wi";

import sunnyGirl from "./animation/sunny.json";
import rainGirl from "./animation/rain.json";
import cloudyGirl from "./animation/cloud.json";
import snowGirl from "../animation/snow.json";
import defaultGirl from "../animation/default.json";

const getWeatherAnimation = (condition) => {
  switch (condition) {
    case "Clear":
      return sunnyGirl;
    case "Rain":
    case "Drizzle":
      return rainGirl;
    case "Clouds":
      return cloudyGirl;
    case "Snow":
      return snowGirl;
    default:
      return defaultGirl;
  }
};

function Weather({ weather, darkMode }) {
  const { name, main, weather: details, wind, visibility } = weather;

  const condition = details[0].main;
  const animationData = getWeatherAnimation(condition);

  const iconUrl = `https://openweathermap.org/img/wn/${details[0].icon}@2x.png`;

  return (
    <div className={`weather-card ${darkMode ? "dark" : ""}`}>

      {/* 🌈 WEATHER BASED GIRL ANIMATION (BACKGROUND) */}
      <div className="weather-bg-animation">
        <Lottie animationData={animationData} loop />
      </div>

      <h2 className="city-name">{name}</h2>

      <div className="weather-main">
        <img src={iconUrl} alt={details[0].description} className="weather-icon" />

        <div className="weather-details">
          <p className="temp">
            <WiThermometer /> {main.temp}°C
          </p>
          <p className="feels-like">
            Feels like {main.feels_like}°C
          </p>
          <p className="desc">{details[0].description}</p>
        </div>
      </div>

      <div className="weather-extra">
        <p><WiHumidity /> Humidity: {main.humidity}%</p>
        <p><WiStrongWind /> Wind: {wind.speed} m/s</p>
        <p><WiFog /> Visibility: {(visibility / 1000).toFixed(1)} km</p>
      </div>

    </div>
  );
}

export default Weather;

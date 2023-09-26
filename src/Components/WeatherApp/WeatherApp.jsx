import "./WeatherApp.scss";

//importing images
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/search.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import searchs from "../Assets/search.png";
import { useState } from "react";

const WeatherApp = () => {
  let api_key = "6444dc1ad4efdf6800a49c4e7d1120d7";

  const [wicon, setWicon] = useState(cloud);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("API request failed"); // Handle non-successful response
      }
      let data = await response.json();
      if (!data.main || !data.main.humidity) {
        throw new Error("Data format is not as expected"); // Handle unexpected data format
      }

      const humidity = document.getElementsByClassName("humidity-percentage");
      const wind = document.getElementsByClassName("wind-rate");
      const temp = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const feelsLike = document.getElementsByClassName("feels");

      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = Math.floor(data.wind.speed) + "km/hr";
      temp[0].innerHTML = Math.floor(data.main.temp) + "°c";
      location[0].innerHTML = data.name;
      feelsLike[0].innerHTML =
        "Feels Like " + Math.floor(data.main.feels_like) + "°c";

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      }
      if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
        setWicon(cloud);
      }
      if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
        setWicon(drizzle);
      }
      if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
        setWicon(drizzle);
      }
      if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
        setWicon(rain);
      }
      if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
        setWicon(rain);
      }
      if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
        setWicon(snow);
      } else {
        wicon(clear);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchs} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="cloudicon" />
        </div>
        <div className="weather-temp">0°c</div>
        <div className="weather-location">Please search the city</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percentage">0%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">0 km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        <div className="data-description">
          <div className="feels">Feels like 0°c</div>
        </div>
        <div className="copyright">
          <p>©Anishpokhrel2023</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

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

const WeatherApp = () => {
  let api_key = "6444dc1ad4efdf6800a49c4e7d1120d7";
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

      humidity[0].innerHTML = data.main.humidity;
      wind[0].innerHTML = data.wind.speed;
      temp[0].innerHTML = data.main.temp;
      location[0].innerHTML = data.name;
    } catch (error) {
      console.error(error); // Log the error for debugging
      // Handle the error, e.g., display an error message to the user
    }
  };

  // const search = async () => {
  //   const element = document.getElementsByClassName("cityInput");
  //   if (element[0].value === "") {
  //     return 0;
  //   }
  //   let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
  //   let response = await fetch(url);
  //   let data = response.json;
  //   const humidity = document.getElementsByClassName("humidity-percentage");
  //   const wind = document.getElementsByClassName("wind-rate");
  //   const temp = document.getElementsByClassName("weather-temp");
  //   const location = document.getElementsByClassName("weather-location");

  //   humidity[0].innerHTML = data.main.humidity;
  //   wind[0].innerHTML = data.wind.speed;
  //   temp[0].innerHTML = data.main.temp;
  //   location[0].innerHTML = data.name;
  // };
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
          <img src={cloud} alt="cloudicon" />
        </div>
        <div className="weather-temp">24c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percentage">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

import { useState } from "react";

import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rain from "./assets/rain.png";
import searchicon from "./assets/searchicon.png";
import snow from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import "./App.css";









const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Weather" />
      </div>

      <div className="temp">
        {temp}°C
      </div>

      <div className="location">
        {city}
      </div>

      <div className="country">
        {country}
      </div>

      <div className="cord">

        <div className="coordinate">
          <span className="label">Latitude</span>
          <span className="value">{lat}</span>
        </div>

        <div className="coordinate">
          <span className="label">Longitude</span>
          <span className="value">{log}</span>
        </div>

      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity"
          className="icon" />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div> 
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind"
          className="icon" />
         <div className="data"></div>
          <div className="wind-percentage">{wind} km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </>
  );
};


function App() {
  let api_key = "YOUR_API_KEY"
  const [text, setText] = useState("coimbatore")
  const [icon, setIcon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [city, setcity] = useState("city");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [Loading, setLoading] = useState(false);
  
  const search =async() => {
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`
    try {
      let res = await fetch(url)
      let data = await res.json()
      if (data.cod === "404") {
      console.error("citynotfound")
      setCityNotFound(true)
      setLoading(false)
      return
      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setcity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)

      const weather = data.weather[0].main;

if (weather === "Clear") {
  setIcon(clear);
} else if (weather === "Clouds") {
  setIcon(cloud);
} else if (weather === "Rain") {
  setIcon(rain);
} else if (weather === "Drizzle") {
  setIcon(drizzle);
} else if (weather === "Snow") {
  setIcon(snow);
} else {
  setIcon(cloud);
}

    } catch {console.error();
    } finally {
      setLoading(false)
    }
  }


  const handleCity = (e) => {
    setText(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter"); {
      search()
    }
  }


  return (
    <div className="container">

      {/* Search bar */}

      <div className="input-container">

        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />

        <div className="search-icon"
        onClick={() => search()}>
          <img src={searchicon} alt="Searchicon" />
        </div>


      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind}
      />

    </div>
  );
}


export default App;
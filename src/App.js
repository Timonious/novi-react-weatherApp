import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";
import { TempContext } from "./context/TempContextProvider";
import './App.css';

export const apiKey = process.env.REACT_APP_API_KEY;
function App() {

  const [weatherData, setWeatherData] = useState(null),
      [location, setLocation] = useState(''),
      [error, setError] = useState(false),
      [loading, setLoading] = useState(false),
      { kelvinToUnit } = useContext(TempContext);

  useEffect(()=>{
    const fetchData = async () => {
      setError(false)
      setLoading(true)
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      console.log(data);
      setWeatherData(data);
    } catch (e) {
      setError(true)
      console.error(e);
    }
    setLoading(false)
    };
  if (location) {
    fetchData();
  }
  }, [location]);
  return (
    <>
      <div className="weather-container">
        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation}/>
          {error && <span className="wrong-location-error">Voer een bestaande locatie in!</span>}
          <span className="location-details">
            {loading && <span>Loading, Please wait</span>}
            {weatherData &&
            <>
              <h2>{weatherData.weather[0].description}</h2>
              <h3>{weatherData.name}</h3>
              <h1>{kelvinToUnit(weatherData.main.temp)}</h1>
            </>}
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <Router>
            <TabBarMenu/>
            <div className="tab-wrapper">
              <Switch>
                <Route exact path='/'>
                <TodayTab coordinates={weatherData && weatherData.coord}/>
              </Route>
                <Route path='/komende-week'>
                  <ForecastTab coordinates={weatherData && weatherData.coord}/>
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
        <MetricSlider/>
      </div>
    </>
  );
}

export default App;

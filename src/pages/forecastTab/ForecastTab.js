import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import './ForecastTab.css';
import { apiKey } from "../../App";
import createDateString from "../../helpers/createDateString";
import { TempContext } from "../../context/TempContextProvider";

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState(null),
        [error, setError] = useState(false),
        [loading, setLoading] = useState(false),
    { kelvinToUnit } = useContext(TempContext)
    useEffect(() => {
        setError(false)
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`)
                setForecasts(response.data.daily.slice(1, 8));
                console.log(response.data);
            } catch (e) {
                setError(true)
                console.error(e);
            }
            setLoading(false)
        }
        if (coordinates) {
            fetchData();
        }
    }, [coordinates]);
    return (<div className="tab-wrapper">
        {loading && <span>data wordt opgehaald, even geduld alstublieft</span>}
        {error && <span>Oops, er ging iets mis met het ophalen van de data</span>}
        {!forecasts && !error && <span>Zoek eerst een locatie, anders geen weer weer!</span>}
            {forecasts && forecasts.map((forecast) => {
                return (
                    <article key={forecast.dt} className="forecast-day">
                        <p className="day-description">
                            {createDateString(forecast.dt)}
                        </p>

                        <section className="forecast-weather">
            <span>
              {kelvinToUnit(forecast.temp.day)}
            </span>
                            <span className="weather-description">
                                {forecast.weather[0].description}
            </span>
                        </section>
                    </article>
                )})}</div>);}

export default ForecastTab;
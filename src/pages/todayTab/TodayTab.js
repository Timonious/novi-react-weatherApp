import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import {apiKey} from "../../App";
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

function TodayTab({coordinates}) {
    const [forecasts, setForecasts] = useState(null),
        [error, setError] = useState(false),
        [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,daily&appid=${apiKey}&lang=nl`)
            setForecasts([
                response.data.hourly[3],
                response.data.hourly[5],
                response.data.hourly[7],
            ]);
            console.log(response.data);
        } catch (e) {
            setError(true)
            console.error(e);
        }
        setLoading(false)
    }
    useEffect(() => {
        if (coordinates) {
            fetchData()
        }
    }, [coordinates]);
    return (
        <div className="tab-wrapper">
            {forecasts && <>
                <div className="chart">
                {forecasts.map((forecast) =>  <WeatherDetail
                    key={forecast.dt}
                    temp={forecast.temp}
                    type={forecast.weather[0].main}
                    description={forecast.weather[0].description}
                />
                    )}
                </div>
                <div className="legend">
                    {forecasts.map((forecast) =>
                       <span key={forecast.dt}>{createTimeString(forecast.dt)}</span>
                    )}
                </div></>
            }
            {loading && <span>data wordt opgehaald, even geduld alstublieft</span>}
            {error && <span>Oops, er ging iets mis met het ophalen van de data</span>}
        </div>
    );
}

export default TodayTab;

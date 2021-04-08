import React, { useContext } from 'react';
import { TempContext } from "../../context/TempContextProvider";
import './WeatherDetail.css';
import weatherCheck from "../../helpers/iconMapper";

function WeatherDetail({ type, description, temp}) {
    const { kelvinToUnit } = useContext(TempContext)
  return (
    <section className="day-part">
      <span className="icon-wrapper">
          {weatherCheck(type)}
      </span>
      <p className="description">{description}</p>
      <p>{kelvinToUnit(temp)}</p>
    </section>
  );
};

export default WeatherDetail;

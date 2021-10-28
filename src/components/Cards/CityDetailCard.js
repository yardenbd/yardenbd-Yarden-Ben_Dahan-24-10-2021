import React from "react";
import style from "./CityDetailCard.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CityDetailCard(props) {
  const themeSlice =  useSelector(state => state.theme)
  const info = props.cityInfo;
  const styles={color:themeSlice==='dark'?null:'rgb(7, 81, 112)'}
  return (
    <div className={style.card}>
    <div className="forecast-container" style={{backgroundColor:themeSlice==='dark'?null:'rgb(213, 242, 255)'}}>
      <div className="card-header" style={styles}>{info.time}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p style={styles}>{info.name}</p>
          <p style={styles}>  {info.weatherText} </p>
          <p style={styles}>  {info.currentTemperature.Metric.Value} C</p>
        </blockquote>
        <div className={style.btns}>
        <Link className='btn btn-primary' to='/' >Home</Link>
        <Link className='btn btn-primary' to='/favorites' >Favorites</Link>
        </div>
      </div>
      </div>
    </div>
  );
}

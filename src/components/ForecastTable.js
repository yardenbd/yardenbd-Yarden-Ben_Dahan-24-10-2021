import React from "react";
import ForcastCard from "./Cards/ForcastCard";
import { useSelector } from "react-redux";
import TodayForecastCard from "./Cards/TodayForecastCard";
export default function ForecastTable(props) {
  const isLoading = props.isLoading
  const isDefault = props.renderDefault;
  const defaultForecast = useSelector((state) => state.forecast.todayForecast);
  const themeSlice =  useSelector(state => state.theme)
  const nextDaysForecast = useSelector(
    (state) => state.forecast.nextDaysForecast
  );
  console.log(nextDaysForecast)
  const searchedCity = useSelector((state) => state.cityForecast.forecast);
  const searchedCityForecast = useSelector(
    (state) => state.cityForecast.nextDaysForecast
  );
  const cityToMap = () => {
    if (isDefault) {
      return nextDaysForecast;
    } else {
      return searchedCityForecast;
    }
  };
  const renderData = (
    <>
      <TodayForecastCard 
        forcastInfo={isDefault ? defaultForecast : searchedCity}
      />

      {cityToMap().map((day) => (
        <ForcastCard key={day.Date} temp={day.Temperature} date={day.Date} />
      ))}
    </>
  );
  return (
    <>
    {isLoading && <h1>Loading...</h1>}
      <div className="container" style={{marginTop:'-150px'}} >
        <div className="forecast-container" style={{backgroundColor:themeSlice==='dark'?null:'rgb(213, 242, 255)'}}>
          
          {isDefault && renderData}
          {!isDefault && renderData}
        </div>
      </div>
      </>
  );
}

import React, { useCallback, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { useState } from "react";
import { serverURL } from "../url";
import { apiKey } from "../url";
import { forecastURL } from "../url";
import { useDispatch } from "react-redux";
import { getNextDaysForecast } from "../url";
import { forecastActions } from "../store/Forecast-slice";
import {uiActions} from '../store/ui-slice'
import { metricActions } from "../store/metricSlice";
import useForecast from "../hooks/useForecast";
import { useSelector } from "react-redux";
export default function Input(props) {
  const themeSlice =  useSelector(state => state.theme)
  const isMetric =  useSelector(state => state.metric)
  const { cityForecast, cityForecastHandler, cityInfo, cityInfoHandler } =
    useForecast();
   const regex = "[A-Za-z]"
 
  const unitHandler = () => {
   dispatch(metricActions.toggleMetric())
  };
  const dispatch = useDispatch();
  const { sendRequest, isLoading, error } = useHttp();
  const [city, setCity] = useState("");
  ////////////////////////
  const getCityHandler = (event) => {
    setCity(event.target.value);
  };
///////////////////////////////
  const currentForecastData = useCallback((response) => {
    const temp = response[0].Temperature
    const text = response[0].WeatherText;
    const time = response[0].LocalObservationDateTime;
    const newTime = time.split("T")[0];
   
    cityForecastHandler({ temp, text, newTime });
    
  }, []);
  /////////////////////////////////
  const nextDaysForecast = useCallback((response) => {

    const forecastArray = response.DailyForecasts;
    console.log(forecastArray)
    dispatch(forecastActions.getNextDaysForecast({ forecast: forecastArray }));
  }, []);
  ///////////////////////////
  const cityData = (response) => {
   if( response.length===0){
       dispatch(
        uiActions.showNotification({
          status: "failed",
          title: "Something went wrong",
          message: "No city founded",
        })
      );
    }
    const cityKey = response[0].Key;
    cityInfoHandler({ key:cityKey, name: response[0].LocalizedName });
    sendRequest(
      { url: `${forecastURL}${cityKey}?apikey=${apiKey}` },
      currentForecastData
    );
    sendRequest(
      {
        url: `${getNextDaysForecast}${cityKey}?apikey=${apiKey}&metric=true`,
      },
      nextDaysForecast
    );
    
  };
  /////////////////////////////////////////////
  const getCityForecast = (event) => {
    event.preventDefault();
    if(!city.match(regex))
    {
      dispatch(
        uiActions.showNotification({
          status: "failed",
          title: "Something went wrong",
          message: "English letters only",
        })
      );
      return
    }
    sendRequest({ url: `${serverURL}?apikey=${apiKey}&q=${city}` }, cityData);
    props.toggleDefault();
  };
  ///////////////////////////////////
  useEffect(() => {
    dispatch(
      forecastActions.getForecastForCity({
        temperature: cityForecast.temperature,
        weatherText: cityForecast.weatherText,
        time: cityForecast.time,
        key: cityInfo.key,
        name: cityInfo.name,
      })
    );
  }, [cityForecast]);
 
 
  return (
    <form className="find-location" onSubmit={getCityForecast}>
      <input
        type="text"
        placeholder="Search"
        onChange={getCityHandler}
        style={{backgroundColor: themeSlice==='dark'?null:'rgb(201, 236, 252)'}}
      />

      <input type="submit" value="Find" />
      <button type="button" onClick={unitHandler}>
        {!isMetric ? "Imperial" : "Metric"}
      </button>
    </form>
  );
}

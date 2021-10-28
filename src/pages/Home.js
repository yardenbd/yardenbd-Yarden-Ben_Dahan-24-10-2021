import React from "react";
import ForecastTable from "../components/ForecastTable";
import Input from "../components/Input";
import city from "../pages/images/city2.jpg";
import { useState } from "react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { defaultForecastActions } from "../store/defaultForecast";
import useHttp from "../hooks/use-http";
import { apiKey, defaultNextDaysURL } from "../url";
import { currentForecastURL } from "../url";
import useForecast from "../hooks/useForecast";
import { geolocationURL } from "../url";
import { uiActions } from "../store/ui-slice";

import { useSelector } from "react-redux";
export default function Home() {
  const [isDefault, setIsDefault] = useState(true);
  const changeDefaultHandler = () => {
    setIsDefault(false);
  };
  const { cityForecast, cityForecastHandler, cityInfo, cityInfoHandler } =
  useForecast();
const dispatch = useDispatch();
const { sendRequest,isLoading } = useHttp();
const notification = useSelector((state) => state.ui.notification);
/////////////////////////////////
const getDefaultNextDays = (response) => {
  const forecastArray = response.DailyForecasts;
  dispatch(
    defaultForecastActions.getNextDaysForecast({ forecast: forecastArray })
  );
};
////////////////////////////////
const currentForecastHandler = (response) => {
  const temp = response[0].Temperature;
  const text = response[0].WeatherText;
  const time = response[0].LocalObservationDateTime;
  const newTime = time.split("T")[0];
  cityForecastHandler({ temp, text, newTime });
};
/////////////////////////////////////
const applyDataFromGeo = (response) => {
  cityInfoHandler({
    key: response.Key,
    name: response.LocalizedName,
  });
  sendRequest(
    { url: `${currentForecastURL}${response.Key}?apikey=${apiKey}` },
    currentForecastHandler
  );
  sendRequest(
    {
      url: `${defaultNextDaysURL}${response.Key}?apikey=${apiKey}&metric=true`,
    },
    getDefaultNextDays
  );
};
//////////////////////////////////
const successHandler = (pos) => {
  const crd = pos.coords;
  sendRequest(
    {
      url: `${geolocationURL}?apikey=${apiKey}&q=${crd.latitude}%2C${crd.longitude}`,
    },
    applyDataFromGeo
  );
};
///////////////////////////////
const errorHandler = useCallback((err) => {
  dispatch(
    uiActions.showNotification({
      status: "failed",
      title: "Something went wrong",
      message: "Error try again",
    })
  );
}, []);
////////////////////////


useEffect(() => {
 
  navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
}, []);
////////////////////////////
useEffect(() => {
  dispatch(
    defaultForecastActions.getForecastForToday({
      temperature: cityForecast.temperature,
      weatherText: cityForecast.weatherText,
      time: cityForecast.time,
      key: cityInfo.key,
      name: cityInfo.name,
    })
  );
}, [cityInfo && cityForecast]);
//////////////////////////////////

  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${city})` }}>
        <div className="container" >
          <Input toggleDefault={changeDefaultHandler} />
        </div>
      </div>

      <ForecastTable renderDefault={isDefault} isLoading={isLoading} />
    </>
  );
}

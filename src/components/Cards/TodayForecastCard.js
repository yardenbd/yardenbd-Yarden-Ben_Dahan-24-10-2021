import React from "react";
import Button from "../Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLoaclStorage } from "../../services/localStorage";
import { saveToLocalStorage } from "../../services/localStorage";
export default function TodayForecastCard(props) {
  const unit = useSelector((state) => state.metric);
  const info = props.forcastInfo;
  const time = info.time;
  const themeSlice = useSelector((state) => state.theme);
  const addToFav = () => {
    const favorites = getLoaclStorage();
    const exist = favorites.find((city) => city.name === info.name);
    if (exist) {
      alert("Already in favorites");
      return;
    } else {
      favorites.push(info);
      saveToLocalStorage(favorites);
    }
  };
  const styles = { color: themeSlice === "dark" ? null : "rgb(7, 81, 112)" };
  return (
    <div className="today forecast">
      <div className="forecast-header">
        <div className="date" style={styles}>
          {info.time}
        </div>
      </div>
      <div className="forecast-content">
        <div className="location" style={styles}>
          {info.name}
        </div>
        <div className="degree">
          <div className="num" style={styles}>
             
            {!unit ? info.currentTemperature.Metric.Value : info.currentTemperature.Imperial.Value}
            <sup>o</sup>
            {!unit ? info.currentTemperature.Metric.Unit : info.currentTemperature.Imperial.Unit}
          </div>
          <div className="forecast-icon">
            <img src="images/icons/icon-1.svg" alt="" width={90} />
          </div>
        </div>
        <Button onClick={addToFav} />
      </div>
    </div>
  );
}

import React from "react";
import classes from "./Favorites.module.css";

import { useParams } from "react-router";
import { getLoaclStorage } from "../services/localStorage";
import CityDetailCard from "../components/Cards/CityDetailCard";
export default function CityDetail() {
  const params = useParams();
  const favorites = getLoaclStorage()
  const cityDetail = favorites.find((city) => city.cityKey === params.cityKey);

  return <div className={classes.container}>
    <div className={classes.info}>
           <CityDetailCard cityInfo={cityDetail}/>
           </div>
  </div>;
}

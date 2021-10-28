import React, { useCallback } from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./FavoritesTable.module.css";
import FavCard from "./Cards/FavCard";
import { getLoaclStorage } from '../services/localStorage';
import { saveToLocalStorage } from "../services/localStorage";
export default function FavoritesTable() {
  
  const [favorites,setFavorites]=useState([])
  const favoriteCities = getLoaclStorage()
  const removeFromFav = useCallback((favCity)=>{
    const exist = favorites.find(city=>city.cityKey===favCity.cityKey)
    if(exist){
      setFavorites(favorites.filter(city=>city.cityKey!==favCity.cityKey))
     
    }
  },[favorites])
 useEffect(()=>{
  setFavorites(favoriteCities)
 },[])
 useEffect(()=>{
  saveToLocalStorage(favorites)
 },[favorites])
  return (
    <>
    <div className={classes.layout}>
      {favorites.length===0&&<h1>No favorite cities</h1>}
      {favorites.map((city) => (
        <FavCard key={city.cityKey} cityInfo={city} onRemove={removeFromFav} />
      ))}
      </div>
    </>
  );
}

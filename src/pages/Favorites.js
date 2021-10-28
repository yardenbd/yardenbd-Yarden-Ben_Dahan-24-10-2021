import React from "react";
import FavoritesTable from "../components/FavoritesTable";
import classes from "./Favorites.module.css";
export default function Favorites() {
  return (
    <>
    <div className={classes.container}>
  <FavoritesTable />
  </div>
   </>
  );
}

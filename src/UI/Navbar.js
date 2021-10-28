import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { themeActions } from "../store/themeSlice";
export default function Navbar() {
  //    background: #1e202b;
//backgroundColor:'rgb(168, 202, 216)'
//style={{color:'rgb(7, 81, 112)'}}
const dispatch = useDispatch()
const themeToggler = ()=>{
 dispatch(themeActions.toggleTheme())
}
const themeSlice =  useSelector(state => state.theme)
  return (
    <>
      <div style={{backgroundColor: themeSlice ==='dark' ? null:'rgb(201, 236, 252)'}}>
      <div className="site-header" >
      
        <div className="container" >
          <a className="branding" >
            <img src="images/logo.png" alt="" className="logo" />
            <div className="logo-type">
              <h1 className="site-title" style={{color:themeSlice ==='dark'?null:'rgb(7, 81, 112)'}}>Yarden's Wheather app</h1>
            </div>
          </a>

          <div className="main-navigation">
            <button type="button" className="menu-toggle">
              <i className="fa fa-bars"></i>
            </button>
            <ul className="menu">
              <li className="menu-item current-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="menu-item current-menu-item">
                <Link to="/favorites">Favorites</Link>
              </li>
              <li className="menu-item current-menu-item">
                <a  onClick={themeToggler}>Toggle Theme </a>
              </li>
            </ul>
          </div>

          <div className="mobile-navigation"></div>
        </div>
      </div>
      </div>
    </>
  );
}

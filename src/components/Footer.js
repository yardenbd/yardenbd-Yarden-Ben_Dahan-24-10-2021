import React from 'react'
import { useSelector } from "react-redux";

export default function Footer() {
    const themeSlice =  useSelector(state => state.theme)
    const lineStyles={color:themeSlice==='dark'?null:'rgb(7, 81, 112)'}
    return (
        <footer className="site-footer" style={{backgroundColor: themeSlice ==='dark' ? null:'rgb(150, 236, 252)'}}>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <form action="#" className="subscribe-form">
                        <input type="text" placeholder="Enter your email to subscribe..."/>
                        <input type="submit" value="Subscribe"/>
                    </form>
                </div>
                <div className="col-md-3 col-md-offset-1">
                    <div className="social-links">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-google-plus"></i></a>
                        <a href="#"><i className="fa fa-pinterest"></i></a>
                    </div>
                </div>
            </div>

            <p className="colophon" style={lineStyles}>Copyright 2014 Company name. Designed by Themezy. All rights reserved</p>
        </div>
    </footer> 
    )
}

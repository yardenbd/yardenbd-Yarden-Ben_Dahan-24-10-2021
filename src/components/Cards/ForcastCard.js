import React from 'react'
import iconSVG from '../../pages/images/icon-5.svg'
import { useSelector } from "react-redux";
export default function ForcastCard(props) {
  
    const minTemp = props.temp.Minimum.Value
    const maxTemp = props.temp.Maximum.Value
    console.log(props)
    let date = props.date.split('T')[0]
    const themeSlice =  useSelector(state => state.theme)
    return (
        
        <div className="forecast" style={{width:'12rem',backgroundColor:themeSlice==='dark'?null:'rgb(159, 222, 252)'}}>
        <div className="forecast-header">
            <div className="day"  style={{color:themeSlice==='dark'?null:'rgb(7, 81, 112)'}}>{date}</div>
        </div>
        <div className="forecast-content">
            <div className="forecast-icon">
                <img src={iconSVG} alt="" width={48} />
            </div>
            <div className="degree"  style={{color:themeSlice==='dark'?null:'rgb(7, 81, 112)'}}>Max:{maxTemp}<sup>o</sup>C</div>
            <small  style={{color:themeSlice==='dark'?null:'rgb(7, 81, 112)'}}>Min:{minTemp}<sup>o</sup></small>
          
        </div>
    </div>
    )
}

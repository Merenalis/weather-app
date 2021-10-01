import React from 'react';
import '../styles/interface.css'
import {shallowEqual, useSelector} from "react-redux";

function Interface(props) {

    const main = props.info.main !== undefined ? props.info.main : ''

    const data = useSelector(state => state, shallowEqual)
    const units = data.repos.units ? 0 : 32
    return (
        <div className='forecast-wrap'>
            <div className='wrapper'>
                <div className="name">
                    {props.info.name}, {props.info.sys.country}
                </div>
                <div className="temp">
                    Current temperature: {(main.temp+units).toFixed(2)} &deg;C <br/>
                    Feels like: {(main.feels_like+units).toFixed(2)} &deg;C <br/>
                </div>
                <div className="max-min">
                    Max: {(main.temp_max+units).toFixed(2)} &deg;C,
                    Min: {(main.temp_min+units).toFixed(2)} &deg;C <br/>
                </div>
                <div className="desc">
                    {props.info.weather !== undefined ? props.info.weather[0].description : ''}
                    <img src={`https://openweathermap.org/img/wn/${props.info.weather !== undefined ? props.info.weather[0].icon : ''}@2x.png`} alt="weather"/>
                </div>
            </div>



        </div>
    );
}

export default Interface;
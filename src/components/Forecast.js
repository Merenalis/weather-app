import React from 'react';
import '../styles/forecast.css'
import {shallowEqual, useSelector} from "react-redux";

function Forecast(props) {
    const data = useSelector(state => state, shallowEqual)
    const units = data.repos.units ? 0 : 32
    let countArr = Array(5).fill(null)

    const listItems = countArr.map((count, index) =>
        <div key={index} className='forecast'>
            <div className="date">
                {props.info.list[index].dt_txt}
            </div>
            <div className="temp">
                Temperature: {(props.info.list[index].main.temp + units).toFixed(2)} &deg;C <br/>
                Feels like: {(props.info.list[index].main.feels_like + units).toFixed(2)} &deg;C <br/>

            </div>
            <div className="max-min">
                Max: {(props.info.list[index].main.temp_max + units).toFixed(2)} &deg;C, <br/>
                Min: {(props.info.list[index].main.temp_min + units).toFixed(2)} &deg;C <br/>
            </div>
            <div className="desc">
                {props.info.list[index].weather !== undefined ? props.info.list[index].weather[0].description : ''}
                <img
                    src={`https://openweathermap.org/img/wn/${props.info.list[index].weather[0] !== undefined ? props.info.list[index].weather[0].icon : ''}@2x.png`}
                    alt="weather"/>
            </div>
        </div>
    )
    return (
        <div className='forecast-wrap'>
            {listItems}
        </div>
    );
}

export default Forecast;
import React from 'react';
import '../styles/forecast.css'
import {shallowEqual, useSelector} from 'react-redux';

function Forecast() {
    const {units, forecast = []} = useSelector(state => state.repos, shallowEqual)
    const unitsNumber = units ? 0 : 32
    const unitsSymbol = units ? 'C' : 'F'
    const countArr = Array(5).fill(null)

    const listItems = countArr.map((count, index) =>
        <div key={index} className='forecast'>
            <div className='date'>
                {forecast.list[index].dt_txt}
            </div>
            <div className='temp'>
                Temperature: {(forecast.list[index].main.temp + unitsNumber).toFixed(2)} &deg; {unitsSymbol} <br/>
                Feels like: {(forecast.list[index].main.feels_like + unitsNumber).toFixed(2)} &deg;{unitsSymbol} <br/>
            </div>
            <div className='max-min'>
                Max: {(forecast.list[index].main.temp_max + unitsNumber).toFixed(2)} &deg;{unitsSymbol}, <br/>
                Min: {(forecast.list[index].main.temp_min + unitsNumber).toFixed(2)} &deg;{unitsSymbol} <br/>
            </div>
            <div className='desc'>
                {forecast.list[index].weather !== undefined ? forecast.list[index].weather[0].description : ''}
                <img
                    src={`https://openweathermap.org/img/wn/${forecast.list[index].weather[0] !== undefined ? forecast.list[index].weather[0].icon : ''}@2x.png`}
                    alt='weather'/>
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
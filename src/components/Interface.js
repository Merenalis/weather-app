import React from 'react';
import '../styles/interface.css'
import {shallowEqual, useSelector} from 'react-redux';

function Interface() {
    const {units,weather=[]} = useSelector(state => state.repos,shallowEqual)
    const main = weather.main !== undefined ? weather.main : ''
    const unitsNumber = units ? 0 : 32
    const unitsSymbol = units ? 'C' : 'F'

    return (
        <div className='forecast-wrap'>
            <div className='wrapper'>
                <div className='name'>
                    {weather.name}, {weather.sys.country}
                </div>
                <div className='temp'>
                    Current temperature: {(main.temp+unitsNumber).toFixed(2)} &deg;{unitsSymbol} <br/>
                    Feels like: {(main.feels_like+unitsNumber).toFixed(2)} &deg;{unitsSymbol} <br/>
                </div>
                <div className='max-min'>
                    Max: {(main.temp_max+unitsNumber).toFixed(2)} &deg;{unitsSymbol},
                    Min: {(main.temp_min+unitsNumber).toFixed(2)} &deg;{unitsSymbol} <br/>
                </div>
                <div className='desc'>
                    {weather.weather[0].description}
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather'/>
                </div>
            </div>
        </div>
    );
}

export default Interface;
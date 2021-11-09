import React from 'react';
import '../styles/interface.css'
import {shallowEqual, useSelector} from 'react-redux';

function Interface() {
    const {units,weather=[]} = useSelector(state => state.repos,shallowEqual)
    const main = weather.main !== undefined ? weather.main : ''
    const unitsSymbol = units ? 'C' : 'F'
    function convertToF(temperature){
        return temperature*(9/5)+32;
    }
    return (
        <div className='forecast-wrap'>
            <div className='wrapper'>
                <div className='name'>
                    {weather.name}, {weather.sys.country}
                </div>
                <div className='temp'>
                    Current temperature: {(units ? main.temp : convertToF(main.temp)).toFixed(2)} &deg;{unitsSymbol} <br/>
                    Feels like: {(units ? main.feels_like : convertToF(main.feels_like)).toFixed(2)} &deg;{unitsSymbol} <br/>
                </div>
                <div className='max-min'>
                    Max: {(units ? main.temp_max : convertToF(main.temp_max)).toFixed(2)} &deg;{unitsSymbol},
                    Min: {(units ? main.temp_min : convertToF(main.temp_min)).toFixed(2)} &deg;{unitsSymbol} <br/>
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
import React from 'react';
import '../styles/forecast.css'
import {shallowEqual, useSelector} from 'react-redux';

function Forecast() {
    const {units, forecast = []} = useSelector(state => state.repos, shallowEqual)
    const unitsSymbol = units ? 'C' : 'F'
    const countArr = Array(5).fill(null)
    function convertToF(temperature){
        return temperature*(9/5)+32;
    }
    const listItems = countArr.map((count, index) =>
        <div key={index} className='forecast'>
            <div className='date'>
                {forecast.list[index].dt_txt}
            </div>
            <div className='temp'>
                Temperature: {(units ? forecast.list[index].main.temp : convertToF(forecast.list[index].main.temp)).toFixed(2)} &deg; {unitsSymbol} <br/>
                Feels like: {(units ? forecast.list[index].main.feels_like : convertToF(forecast.list[index].main.feels_like)).toFixed(2)} &deg; {unitsSymbol} <br/>
             </div>
            <div className='max-min'>
                Max: {(units ? forecast.list[index].main.temp_max : convertToF(forecast.list[index].main.temp_max)).toFixed(2)} &deg;{unitsSymbol}, <br/>
                Min: {(units ? forecast.list[index].main.temp_min : convertToF(forecast.list[index].main.temp_min)).toFixed(2)} &deg;{unitsSymbol}, <br/>
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
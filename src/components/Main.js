import React from 'react'
import '../styles/index.css';
import '../styles/switch.css';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getCurrentResult} from "../store/actions/getCurrentResult";
import Interface from "./Interface";
import {actionFavorites, actionUnits} from "../store/actions/action";
import {Button, Input} from "@material-ui/core";
import Forecast from "./Forecast";

function Main() {
    const dispatch = useDispatch()
    const data = useSelector(state => state, shallowEqual)
    const units = data.repos.units

    function switchUnits() {
        dispatch(actionUnits())
    }

    function getCity() {
        const city = document.getElementById('input').value
        dispatch(getCurrentResult(city, units))
    }

    function setCity(city) {
        document.getElementById('input').value = data.repos.weather.name
        dispatch(getCurrentResult(city, units))

    }

    function addFav() {
        const city = document.getElementById('input').value
        dispatch(actionFavorites(city))

    }

    const set = Array.from(new Set(data.repos.favorites))
    const favoritesS = set.map((city, index) => {
        return (
            <Button key={index} onClick={() => setCity(city)}>{city}</Button>
        );
    });
    return (
        <div>
            <h1>Weatherizer</h1>
            <div>
                <Button onClick={addFav}>Add</Button>
                <Input type="text" id='input'/>
                <Button onClick={getCity}>Check</Button>
            </div>

            <div className="switch-main">
                <div className="switch-main__switch-text">
                    <span> Celsius </span>
                </div>
                <label className="switch-main__switch">
                    <input type="checkbox" onChange={switchUnits}/>
                    <span className="switch-main__slider round"/>
                </label>
                <div className="switch-main__switch-text">
                    <span> Fahrenheit </span>
                </div>
            </div>
            <div className="favorites">
                {favoritesS}
            </div>

            {
                data.repos.error === true ? 'City not found. Please enter the correct city name' : data.repos.weather.length === 0
                    ? 'Enter the name of the city and click the button Check' : <Interface info={data.repos.weather}/>


            }
            {
                data.repos.error === true ? '' : data.repos.forecast.length === 0
                    ? '' : <Forecast info={data.repos.forecast}/>


            }
        </div>
    );
}

export default Main;
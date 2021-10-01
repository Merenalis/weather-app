import React from 'react'
import '../styles/index.css';
import '../styles/switch.css';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getResult} from "../functions/getResult";
import Interface from "./Interface";
import {actionUnits} from "../store/actions/action";
import {Button, Input} from "@material-ui/core";

function Main() {
    const dispatch = useDispatch()
    const data = useSelector(state => state, shallowEqual)
    const units = data.repos.units

    function switchUnits() {
        dispatch(actionUnits())
    }

    function getCity() {
        const city = document.getElementById('input').value
        dispatch(getResult(city, units))
    }

    function setCity(city) {
        document.getElementById('input').value = city

        dispatch(getResult(city, units))

    }

    return (
        <div>
            <h1>Weatherizer</h1>
            <div>
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
                <Button className='fav-btn' onClick={() => setCity('Kyiv')}>Kyiv</Button>
                <Button className='fav-btn' onClick={() => setCity('Zaporizhzhya')}>Zaporizhzhya</Button>
                <Button className='fav-btn' onClick={() => setCity('New York')}>New York</Button>
                <Button className='fav-btn' onClick={() => setCity('Lviv')}>Lviv</Button>
            </div>
            {
                data.repos.info.length === 0 ? 'Enter the name of city and press on the button Check' :
                    <Interface info={data.repos.info}/>
            }
        </div>
    );
}

export default Main;
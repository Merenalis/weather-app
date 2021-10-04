import React, {useEffect} from 'react'
import '../styles/switch.css';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getCurrentResult} from "../store/actions/getCurrentResult";
import Interface from "./Interface";
import { actionFavorites, actionGetCity, actionUnits} from "../store/actions/action";
import {Button, Input} from "@material-ui/core";
import Forecast from "./Forecast";
import {getValid} from "../store/actions/getValid";
import {getAllStorage} from "../functions/getAllStorage";
import DenseAppBar from "./DenseAppBar";
import '../styles/index.css';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";


function Main() {
    const dispatch = useDispatch()
    const data = useSelector(state => state, shallowEqual)
    const units = data.repos.units

    function switchUnits() {
        dispatch(actionUnits())
    }

    function getCity() {
        const city = data.repos.city
        dispatch(getCurrentResult(city, units))
    }

    function handleChange(event) {
        const city = event.target.value
        dispatch(actionGetCity(city))
    }

    function setCity(city) {
        dispatch(actionGetCity(city))
        dispatch(getCurrentResult(city, units))
    }

    function addFav() {
        const city = data.repos.city
        dispatch(getValid(city))
    }


    function delFav(city) {
        localStorage.removeItem(city)
        dispatch(actionFavorites(getAllStorage()))
    }

    useEffect(()=>{dispatch(actionFavorites(getAllStorage()))},[])
    const favoritesS = data.repos.favorites.map((value, index) => {
        return (
            <div key={index} style={{display:'flex',justifyContent:'space-between'}}>
                <Button style={{justifyContent:'left'}} onClick={() => setCity(value)}>{value}</Button>
                <Button onClick={() => delFav(value)}>X</Button>
            </div>
        );
    });


    return (
        <Box sx={{ display: 'flex' }} >
        <DenseAppBar fav={favoritesS}/>
            <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
                <h1> </h1>
                <form>
                    <Button onClick={addFav}>Add</Button>
                    <label>
                        <Input type="text" id='input' value={data.repos.city} onChange={handleChange}/>
                    </label>
                    <Button onClick={getCity}>Check</Button>
                </form>
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
                <div>
                    {
                        data.repos.error === true ? 'City not found. Please enter the correct city name' : data.repos.weather.length === 0
                            ? 'Enter the name of the city and click the button Check' : <Interface info={data.repos.weather}/>


                    }
                    {
                        data.repos.error === true ? '' : data.repos.forecast.length === 0
                            ? '' : <Forecast info={data.repos.forecast}/>


                    }
                </div>
            </Box>


        </Box>
    );
}

export default Main;

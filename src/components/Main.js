import React, {useCallback, useEffect} from 'react'
import '../styles/switch.css';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getCurrentResult} from '../store/actions/getCurrentResult';
import Interface from './Interface';
import {actionFavorites, actionGetCity, actionUnits} from '../store/actions/action';
import {Button, Input} from '@material-ui/core';
import Forecast from './Forecast';
import {getValid} from '../store/actions/getValid';
import {getAllStorage} from '../functions/getAllStorage';
import DenseAppBar from './DenseAppBar';
import '../styles/index.css';
import {useRouteMatch} from 'react-router-dom';


function Main() {
    const dispatch = useDispatch()
    const {
        units,
        city,
        error,
        favorites = [],
        forecast = [],
        weather = []
    } = useSelector(state => state.repos, shallowEqual)

    let match = useRouteMatch()

    const getCity = useCallback(
        () => {
            dispatch(getCurrentResult(city, units))
        },
        [city, units],
    );
    const switchUnits = useCallback(
        () => {
            dispatch(actionUnits())
        },
        [],
    );
    const handleChange = useCallback(
        (event) => {
            const city = event.target.value
            dispatch(actionGetCity(city))
        },
        [city],
    );
    const setCity = useCallback(
        (city) => {
            dispatch(actionGetCity(city))
            dispatch(getCurrentResult(city, units))
        },
        [city, units],
    );
    const addFav = useCallback(
        () => {
            dispatch(getValid(city, favorites))
        },
        [city],
    );
    const delFav = useCallback(
        (index) => {
            favorites.splice(index, 1)
            localStorage.setItem('cities', favorites.toString())
            if (favorites.length === 0)
                localStorage.removeItem('cities')
            dispatch(actionFavorites(getAllStorage()))
        },
        [city],
    );

    useEffect(() => {
        if (match.url !== '/') {
            let url = match.url;
            const city = url.replace(new RegExp('(^/)', 'g'), '')
            setCity(city)
        }
        dispatch(actionFavorites(getAllStorage()))
    }, [])

    const favoritesS = favorites.map((value, index) => {
        return (
            <div key={index} className='favorites-list'>
                <Button className='favorites-btn' onClick={() => setCity(value)}>{value}</Button>
                <Button onClick={() => delFav(index)}>X</Button>
            </div>
        );
    });

    const handleSubmit = useCallback((event) => {
        getCity()
        event.preventDefault()
    }, [])

    return (
        <div className='mainBox'>
            <DenseAppBar fav={favoritesS}/>
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <Button onClick={addFav}>Add</Button>
                    <label>
                        <Input type='text' value={city} onChange={handleChange}/>
                    </label>
                    <Button onClick={getCity}>Check</Button>
                </form>
                <div className='switch-main'>
                    <div className='switch-main__switch-text'>
                        <span> Celsius </span>
                    </div>
                    <label className='switch-main__switch'>
                        <input type='checkbox' onChange={switchUnits}/>
                        <span className='switch-main__slider round'/>
                    </label>
                    <div className='switch-main__switch-text'>
                        <span> Fahrenheit </span>
                    </div>
                </div>
                <div>
                    {
                        error === true ? 'City not found. Please enter the correct city name' : weather.length === 0
                            ? 'Enter the name of the city and click the button Check' :
                            <Interface info={weather}/>
                    }
                    {
                        error === true ? '' : forecast.length === 0
                            ? '' : <Forecast info={forecast}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default Main;

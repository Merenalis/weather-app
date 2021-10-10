import React, {useCallback, useEffect} from 'react'
import '../styles/switch.css';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getCurrentResult} from '../store/actions/getCurrentResult';
import Interface from './Interface';
import {actionFavorites, actionGetCity} from '../store/actions/action';
import {Button} from '@material-ui/core';
import Forecast from './Forecast';
import {getAllStorage} from '../functions/getAllStorage';
import DenseAppBar from './ResponsiveDrawer';
import '../styles/index.css';
import {useHistory, useParams} from 'react-router-dom';
import Form from './Form';
import Switch from './Switch';

function Main() {
    const dispatch = useDispatch()
    const history = useHistory();
    const {cities} = useParams()
    const {
        units,
        city,
        error,
        favorites = [],
        forecast = [],
        weather = [],
    } = useSelector(state => state.repos, shallowEqual)

    const setCity = useCallback(
        (city) => {
            dispatch(actionGetCity(city))
            dispatch(getCurrentResult(city, units))
        },
        [city, units],
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
        if (cities !== undefined)
            setCity(cities)
        dispatch(actionFavorites(getAllStorage()))
    }, [])

    useEffect(() => {
        history.push(`/${weather.name !== undefined ? weather.name.toLowerCase() : ''}`)
    }, [weather])

    const favoritesS = favorites.map((value, index) => {
        return (
            <div key={index} className='favorites-list'>
                <Button className='favorites-btn' onClick={() => setCity(value)}>{value}</Button>
                <Button onClick={() => delFav(index)}>X</Button>
            </div>
        );
    });

    return (
        <div className='mainBox'>
            <DenseAppBar fav={favoritesS}/>
            <div className='main'>
                <Form/>
                <Switch/>
                <div className='main-forecast'>
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

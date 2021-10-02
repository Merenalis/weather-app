import axios from 'axios';
import {actionError, actionInfo} from './action';

export const getCurrentResult = (city) => {
    return async (dispatch) => {
        try {
            const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            dispatch(actionInfo(forecast.data, weather.data))

        } catch (error) {
            dispatch(actionError())
            console.log(error.response.data);
        }
    }
}
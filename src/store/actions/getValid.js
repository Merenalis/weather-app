import axios from 'axios';
import {actionError, actionFavorites} from './action';
import {getAllStorage} from "../../functions/getAllStorage";

export const getValid = (city) => {
    return async (dispatch) => {
        try {
            const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_KEY}`)
            localStorage.setItem(city, city)
            dispatch(actionFavorites(getAllStorage(true)))
        } catch (error) {
            dispatch(actionError())
            console.log(error.response.data);
        }
    }
}
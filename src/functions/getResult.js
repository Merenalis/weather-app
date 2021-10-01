import axios from 'axios';
import {actionInfo} from '../store/actions/action';

export const getResult = (city) => {
    return async (dispatch) => {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=358a2e2d88715706e9508c82b643fc63`)
        dispatch(actionInfo(result.data))
    }
}
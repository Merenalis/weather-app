import {ADD_FAVORITES, ERROR, GET_CITY, SET_RESULT, SET_UNITS} from '../actionTypes/actionType';

export function actionInfo(forecast,weather) {
    return {
        type: SET_RESULT,
        payload:{
            weather: weather,
            forecast: forecast,
        }
    }
}
export function actionUnits() {
    return {
        type: SET_UNITS,
    }
}
export function actionFavorites(city) {
    return {
        type: ADD_FAVORITES,
        payload:{
            city: city,
        }
    }
}
export function actionError() {
    return {
        type: ERROR,

    }
}
export function actionGetCity(city) {
    return {
        type: GET_CITY,
        payload:{
            city:city
        }
    }
}



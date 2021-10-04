import {SET_UNITS, SET_RESULT, ADD_FAVORITES, ERROR, GET_CITY, DEL_FAV} from '../actionTypes/actionType';

const initialState = {
    forecast: [],
    weather: [],
    units: true,
    favorites: [],
    error : false,
    city: '',
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESULT:
            return {
                ...state,
                forecast: action.payload.forecast,
                weather: action.payload.weather,
                error: false

            }

        case SET_UNITS: {
            const units = state.units
            return {
                ...state,
                units: !units
            }
        }
        case ADD_FAVORITES: {
                    const arr = Array.from(action.payload.city)
            return {
                ...state,
                favorites: arr
            }
        }
        case ERROR: {
            return {
                ...state,
                error: true
            }
        }
        case GET_CITY: {
            return {
                ...state,
                city: action.payload.city
            }
        }
        case DEL_FAV: {
            const index = state.favorites.indexOf(action.payload.city)
            state.favorites.splice(index,1)
            return {
                ...state,
                favorites: state.favorites,

            }
        }

        default:
            return state;
    }
}
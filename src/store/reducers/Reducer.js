import {SET_UNITS, SET_RESULT, ADD_FAVORITES, ERROR, GET_CITY} from '../actionTypes/actionType';

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
            state.favorites.push(action.payload.city)
            return {
                ...state,
                favorites: state.favorites
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

        default:
            return state;
    }
}
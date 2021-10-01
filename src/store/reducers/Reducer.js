import {SET_UNITS, SET_RESULT} from '../actionTypes/actionType';

const initialState = {
    info: [],
    units: true
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESULT:
            return {
                ...state,
                info: action.payload.info,
            }

        case SET_UNITS: {
            const units = state.units
            return {
                ...state,
                units: !units
            }
        }

        default:
            return state;
    }
}
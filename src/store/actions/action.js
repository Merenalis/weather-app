import {SET_RESULT,SET_UNITS} from '../actionTypes/actionType';

export function actionInfo(info) {
    return {
        type: SET_RESULT,
        payload:{
            info: info,
        }
    }
}
export function actionUnits() {
    return {
        type: SET_UNITS,
    }
}



import React, {useCallback} from 'react';
import {actionUnits} from "../store/actions/action";
import {useDispatch} from "react-redux";

function Switch() {
    const dispatch = useDispatch()
    const switchUnits = useCallback(
        () => {
            dispatch(actionUnits())
        },
        [],
    );
    return (
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
    );
}

export default Switch;
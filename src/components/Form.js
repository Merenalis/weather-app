import React, {useCallback} from 'react';
import {Button, Input} from "@material-ui/core";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCurrentResult} from "../store/actions/getCurrentResult";
import {actionGetCity} from "../store/actions/action";
import {getValid} from "../store/actions/getValid";

function Form() {
    const {
        city,
        units,
        favorites,
    } = useSelector(state => state.repos, shallowEqual)
    const dispatch = useDispatch()

    const getCity = useCallback(
        () => {
            dispatch(getCurrentResult(city, units))
        },
        [city, units],
    );

    const handleChange = useCallback(
        (event) => {
            const city = event.target.value
            dispatch(actionGetCity(city))
        },
        [city],
    );

    const addFav = useCallback(
        () => {
            dispatch(getValid(city, favorites))
        },
        [city],
    );

    function handleSubmit(event) {
        getCity()
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button onClick={addFav}>Add</Button>
            <label>
                <Input type='text' value={city} onChange={handleChange}/>
            </label>
            <Button onClick={getCity}>Check</Button>
        </form>
    );
}

export default Form;
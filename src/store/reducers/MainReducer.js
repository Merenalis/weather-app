import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import Reducer from './Reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    repos: Reducer,

})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
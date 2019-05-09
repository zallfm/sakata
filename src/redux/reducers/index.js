import { combineReducers } from 'redux';
import biller from './biller';

const RootReducer = combineReducers({
    biller: biller
})

export default RootReducer;
import { ADD_BILLER, DELETE_BILLER, UPDATE_BILLER } from '../types/biller';

export const addBiller = (payload) => {
    return { 
        type: ADD_BILLER, 
        payload : payload,
    }
}

export const removeBiller = (index) => {
    console.log(index)
    return {
        type: DELETE_BILLER,
        payload:index
    }
}

export const updateBiller = (payload) => {
    console.log(payload)
    return {
        type: UPDATE_BILLER,
        payload:payload
    }
}
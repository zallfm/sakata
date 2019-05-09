import { ADD_BILLER, DELETE_BILLER, UPDATE_BILLER } from "../types/biller";

const initialState = {
  dataBiller:[]
}

export default (state = initialState, { type, payload }) => {
  console.log(state, payload)
  switch (type) {

  case ADD_BILLER:
    return {
      ...state,
      dataBiller:[...state.dataBiller, payload]
    }
  case UPDATE_BILLER:
    return state.dataBiller.map((biller,index) => {
      if (index === payload.index) {
        return biller = payload.data
      };
      return biller;
    });
  case DELETE_BILLER:
    return state.dataBiller.filter((biller,index) =>
      index !== payload
    )
  default:
    return state
  }
}

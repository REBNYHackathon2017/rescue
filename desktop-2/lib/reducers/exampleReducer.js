import * as types from 'actions/actionTypes';

export default function exampleReducer(state = {}, action) {
  switch(action.type) {
  case types.LOAD_HAPPENING:
    return {
      ...state,
      happening: action.happening
    };
  case types.LOAD_HAPPENING_SUCCESS:
    return {
      ...state,
      happening: action.result
    };
  case types.LOAD_HAPPENING_FAILURE:
    return {
      ...state,
      happening: action.error
    };
  default:
    return state;
  }
}


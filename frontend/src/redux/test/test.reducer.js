import {testActionTypes} from './test.types';

const INITIAL_STATE = {
  message: null,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case testActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default testReducer;

import {testActionTypes} from './test.types';

export const setMessage= (message) => ({
  type: testActionTypes.SET_MESSAGE,
  payload: message,
});

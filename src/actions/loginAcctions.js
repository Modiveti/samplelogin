import {
    GET_LOGIN_DATA,
    GET_USER_LOGIN_SUCCESS,
    GET_USER_LOGIN_FAILURE
  } from '../constants/loginConstants';
  
  export const getLoginInfo = (payload) => ({
    type: GET_LOGIN_DATA,
    payload,
  });

  export const getUserListSuccess = data => ({
    type: GET_USER_LOGIN_SUCCESS,
    data
  });
  
  export const getUserListFailure = error => ({
    type: GET_USER_LOGIN_FAILURE,
    error
  });

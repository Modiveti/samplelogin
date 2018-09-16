import {
    GET_SEARCH_LIST_SUCCESS,
    GET_SEARCH_LIST_FAILURE,
    GET_PLANETS_DATA
  } from '../constants/searchConstants';

  export const getSearchListSuccess = data => ({
    type: GET_SEARCH_LIST_SUCCESS,
    data
  });
  
  export const getSearchListFailure = error => ({
    type: GET_SEARCH_LIST_FAILURE,
    error
  });

  export const getPlanetList= data => ({
    type: GET_PLANETS_DATA,
    data
  });
  
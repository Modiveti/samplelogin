import { fromJS } from 'immutable';

import {
  GET_USER_LOGIN_SUCCESS
  } from '../constants/loginConstants';

const initialState = fromJS({
  userDetails: {},
});

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LOGIN_SUCCESS:
          return state
            .set('userDetails', action.data);
      default:
        return state;
    }
  }
  
  export default loginReducer;
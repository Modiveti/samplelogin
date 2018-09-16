import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginReducer from '../reducers/loginReducer';

const containersReducer = {
  containers: combineReducers({
    loginReducer,
    // NOTE: put other app reducers here
  }),
};

const createGlobalReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  })
);

export default createGlobalReducer;

import {
  takeLatest,
  call,
  put
} from "redux-saga/effects";

import {
  GET_PLANETS_DATA,
  GET_LOGIN_DATA
} from "../constants/searchConstants";

import {
  getSearchListSuccess,
  getSearchListFailure,
} from "../actions/searchActions";

import {
  getUserListSuccess,
  getUserListFailure,
} from "../actions/loginAcctions";

const serviceUrl = "https://swapi.co/api/";

/*
  Data downloading using pure JS fetch
  @type: JS object
  { result: resultObj, error: errorObj }
*/
const fetchData = (url, options) => {
  const fetchRequest = new Request(url, options);

  return fetch(fetchRequest)
    .then(response => response.json().then(result =>
      ({
        result
      })))
    .catch(error => ({ error }));
};

function* getSearchList() {
  const { result, error } = yield call(
    fetchData,
    `${serviceUrl}planets`,
    { method: "get" }
  );
  if (result) {
    yield put(getSearchListSuccess(result));
  }
  yield put(getSearchListFailure(error));

}


function* getUsersInfo(action) {
  const { result, error } = yield call(
    fetchData,
    `${serviceUrl}people/`,
    { method: "get" }
  );
  let userCredentials = action.payload;
  if (result) {
        userCredentials = userLoginStatus(result.results, userCredentials)
  //   result.results.filter((item) => {
  //     if(item.name === userCredentials.userName && item.birth_year === userCredentials.passWord) {
  //       return true;
  //     } else if(item.name === userCredentials.userName) {
  //       return userCredentials.passWord = "Didn't Match"
  //     } else if(item.birth_year === userCredentials.passWord) {
  //       return userCredentials.userName = "Didn't Match"
  //     }
  //     return false;
  //   });
    console.log(userCredentials)
    yield put(getUserListSuccess(userCredentials));
  }
    yield put(getUserListFailure(error));
}

const userLoginStatus = (usersList, userCredentials) => {
  if (usersList) {
    let usersInfo = usersList.filter((item) => {
      if (item.name === userCredentials.userName || item.birth_year === userCredentials.passWord) {
        return true;
      }
      return false;
    });
    for (let i=0; i<usersInfo.length; i++) {
      let item = usersInfo[i];
      if (item.name === userCredentials.userName) {
        if(item.birth_year !== userCredentials.passWord) {
          userCredentials.passWord = "Didn't Match";
        }
        return userCredentials;
      } else if (item.birth_year === userCredentials.passWord) {
        userCredentials.userName = "Didn't Match"
        return userCredentials;
      }
    }
  }
}

export default function* searchDataSaga() {
    try {
      yield [
        takeLatest(GET_LOGIN_DATA, getUsersInfo),
        takeLatest(GET_PLANETS_DATA, getSearchList),
      ];
    } catch (error) {
      return;
    }
  }
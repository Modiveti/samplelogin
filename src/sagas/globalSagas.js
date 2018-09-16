import { fork, all } from 'redux-saga/effects';

import searchDataSaga from './searchSagas';

const sagas = [
  searchDataSaga
  // NOTE: put other app sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;

import { all, takeEvery, call } from 'redux-saga/effects';

export function* watchSomethingAsync() {
  yield takeEvery('GET_POSTS');
}

export default function* helloSagas() {
  yield all([watchSomethingAsync()]);
}

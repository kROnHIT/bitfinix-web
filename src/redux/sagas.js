import { all } from 'redux-saga/effects';
import orderBookSaga from './order-book/saga';

export default function* rootSaga(getState) {
  yield all([
    orderBookSaga(),
  ]);
}

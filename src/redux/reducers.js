import { combineReducers } from 'redux';
import orderBook from './order-book/reducer';

const reducers = combineReducers({
  orderBook,
});

export default reducers;
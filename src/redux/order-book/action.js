import {
    FETCH_ORDER_BOOK,
    FETCH_ORDER_BOOK_SUCCESS,
    FETCH_ORDER_BOOK_ERROR
} from "../actions";

export const fetchOrderBook = (payload) => ({
    type: FETCH_ORDER_BOOK,
    payload
})

export const fetchOrderBookSuccess = (payload) => ({
    type: FETCH_ORDER_BOOK_SUCCESS,
    payload
})

export const fetchOrderBookError = (message) => ({
    type: FETCH_ORDER_BOOK_ERROR,
    payload: message
  });
import {
    FETCH_ORDER_BOOK,
    FETCH_ORDER_BOOK_SUCCESS,
    FETCH_ORDER_BOOK_ERROR
} from "../actions";

const INIT_STATE = {
    connectionStatus: true,
    orderbook: {
        bids: {}, 
        asks: {}, 
        psnap: {}, 
        mcnt: 0
    },
    ticker: [],
    trades: []

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_ORDER_BOOK:
            return { ...state, loading: true, connectionStatus: action.payload.connectionStatus };
        case FETCH_ORDER_BOOK_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case FETCH_ORDER_BOOK_ERROR:
            return { ...state, loading: false, ...action.payload };
        default: return { ...state };
    }
}
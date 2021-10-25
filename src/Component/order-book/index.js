import React, { useEffect, useState, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import styled from "styled-components"
import { throttle } from 'lodash'
import { MdZoomIn, MdZoomOut } from 'react-icons/md'
import numberWithCommas from '../../helpers/format-number';
import { fetchOrderBook, fetchOrderBookSuccess } from "./../../redux/actions"
import '../../App.css';

export const Icon = styled.div`
  display:flex;
  flex-grow:0;
  padding:10px;
  font:normal 15px Arial; 
  svg {
    font-size:20px;
  }
`;

const PRECESION = ["P0", "P1"]
const OrderBook = (props) => {
  const [precesion, setPrecision] = useState(0)
  const [scale, setScale] = useState(1.0)
  const decPrecision = () => precesion > 0 && setPrecision((precesion + PRECESION.length - 1) % PRECESION.length)
  const incPrecision = () => precesion < 4 && setPrecision((precesion + 1) % PRECESION.length)
  const decScale = () => setScale(scale + 0.1)
  const incScale = () => setScale(scale - 0.1)

  const { orderbook, connectionStatus } = useSelector(state => {
    return state.orderBook
  })
  const dispatch = useDispatch();
  const { bids, asks } = orderbook

  const startConnection = () => !connectionStatus && dispatch(fetchOrderBook({ connectionStatus: true, callback }))
  const stopConnection = () => connectionStatus && dispatch(fetchOrderBook({ connectionStatus: false, callback }))
  const callback = (data) => {
    dispatch(fetchOrderBookSuccess({ ...data }))
  }

  const prec = precesion % PRECESION.length
  useEffect(() => {
    dispatch(fetchOrderBook({ connectionStatus, callback }))
  }, [connectionStatus])

  const _asks = asks && Object.keys(asks).slice(0, 21).reduce((acc, k, i) => {
    const total = Object.keys(asks).slice(0, i + 1).reduce((t, i) => {
      t = t + asks[i].amount
      return t
    }, 0)
    const item = asks[k]
    acc[k] = { ...item, total }
    return acc
  }, {})
  const maxAsksTotal = Object.keys(_asks).reduce((t, i) => {
    if (t < _asks[i].total) {
      return _asks[i].total
    }
    else {
      return t
    }
  }, 0)
  const _bids = bids && Object.keys(bids).slice(0, 21).reduce((acc, k, i) => {
    const total = Object.keys(bids).slice(0, i + 1).reduce((t, i) => {
      t = t + bids[i].amount
      return t
    }, 0)
    const item = bids[k]
    acc[k] = { ...item, total }
    return acc
  }, {})
  const maxBidsTotal = Object.keys(_bids).reduce((t, i) => {
    if (t < _bids[i].total) {
      return _bids[i].total
    }
    else {
      return t
    }
  }, 0)

  return (
    <div className="row panel px-2">
      <div className="col-md-6 heads">
        <h6 className="mb-0">Order Book <span>BTC/USD</span></h6>
      </div>
      <div className="col-md-6 heads">
        <div className="tools">
          {!connectionStatus && <Icon onClick={startConnection}> Connect </Icon>}
          {connectionStatus && <Icon onClick={stopConnection}> Disconnect </Icon>}
          <Icon onClick={incPrecision}> Precesion </Icon>
          <Icon onClick={decScale}><MdZoomOut /></Icon>
          <Icon onClick={incScale}><MdZoomIn /></Icon>
        </div>
      </div>
      <div className="col-6">
        <table className="table table-borderless table-sm">
          <thead>
            <div className="row">
              <div className="table-col">Count</div>
              <div className="table-col">Amount</div>
              <div className="table-col">Total</div>
              <div className="table-col">Price</div>
            </div>
          </thead>
          <tbody>
            {_bids && Object.keys(_bids).map((k, i) => {
              const item = _bids[k]
              const { cnt, amount, price, total } = item
              const percentage = ((total * 100) / (maxBidsTotal * scale))
              return (
                <div
                  className="row"
                  key={`book-${cnt}${amount}${price}${total}`}
                  style={{
                    backgroundImage: `linear-gradient(to left, #314432 ${percentage}%, #172D3E 0%)`
                  }}>
                  <div className="table-col">{cnt}</div>
                  <div className="table-col">{amount.toFixed(2)}</div>
                  <div className="table-col">{total.toFixed(2)}</div>
                  <div className="table-col">{numberWithCommas(price.toFixed(prec))}</div>
                </div>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="col-6">
        <table className="table table-borderless table-sm">
          <thead>
            <div className="row">
              <div className="table-col">Count</div>
              <div className="table-col">Amount</div>
              <div className="table-col">Total</div>
              <div className="table-col">Price</div>
            </div>
          </thead>
          <tbody>
            {_asks && Object.keys(_asks).map((k, i) => {
              const item = _asks[k]
              const { cnt, amount, price, total } = item
              const percentage = (total * 100) / (maxAsksTotal * scale)
              return (
                <div className="row" style={{
                  backgroundImage: `linear-gradient(to right, #402c33 ${percentage}%, #172D3E 0%)`
                }}>
                  <div className="table-col">{numberWithCommas(price.toFixed(prec))}</div>
                  <div className="table-col">{total.toFixed(2)}</div>
                  <div className="table-col">{amount.toFixed(2)}</div>
                  <div className="table-col">{cnt}</div>
                </div>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderBook
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { IoLogoBitcoin } from 'react-icons/io'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import numberWithCommas from '../../helpers/format-number';
import '../../App.css';


const OrderBook = (props) => {
  const { ticker } = useSelector(state => {
    return state.orderBook
  })
  const empty_ticker = [0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  const [CHANNEL_ID, [BID, BID_SIZE, ASK, ASK_SIZE, DAILY_CHANGE, DAILY_CHANGE_PERC, LAST_PRICE, VOLUME, HIGH, LOW]] = Array.isArray(ticker) && ticker.length ? ticker : empty_ticker

  return (
    <div className="row panel">
      <div className="col-2">
        <div className="BitCoinIcon"><IoLogoBitcoin /></div>
      </div>
      {Array.isArray(ticker) && ticker.length &&
        <Fragment>
          <div className="col-4">
            <h6 className="font-700 mb-0">BTC/USD</h6>
            <p className="f-12 mb-0">
              <span class="text-muted font-600">VOL</span> {VOLUME && numberWithCommas(VOLUME.toFixed(2))} USD
            </p>
            <p className="f-12 mb-0">Low {LOW && numberWithCommas(LOW.toFixed(1))}</p>
          </div>
          <div className="col-6">
            <h6 className="font-700 mb-0">{LAST_PRICE && numberWithCommas(LAST_PRICE.toFixed(1))}</h6>
            <p className="f-12 mb-0">
              <span className={DAILY_CHANGE_PERC < 0 ? `red` : 'green'}>
                {DAILY_CHANGE && numberWithCommas(DAILY_CHANGE.toFixed(2))}
                {DAILY_CHANGE_PERC < 0 ? <FaCaretDown /> : <FaCaretUp />}
                ({DAILY_CHANGE_PERC}%)</span>
            </p>
            <p className="f-12 mb-0">High {HIGH && numberWithCommas(HIGH.toFixed(1))}</p>
          </div>
        </Fragment>
      }


    </div>
  )
}

export const Line = styled.div`
  color: #aaa;
  font:16px Arial;
  font:normal 14px Arial;
  span.red { color:red;}
  span.green { color:green;}
`;

export default OrderBook
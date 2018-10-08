import * as types from './actionTypes'
import axios from 'axios'
import APICONFIG from './apiConfig'

const currenciesByCountry = {
  'AR': 'ARS',
  'PY': 'PYG',
  'CL': 'CLP',
  'UY': 'UYU'
}

export function fetchBidPrice(country){
  return (dispatch) => {
    dispatch({
      type: types.SET_DESTINATION_COUNTRY,
      country,
      currency: currenciesByCountry[country]
    })

    axios.get(APICONFIG.baseUrl+`/btc_${currenciesByCountry[country].toLowerCase()}/market/ticker`).then((response) => {
      dispatch(fetchBidPriceSuccess(response.data.bid));
    })
  }
}

export function fetchBidPriceSuccess(value){
  return {
    type: types.SET_BID_PRICE,
    value
  }
}

export function fetchAskPrice(country){
  return (dispatch) => {
    dispatch({
      type: types.SET_ORIGIN_COUNTRY,
      country,
      currency: currenciesByCountry[country]
    })

    axios.get(APICONFIG.baseUrl+`/btc_${currenciesByCountry[country].toLowerCase()}/market/ticker`).then((response) => {
      dispatch(fetchAskPriceSuccess(response.data.ask));
    })
  }
}

export function fetchAskPriceSuccess(value){
  return {
    type: types.SET_ASK_PRICE,
    value
  }
}

export function changeSender(sender){
  return {
    type: types.CHANGE_SENDER,
    sender
  }
}

export function changeOriginAmount(value){
  return {
    type: types.CHANGE_ORIGIN_AMOUNT,
    value
  }
}

export function changeDestinationAmount(value){
  return {
    type: types.CHANGE_DESTINATION_AMOUNT,
    value
  }
}

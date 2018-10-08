import {
  SET_ORIGIN_COUNTRY,
  SET_DESTINATION_COUNTRY,
  SET_BID_PRICE,
  SET_ASK_PRICE,
  CHANGE_SENDER,
  CHANGE_ORIGIN_AMOUNT,
  CHANGE_DESTINATION_AMOUNT,
  CHANGE_PREFUNDED,
  CHANGE_RECEIVER
} from './actionTypes'

const remittances = (state = {}, action) => {
  switch (action.type) {
    case SET_ORIGIN_COUNTRY:
      return {
        ...state,
        origin: {
          country: action.country,
          currency: action.currency
        }
      }
    case SET_DESTINATION_COUNTRY:
      return {
        ...state,
        destination: {
          country: action.country,
          currency: action.currency
        }
      }
    case SET_BID_PRICE:
      return {
        ...state,
        bid: Math.ceil(action.value * 100) / 100
      }
    case SET_ASK_PRICE:
      return {
        ...state,
        ask: Math.ceil(action.value * 100) / 100
      }
    case CHANGE_SENDER:
      return {
        ...state,
        sender: action.sender
      }
    case CHANGE_ORIGIN_AMOUNT:
      return {
        ...state,
        amount_edited: (action.value) ? 'origin' : '',
        value: action.value
      }
    case CHANGE_DESTINATION_AMOUNT:
      return {
        ...state,
        amount_edited: (action.value) ? 'destination' : '',
        value: action.value
      }
    case CHANGE_PREFUNDED:
      return {
        ...state,
        prefunded: action.value
      }
    case CHANGE_RECEIVER:
      return {
        ...state,
        receiver: action.value
      }
    default:
      return state
  }
}

export default remittances

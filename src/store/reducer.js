import { 
  SET_ORIGIN_COUNTRY,
  SET_DESTINATION_COUNTRY,
  SET_BID_PRICE,
  SET_ASK_PRICE
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
    default:
      return state
  }
}

export default remittances

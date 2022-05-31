import {Action} from "./acitionTypes"

const initialState = {
    currencies : [],
    selected: 0
}

export default function currencyReducer(state = initialState, action) {
    switch(action.type) {
        case Action.FETCH_CURRENCY:
            return {...state, currencies: action.payload}
        case Action.SELECT_CURRENCY:
            return {...state, selected: action.payload}
        default:
            return state
    }
}
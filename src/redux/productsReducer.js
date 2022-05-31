import { cloneDeep } from "lodash"
import {Action} from "./acitionTypes"

const initialState = {
    products: [],
    selected: null,
    error: null
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case Action.SELECT_PRODUCT:
            return {...state, selected: action.payload, error: null}
        case Action.LOAD_PRODUCT_INFO:
            return {...state, products: cloneDeep(action.payload), error: null}
        case Action.SET_PRODUCT_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}
import { cloneDeep } from "lodash"

const initialState = {
    products: [],
    selected: null,
    error: null
}

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case "SelectProduct":
            return {...state, selected: action.payload, error: null}
        case "LoadProductInfo":
            return {...state, products: cloneDeep(action.payload), error: null}
        case "ProductsError":
            return {...state, error: action.payload}
        default:
            return state
    }
}
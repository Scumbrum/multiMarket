import { cloneDeep } from "lodash"
import {Action} from "./acitionTypes"
const initialState = {
    products:[],
    totalQuantity: 0,
    totalPrices: [],
    tax: 0.21
}

export default function cartReducer(state = initialState, action) {
    let product = null
    let current = null
    let prev = []
    let next = []
    let newProducts = []
    switch(action.type) {
        case Action.LOAD_CART:
            return cloneDeep(action.payload)
        case Action.ADD_PRODUCT:
            return {...state,
                totalQuantity: state.totalQuantity+1,
                totalPrices: [...action.prices],
                products: cloneDeep(action.products)
            }
        case Action.INCREMENT_PRODUCT:
            current = state.products[action.payload]
            product = cloneDeep(current)
            product.quantity = current.quantity + 1
            prev = state.products.filter((_, index) => index < action.payload)
            next = state.products.filter((_, index) => index > action.payload)
            return {...state,
                products: cloneDeep([...prev, product, ...next]),
                totalQuantity: state.totalQuantity+1,
                totalPrices: action.prices}
        case Action.DECREMENT_PRODUCT:
            current = state.products[action.payload]
            product = cloneDeep(current)
            product.quantity = current.quantity - 1
            prev = state.products.filter((_, index) => index < action.payload)
            next = state.products.filter((_, index) => index > action.payload)
            if(product.quantity > 0){
                newProducts = [...prev, product, ...next]
            } else {
                newProducts = [...prev, ...next]
            }
            return {...state,
                products: cloneDeep(newProducts),
                totalQuantity: state.totalQuantity-1,
                totalPrices: action.prices}
        case Action.SET_CART_ATTRIBUTE:
            return {...state,
                products: cloneDeep(action.payload)}
        case Action.CHANGE_PRODUCT:
            current = state.products[action.payload]
            product = cloneDeep(current)
            let totalQuantity = state.totalQuantity - product.quantity
            product.quantity = action.quantity
            prev = state.products.filter((_, index) => index < action.payload)
            next = state.products.filter((_, index) => index > action.payload)
            if(product.quantity > 0){
                newProducts = [...prev, product, ...next]
            } else {
                newProducts = [...prev, ...next]
            }
            return {...state,
                products: cloneDeep(newProducts),
                totalQuantity: totalQuantity + action.quantity,
                totalPrices: action.prices}
        case Action.CLEAR_BAG:
            return {
                ...state,
                products:[],
                totalQuantity: 0,
                totalPrices: [],
            }
        default:
            return state
    }
}
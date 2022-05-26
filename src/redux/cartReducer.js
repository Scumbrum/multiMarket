import { cloneDeep } from "lodash"
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
        case "LoadCart":
            return cloneDeep(action.payload)
        case "AddProduct":
            return {...state,
                totalQuantity: state.totalQuantity+1,
                totalPrices: [...action.prices],
                products: cloneDeep(action.products)
            }
        case "IncrementProduct":
            current = state.products[action.payload]
            product = cloneDeep(current)
            product.quantity = current.quantity + 1
            prev = state.products.filter((_, index) => index < action.payload)
            next = state.products.filter((_, index) => index > action.payload)
            return {...state,
                products: cloneDeep([...prev, product, ...next]),
                totalQuantity: state.totalQuantity+1,
                totalPrices: action.prices}
        case "DecrementProduct":
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
        case "SetCartAttribute":
            return {...state,
                products: cloneDeep(action.payload)}
        default:
            return state
    }
}
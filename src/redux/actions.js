import {Action} from "./acitionTypes"

export function fetchCurrencies(currencies) {
    return {
        type:Action.FETCH_CURRENCY,
        payload: currencies
    }
}

export function fetchCategories(categories) {
    return {
        type:Action.FETCH_CATEGORIES,
        payload: categories
    }
}

export function selectCategories(category) {
    return {
        type:Action.SELECT_CATEGORY,
        payload: category
    }
}

export function setCategoryError(message) {
    return {
        type:Action.SET_CATEGORY_ID,
        payload: message
    }
}

export function selectProduct(id) {
    return {
        type:Action.SELECT_PRODUCT,
        payload: id
    }
}

export function loadProductInfo(products) {
    return {
        type:Action.LOAD_PRODUCT_INFO,
        payload: products
    }
}

export function setAttribute(name, value) {
    return {
        type:Action.SET_ATTRIBUTE,
        name,
        value
    }
}

export function loadCart(items) {
    return {
        type:Action.LOAD_CART,
        payload: items
    }
}

export function setCartAttribute(products) {
    return {
        type:Action.SET_CART_ATTRIBUTE,
        payload: products
    }
}

export function clearBag() {
    return {
        type:Action.CLEAR_BAG
    }
}

export function addProduct(products, newPrices) {
    return {
        type:Action.ADD_PRODUCT,
        products,
        prices: newPrices
    }
}

export function incrementProduct(id, prices) {
    return {
        type:Action.INCREMENT_PRODUCT,
        payload: id,
        prices
    }
}

export function changeProduct(id, prices, value) {
    return {
        type:Action.CHANGE_PRODUCT,
        payload: id,
        prices,
        quantity:value
    }
}

export function decrementProduct(id, prices) {
    return {
        type:Action.DECREMENT_PRODUCT,
        payload: id,
        prices
    }
}

export function selectCurrency(index) {
    return {
        type:Action.SELECT_CURRENCY,
        payload: index
    }
}

export function setProductsError(message) {
    return {
        type:Action.SET_PRODUCT_ERROR,
        payload: message
    }
}
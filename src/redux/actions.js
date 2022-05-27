export function fetchCurrencies(currencies) {
    return {
        type:"FetchCurrency",
        payload: currencies
    }
}

export function fetchCategories(categories) {
    return {
        type:"FetchCategories",
        payload: categories
    }
}

export function selectCategories(category) {
    return {
        type:"SelectCategory",
        payload: category
    }
}

export function setCategoryError(message) {
    return {
        type:"SetCategoryError",
        payload: message
    }
}

export function selectProduct(id) {
    return {
        type:"SelectProduct",
        payload: id
    }
}

export function loadProductInfo(products) {
    return {
        type:"LoadProductInfo",
        payload: products
    }
}

export function setAttribute(name, value) {
    return {
        type:"SetAttribute",
        name,
        value
    }
}

export function loadCart(items) {
    return {
        type:"LoadCart",
        payload: items
    }
}

export function setCartAttribute(products) {
    return {
        type:"SetCartAttribute",
        payload: products
    }
}

export function clearBag() {
    return {
        type:"ClearBag"
    }
}

export function addProduct(products, newPrices) {
    return {
        type:"AddProduct",
        products,
        prices: newPrices
    }
}

export function incrementProduct(id, prices) {
    return {
        type:"IncrementProduct",
        payload: id,
        prices
    }
}

export function decrementProduct(id, prices) {
    return {
        type:"DecrementProduct",
        payload: id,
        prices
    }
}

export function selectCurrency(index) {
    return {
        type:"SelectCurrency",
        payload: index
    }
}

export function setProductsError(message) {
    return {
        type:"ProductsError",
        payload: message
    }
}
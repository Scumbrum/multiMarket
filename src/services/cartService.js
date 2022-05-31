import { cloneDeep } from "lodash";

export function cartProductAdaptor(product, products) {
    let newProduct = cloneDeep(product)
    let data = findProduct(products, newProduct)
    if(data.product){
        newProduct.quantity = data.product.quantity + 1
        return [...data.prev, newProduct, ...data.next]
    } else {
        newProduct.quantity = 1
        return [...data.prev, ...data.next, newProduct]
    }
}

export function cartAttributeAdaptor(products, attributeName, index, productIndex) {
    let product = products[productIndex]
    const currentAttributes = {...product.currentAttributes, [attributeName]: index} 
    product = {...product, currentAttributes}
    const newProduct = cloneDeep(product)
    const other = products.filter((_, i) => i !== productIndex)
    let data = findProduct(other, newProduct)
    if(data.product){
        newProduct.quantity = data.product.quantity + product.quantity
        return [...data.prev, newProduct, ...data.next]
    } else {
        const prev = products.filter((_, i) => i < productIndex)
        const next = products.filter((_, i) => i > productIndex)
        return [...prev, newProduct,...next]
    }
}

export function order(clearer) {
    clearer()
    alert("Ordered")
}

function getTotalPrices(prices, product, action) {
    const totalPrices = [...prices]
    product.prices.forEach((element, index) => {
        if(totalPrices[index] !== undefined) {
            totalPrices[index] =  Math.round((totalPrices[index] + element.amount * action) * 100) / 100
        } else {
            totalPrices.push(element.amount)
        }
    });
    return totalPrices
}

export function addTotalPrices(prices, product) {
    return getTotalPrices(prices, product, 1)
}

export function removeTotalPrices(prices, product) {
    return getTotalPrices(prices, product, -1)
}

export function changeTotalPrices(prices, product, value) {
    let newPrices = getTotalPrices(prices, product, -product.quantity)
    return getTotalPrices(newPrices, product, value)
}

function findProduct(products, product) {
    const suits = products.filter(current => current.id === product.id)
    let same = false
    let index = 0
    for(let suit of suits) {
        same = compare(product, suit)
        if(same){
            break
        }
        index++
    }
    const exists = products.indexOf(suits[index])
    const prev = products.filter((_, i) => exists > i)
    const next = products.filter((_, i) => exists < i)
    return {prev, next, product: suits[index]}
}

function compare(product1, product2) {
    let same = true
    if(!product1 || !product2) {
        return false
    }
    const attributes1 = product1.currentAttributes
    const attributes2 = product2.currentAttributes
    for(let attribute in attributes1) {
        if(attributes1[attribute]!==attributes2[attribute] && attribute!=="image"){
            same = false
            break
        }
    }
    return same
}
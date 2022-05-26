import { getProduct, getProducts } from "../queries"

const patterns = {
    "image": imagePattern,
    "text": textPattern,
    "swatch": swatchPattern
}

function swatchPattern(element) {
    return <span className="swatch-attribute" style={{background: element.value}}/>
}

function imagePattern(element) {
    return <img src={element} alt={element} className="gallery-item"/>
}

function textPattern(element) {
    return <p className="text-attribute">{element.value}</p>
}

export function getAttributeProps(product, attributeName, elements, separate, handler, index=-1) {
    const currentAttribute = product.currentAttributes && product.currentAttributes[attributeName]
    const attribute = product.attributes 
                    && product.attributes.find(attribute => attribute.name === attributeName)
    const attributeType = attribute && attribute.type
    const pattern = patterns[attributeType || attributeName]
    return {
        currentAttribute,
        attributeName,
        elements,
        pattern,
        separate,
        handler,
        index
    }
}

export async function fetchProducts(category, client) {
    return await client.query({
        query: getProducts,
        variables: {title: category}
    })
}

export async function getData(selected, client){
    const items = JSON.parse(localStorage.getItem("attributes"))
    const pathItem = window.location.pathname.split("/")[2]
    let product = items && items.find(item => item.id === pathItem)
    const current = selected || pathItem
    if(!product || !product.attributes) {
        product = await client.query({
            query: getProduct,
            variables: {
                id: current
            }})
        product = product.data.product
    }
    return {current, product: product}
}

export function productAdaptor(data, products) {
    let {product, prev, next} = productsDistibution(products, data.id)
    const currentAttributes = createAttributes(data.attributes, data.currentAttributes)
    product = {...product, ...data, currentAttributes}
    return [...prev, product, ...next]
}

export function attributeAdaptor(name, value, products, selected) {
    let {product, prev, next} = productsDistibution(products, selected)
    const currentAttributes = {...product.currentAttributes, [name]: value} 
    product = {...product, currentAttributes}
    return [...prev, product, ...next]
}

export function productsDistibution(products, id) {
    const product = products.find(product => product.id === id)
    let currentIndex = products.indexOf(product)
    if(currentIndex === -1) {
        currentIndex = products.length
    }
    const prev = products.filter((_, index) => index < currentIndex)
    const next = products.filter((_, index) => index > currentIndex)
    return {product, prev, next}
}

function createAttributes(attributes, currents) {
    const currentAttributes = {}
    attributes.forEach((attribute) => {
        currentAttributes[attribute.name] = getAttribute(currents, attribute.name)
    })
    currentAttributes["image"] = 0
    return currentAttributes
}

function getAttribute(currents, name) {
    if(!currents) {
        return 0
    }
    return currents[name] || 0
}
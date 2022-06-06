import React from "react";
import { connect } from "react-redux";
import {changeProduct,
    decrementProduct,
    incrementProduct,
    selectProduct,
    setCartAttribute} from "../redux/actions"
import { addTotalPrices,
    cartAttributeAdaptor,
    changeTotalPrices,
    removeTotalPrices } from "../services/cartService";
import { getAttributeProps } from "../services/productService";
import AttributeController from "./AttributeController";
import ImageSwiper from "./ImageSwiper";

class CartItem extends React.Component {

    constructor(props) {
        super(props)
        this.focus = false
        this.state = {
            count: 1
        }
    }

    componentDidMount() {
        const {product} = this.props
        this.setState({count:product.quantity})
    } 

    componentDidUpdate() {
        const {product} = this.props
        if(!this.focus &&product.quantity!==this.state.count) {
            this.setState({count:product.quantity})
        }
    }

    handler = ({attributeName, index, productIndex})=> {
        const {products} = this.props
        const newProducts = cartAttributeAdaptor(products, attributeName, index, productIndex)
        this.props.setCartAttribute(newProducts)
    }

    increment = () => {
        const {incrementProduct, index, totalPrices} = this.props
        const prices = addTotalPrices(totalPrices,this.props.product)
        incrementProduct(index, prices)
        this.setState({count:this.state.count+1})
    }

    decrement = () => {
        const {decrementProduct, index, totalPrices, product} = this.props
        const prices = removeTotalPrices(totalPrices,product)
        decrementProduct(index, prices)
        this.setState({count:this.state.count-1})
        
    }

    change = (value) => {
        const {index, totalPrices, products, product} = this.props
        if(products.indexOf(product)!==-1) {
            const prices = changeTotalPrices(totalPrices,product,value)
            this.props.changeProduct(index, prices, value)
        }
    }

    getGallery = () => {
        const {product} = this.props
        return product.gallery.map((image, index) => 
            <img src={image} alt={index} key={index}/>
        )
    }

    changer = (e) => {
        if(e.key !== "Enter") {
            return
        }
        e.target.blur()
        this.focus = false
        this.change(this.state.count)
    }

    listener = (e) => {
        this.focus = true
        let value = e.target.value
        if(!/^\d*/.test(value)) {
            return
        }
        if(value === "") {
            value = "0"
        }
        this.setState({count: parseInt(value)})
    }
   
    render() {
        const {product, selectedCurrency, all, index} = this.props
        return(
            <li className="cart-item">
                <div className="item-content">
                    <div className="item-text">
                        <h1 className="cart-item-title">{product.brand}</h1>
                        <h1>{product.name}</h1>
                    </div>
                    <p className="item-price">
                        {product.prices[selectedCurrency].currency.symbol}{product.prices[selectedCurrency].amount}
                    </p>
                    {product.attributes.map(attribute =>
                        <div key={attribute.name} className="item-attributes">  
                            <p>{attribute.name}:</p>
                            <AttributeController
                            {...getAttributeProps({product, 
                                attributeName:attribute.name, 
                                elements:attribute.items, 
                                separate:false, 
                                handler:this.handler,
                                index})}
                            />
                        </div>
                    )}
                </div>
                <div className="item-gallery">
                    <div className="item-counter">
                        <button onMouseUp={this.increment}>+</button>
                            <input onChange={this.listener}
                            value={this.state.count}
                            onKeyUp={this.changer}
                            onBlur={this.changer}/>
                        <button onMouseUp={this.decrement}>-</button>
                    </div>
                    {all ?
                    <ImageSwiper gallery={this.getGallery()} amount={1}/>:
                    <img src={product.gallery[0]} alt={product.name}/>}
                </div>
            </li>
        )
    }
}

const stateToProps = (state) => {
    return {
        selectedCurrency: state.currencyReducer.selected,
        totalPrices: state.cartReducer.totalPrices,
        products: state.cartReducer.products
    }
}

const dispatchToProps = {
    selectProduct,
    incrementProduct,
    decrementProduct,
    setCartAttribute,
    changeProduct
}


export default connect(stateToProps, dispatchToProps)(CartItem)
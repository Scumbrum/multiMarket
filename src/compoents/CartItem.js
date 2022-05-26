import React from "react";
import { connect } from "react-redux";
import {decrementProduct, incrementProduct, selectProduct, setCartAttribute} from "../redux/actions"
import { addTotalPrices, cartAttributeAdaptor, removeTotalPrices } from "../services/cartService";
import { getAttributeProps } from "../services/productService";
import AttributeController from "./AttributeController";
import ImageSwiper from "./ImageSwiper";


class CartItem extends React.Component {

    handler = ({attributeName, index, productIndex})=> {
        setTimeout(()=> {
            const {products} = this.props
            const newProducts = cartAttributeAdaptor(products, attributeName, index, productIndex)
            this.props.setCartAttribute(newProducts)
        }, 50)
    }

    increment = () => {
        const {incrementProduct, index, totalPrices} = this.props
        const prices = addTotalPrices(totalPrices,this.props.product)
        incrementProduct(index, prices)
    }

    decrement = () => {
        setTimeout(()=> {
            const {decrementProduct, index, totalPrices} = this.props
            const prices = removeTotalPrices(totalPrices,this.props.product)
            decrementProduct(index, prices)
        }, 50)
    }

    getGallery = () => {
        const {product} = this.props
        return product.gallery.map((image, index) => 
            <img src={image} alt={index} key={index}/>
        )
    }
   
    render() {
        const {product, selectedCurrency, all, index} = this.props
        return(
            <li className="cart-item">
                <div className="item-content">
                    <div className="item-text">
                        <h1 className="cart-item-title">{product.name}</h1>
                        <h3>{product.brand}</h3>
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
                        <button onClick={this.increment}>+</button>
                        <p>{product.quantity}</p>
                        <button onClick={this.decrement}>-</button>
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
    setCartAttribute
}


export default connect(stateToProps, dispatchToProps)(CartItem)
import React from "react";
import { connect } from "react-redux";
import CartItem from "./compoents/CartItem";
import Scroller from "./compoents/Scroller";
import { order } from "./services/cartService";
import {clearBag} from "./redux/actions"

class Cart extends React.Component {

    componentDidMount() {
        const {products, totalPrices, totalQuantity, tax} = this.props
        sessionStorage.setItem("cart", JSON.stringify({
            products,
            totalPrices,
            totalQuantity,
            tax
        }))
    }


    componentDidUpdate() {
        this.componentDidMount()
    }

    getTaxed = () => {
        const {selected,totalPrices, tax} = this.props
        console.log(totalPrices[selected])
        if(totalPrices[selected]) {
            return Math.round(tax * totalPrices[selected] * 100) / 100
        }
        return 0
    }

    render() {
        const {products, selected, currencies, totalPrices, tax} = this.props
        
        return(
            <section className="main-container">
                <h1 className="cart-title">Cart</h1>
                <ul className="cart-list">
                     {products.map((product,index) =>
                    <CartItem product={product} key={index} index={index} all={true}/>)}
                </ul>
                <div className="cart-info">
                    <p className="cart-prop">
                        <span className="cart-field">Tax {tax*100}%:</span>
                        <span className="cart-value">
                            {currencies[selected].symbol}{this.getTaxed()}
                        </span>
                    </p>
                    <p className="cart-prop">
                        <span className="cart-field">Quantity:</span>
                        <span className="cart-value">{this.props.totalQuantity}</span>
                    </p>
                    <p className="cart-prop">
                        <span className="cart-field">Total:</span>
                        <span className="cart-value">{currencies[selected].symbol}{totalPrices[selected]}</span>
                    </p>
                </div>
                {products.length !== 0 &&
                    <button className="cart success-button" onClick={()=>order(this.props.clearBag)}>Order</button>
                }
                <Scroller/>
            </section>
        )
    }
}

const stateToProps = (state) => {
    return {
        products: state.cartReducer.products,
        totalPrices: state.cartReducer.totalPrices,
        totalQuantity: state.cartReducer.totalQuantity,
        selected: state.currencyReducer.selected,
        currencies: state.currencyReducer.currencies,
        tax: state.cartReducer.tax
    }
}

const dispatchToProps = {
    clearBag
}


export default connect(stateToProps, dispatchToProps)(Cart)
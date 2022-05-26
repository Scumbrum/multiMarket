import React from "react";
import { connect } from "react-redux";
import CartItem from "./compoents/CartItem";
import Scroller from "./compoents/Scroller";

class Cart extends React.Component {

    componentDidMount() {
        const {products, totalPrices, totalQuantity, tax} = this.props
        localStorage.setItem("cart", JSON.stringify({
            products,
            totalPrices,
            totalQuantity,
            tax
        }))
    }

    order = () => {
        const {products} = this.props
        if(products.length===0) {
            alert("Nothing to order!")
            return
        }
        alert("Ordered!")
    }

    componentDidUpdate() {
        this.componentDidMount()
    }

    getTexed = () => {
        const {selected,totalPrices, tax} = this.props
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
                        <span className="cart-field">Text {tax*100}%:</span>
                        <span className="cart-value">
                            {currencies[selected].symbol}{this.getTexed()}
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
                <button className="cart success-button" onClick={this.order}>Order</button>
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



export default connect(stateToProps, null)(Cart)
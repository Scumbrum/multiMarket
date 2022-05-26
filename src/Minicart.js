import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./compoents/CartItem";
import "./styles/cart.css"

class MiniCart extends React.Component {

    componentDidUpdate() {
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
   
    render() {
        const {products, currencies, selected, totalPrices} = this.props
        return(
            <section className="minicart">
                <div ref={this.props.innerRef}>
                    <h1 className="minicart-title"><b>My Bag</b>, {this.props.count} items</h1>
                    <ul className="product-list">
                        {products.map((product, index) =>
                        <CartItem product={product} key={index} index={index}/>)}
                    </ul>
                </div>
                <div className="total-display">
                    <span>Total:</span>
                    <span>{currencies[selected]&&currencies[selected].symbol} {totalPrices[selected]}</span>
                </div>
                <div className="minicart-controlls">
                    <Link to="/cart" className="cart-button">View Bag</Link>
                    <button className="success-button" onClick={this.order}>Check out</button>
                </div>
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
        count: state.cartReducer.totalQuantity,
        tax: state.cartReducer.tax
    }
}



export default connect(stateToProps, null)(MiniCart)
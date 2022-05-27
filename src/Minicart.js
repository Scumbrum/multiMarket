import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./compoents/CartItem";
import { order } from "./services/cartService";
import {clearBag} from "./redux/actions";
import "./styles/cart.css"

class MiniCart extends React.Component {

    componentDidUpdate() {
        const {products, totalPrices, totalQuantity, tax} = this.props
        sessionStorage.setItem("cart", JSON.stringify({
            products,
            totalPrices,
            totalQuantity,
            tax
        }))
    }
   
    render() {
        const {products, currencies, selected, totalPrices} = this.props
        return(
            <section className="minicart">
                {products.length !== 0 ? 
                <>
                    <div ref={this.props.innerRef}>
                        <h1 className="minicart-title">
                            <b>My Bag</b>, {this.props.count} items
                        </h1>
                        <ul className="product-list">
                            {products.map((product, index) =>
                            <CartItem product={product} key={index} index={index}/>)}
                        </ul>
                    </div>
                    <div className="total-display">
                        <span>Total:</span>
                        <span>
                            {currencies[selected]&&currencies[selected].symbol} {totalPrices[selected]}
                        </span>
                    </div>
                    <div className="minicart-controlls">
                        <Link to="/cart" className="cart-button">View Bag</Link>
                        <button className="success-button" onClick={()=>order(this.props.clearBag)}>
                            Check out
                        </button>
                    </div>
                </>:
                <h2 className="empty">Empty bag</h2>}
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

const dispatchToProps = {
    clearBag
}


export default connect(stateToProps, dispatchToProps)(MiniCart)
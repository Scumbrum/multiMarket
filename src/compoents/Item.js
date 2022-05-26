import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {selectProduct} from "../redux/actions"
import cartIcon from "../media/whiteCart.svg"

class Item extends React.Component {
   
    render() {
        const {item, selectProduct, selected} = this.props
        return(
            <div className="produt-item">
                <Link to={`./${item.id}`} onClick={()=> selectProduct(item.id)}>
                    <div className="product-preview">
                        <img src={item.gallery[0]} alt={item.name} className="main"/>
                        <span className="icon">
                            <img src={cartIcon} alt="cart"/>
                        </span>
                    </div>
                    <h3 className="product-title">{item.name}</h3>
                    <p className="product-price">
                        {item.prices[selected].currency.symbol}{item.prices[selected].amount}
                    </p>
                </Link>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        selected: state.currencyReducer.selected,

    }
}

const dispatchToProps = {
    selectProduct
}


export default connect(stateToProps, dispatchToProps)(Item)
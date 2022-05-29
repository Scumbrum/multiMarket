import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {selectProduct} from "../redux/actions"
import cartIcon from "../media/whiteCart.svg"
import Flier from "./Flier";

class Item extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeAnimation:false
        }
    }

    adder = (e) => {
        const {choser, item} = this.props
        choser(item.id)
        this.setState({activeAnimation: true})
        setTimeout(() => this.setState({activeAnimation:false}), 500)
    }
   
    render() {
        const {item, selectProduct, selected} = this.props
        return(
            <div className="product-item">
                <Flier shown = {this.state.activeAnimation}>
                    <img src={item.gallery[0]} alt="flier"/>
                </Flier>
                {!item.inStock &&
                <p className="stock-label">Not in stock</p>
                }
                <div className="product-preview">
                    <Link to={`./${item.id}`} onClick={()=>selectProduct(item.id)}>
                        <img src={item.gallery[0]} alt={item.name} className="main"/>
                    </Link>
                    {item.inStock &&
                    <span className="icon">
                        <img src={cartIcon} alt="cart" onClick={this.adder}/>
                    </span>}
                </div>
                <Link to={`./${item.id}`} onClick={()=>selectProduct(item.id)}>
                    <h3 className="product-title">{item.name}</h3>
                    <h5 className="brand">{item.brand}</h5>
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
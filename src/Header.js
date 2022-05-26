import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Switcher from "./compoents/Switcher";
import Minicart from "./Minicart";
import { getMeta } from "./queries";
import "./styles/header.css"
import logo from "./media/a-logo.svg"
import cartIcon from "./media/cart.svg"
import {fetchCurrencies,
    fetchCategories,
    selectCategories,
    setCategoryError,
    selectCurrency} from "./redux/actions"
class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            opened: false
        }
        this.references = []
        this.references.push(React.createRef(), React.createRef())
    }
 
    componentDidMount() {
        const {fetchCurrencies, fetchCategories, setCategoryError, client} = this.props
        client.query({
            query: getMeta
        })
        .then(r=>{
            fetchCategories(r.data.categories)
            fetchCurrencies(r.data.currencies)
        })
        .catch(r=>setCategoryError(r.message))
        document.addEventListener("click", this.unsetter)
    }

    unsetter = (e) => {
        const notToClose = this.references.find(ref => {
            if(!ref.current) {
                return false
            }
            return ref.current.contains(e.target)
        })
        if(!notToClose && this.state.opened) {
            this.setState({opened:false})
            this.props.handler()
        }
    }

    componentWillUnmount(){
        document.removeEventListener("click", this.unsetter)
    }

    opener = (e) => {
        const workField = this.references[1].current
        if(!workField || !workField.contains(e.target)) {
            this.setState({opened: !this.state.opened})
            this.props.handler()
        }
    }


    render() {
        const {categories, selectCategories, count, selectedCateg} = this.props
        return(
            <header className="header">
                <div className="container">
                <nav>
                    <ul className="navbar">
                        {categories.map((category,index)=>
                        <li key={index} className={index===selectedCateg ? "active" : ""}>
                            <Link 
                                onClick={()=>selectCategories(index)}
                                to={category.name}
                                className="nav-link">
                                {category.name}
                            </Link>
                        </li>
                        )}
                    </ul>
                </nav>
                <div className="header-content">
                    <img src={logo} alt="logo" className="logo"/>
                    <div className="header-aside">
                        <Switcher/>
                        <div className="minicart-toggler" ref={this.references[0]} onClick={this.opener}>
                            <img src={cartIcon} alt="cart"/>
                            {count!==0 && <span className="cart-counter">{count}</span>}
                            {this.state.opened && <Minicart innerRef={this.references[1]}/>}
                        </div>
                    </div>
                </div>
                </div>
            </header>
        )
    }
}

const stateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        selectedCateg: state.categoryReducer.selected,
        count: state.cartReducer.totalQuantity,
    }
}

const dispatchToProps = {
    fetchCurrencies,
    fetchCategories,
    selectCategories,
    setCategoryError,
    selectCurrency
}

export default connect(stateToProps, dispatchToProps)(Header)
import React from "react";
import { connect } from "react-redux";
import { addTotalPrices, cartProductAdaptor} from "./services/cartService";
import {loadProductInfo, setProductsError, addProduct} from "./redux/actions";
import "./styles/products.css"
import { attributeAdaptor, getAttributeProps, getData, productAdaptor } from "./services/productService";
import AttributeController from "./compoents/AttributeController";
import Flier from "./compoents/Flier";
import ErrorPage from "./compoents/ErrorPage"
import Loader from "./compoents/Loader"

class PopupProduct extends React.Component {

    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.state = {
            activeAnimation: false
        }
    }

    componentDidMount() {
        const {client, selected, loadProductInfo} = this.props
        
        getData(selected, client)
        .then(data=> {
            if(data.product) {
                loadProductInfo(productAdaptor(data.product, this.props.products))
            }
        })
        .catch((error) => {
            this.props.setProductsError(error.message)
        })
        document.addEventListener("mouseup", this.closer)
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.closer)
    }

    closer = (e) => {
        if(this.ref.current && !this.ref.current.contains(e.target)) {
            this.props.opener()  
        }
    }

    adder = () => {
        const {addProduct, cartProducts, selected, products} = this.props
        const product = products.find(product => product.id === selected)
        const newProducts = cartProductAdaptor(product, cartProducts)
        const totalPrices = addTotalPrices(this.props.totalPrices, product)
        addProduct(newProducts, totalPrices)
        this.animatioHandler()
    }

    animatioHandler = () => {
        this.setState({activeAnimation: true})
        setTimeout(()=>this.setState({activeAnimation: false}), 500)
    }

    handler = ({attributeName, index})=> {
        const {loadProductInfo, products, selected} = this.props
        const newProducts = attributeAdaptor(attributeName, index, products, selected)
        loadProductInfo(newProducts)
    }
   
    render() {
        const {products, selected, currency, error} = this.props
        const {handler} = this
        const product = products&&products.find(i => i.id === selected)
        const price = product&&product.prices[currency]
        return(
            <section className="popup" ref={this.ref}>
                {product.attributes && !error ?
                <>
                    <span onClick={this.props.opener} className="popup-closer">X</span>
                    <div className="popup-container">
                        <Flier shown = {this.state.activeAnimation}>
                            <img src={product.gallery[0]} alt="flier"/>
                        </Flier>
                        <img src = {product.gallery[0]} alt={product.name}/>
                        <div className="popup-content">
                            <h1>{product.brand}</h1>
                            <h1 className="product-title">{product.name}</h1>
                            {product.attributes.map(attribute =>
                                    <div key={attribute.name} className="product-attributes">  
                                        <h3 className="attribute-title">{attribute.name}</h3>
                                        <AttributeController
                                        {...getAttributeProps({product,
                                            attributeName:attribute.name,
                                            elements:attribute.items,
                                            separate:false,
                                            handler})
                                        }/>
                                    </div>
                            )}
                            <p className="attribute-title">Price:</p>
                                <p className="price">
                                    <b>
                                        {price.currency.symbol}{price.amount}
                                    </b>
                                </p>
                            <button className="to-cart-button" onClick={this.adder}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </>:
                !error ?
                <Loader/>:
                <ErrorPage message={error}/>}
            </section>
        )
    }
}

const stateToProps = (state) => {
    return {
        products: state.productsReducer.products,
        selected: state.productsReducer.selected,
        cartProducts: state.cartReducer.products,
        totalPrices: state.cartReducer.totalPrices,
        currency: state.currencyReducer.selected,
        error: state.productsReducer.error
    }
}

const dispatchToProps = {
    loadProductInfo,
    setProductsError,
    addProduct
}


export default connect(stateToProps, dispatchToProps)(PopupProduct)
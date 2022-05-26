import React from "react";
import { connect } from "react-redux";
import {loadProductInfo, addProduct, selectProduct, setProductsError} from "./redux/actions"
import DOMPurify from "dompurify"
import AttributeController from "./compoents/AttributeController";
import {productAdaptor, getAttributeProps, getData, attributeAdaptor} from "./services/productService"
import { Link } from "react-router-dom";
import { addTotalPrices, cartProductAdaptor} from "./services/cartService";
import NotFound from "./compoents/NotFound";
import ErrorPage from "./compoents/ErrorPage";
import Loader from "./compoents/Loader";
import Scroller from "./compoents/Scroller";
class Product extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            exist: true
        }
    }

    componentDidMount() {
        const {client, selected, selectProduct, loadProductInfo} = this.props
        
        getData(selected, client)
        .then(data=> {
            if(!data.product) {
                this.setState({exist: false})
            } else {
                selectProduct(data.current)
                loadProductInfo(productAdaptor(data.product, this.props.products))
            }
        })
        .catch((error) => {
            this.props.setProductsError(error.message)
        })
    }
    
    componentDidUpdate() {
        const {products} = this.props
        sessionStorage.setItem("attributes", JSON.stringify(products))
    }

    handler = ({attributeName, index})=> {
        const {loadProductInfo, products, selected} = this.props
        const newProducts = attributeAdaptor(attributeName, index, products, selected)
        loadProductInfo(newProducts)
    }

    adder = () => {
        const {addProduct, cartProducts, selected, products} = this.props
        const product = products.find(product => product.id === selected)
        const newProducts = cartProductAdaptor(product,cartProducts)
        const totalPrices = addTotalPrices(this.props.totalPrices, product)
        addProduct(newProducts, totalPrices)
    }

    render() {
        const {products, selected, currency, error} = this.props
        const {handler} = this
        const product = products.find(product => product.id === selected)
        const price = product && product.prices[currency]
        return(
            this.state.exist && !error ? 
            product && product.attributes ? 
            <section className="main-container">
                <div className="product-container">
                    <div className="product-view">
                        <AttributeController
                        {...getAttributeProps({product,
                            attributeName:"image",
                            elements:product.gallery,
                            separate: true,
                            handler})}/>
                    </div>
                    <div className="product-content">
                        <h1>{product.name}</h1>
                        <h3 className="brand">{product.brand}</h3>
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
                        <div>
                            <p className="attribute-title">Price:</p>
                            <p className="price">
                                <b>
                                    {price.currency.symbol}{price.amount}
                                </b>
                            </p>
                        </div>
                        {product.inStock ? 
                        <Link className="to-cart-button" onClick={this.adder} to="../../cart">
                            Add to cart
                        </Link>:
                        <button className="disable">Not in Stock</button>}
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}
                        className="description"/>
                    </div>
                </div>
                <Scroller/>
            </section>:
            <Loader/>:
            error ?
            <ErrorPage message={error}/>:
            <NotFound/>
        )
    }
}

const stateToProps = (state) => {
    return {
        selected: state.productsReducer.selected,
        products: state.productsReducer.products,
        cartProducts: state.cartReducer.products,
        currency: state.currencyReducer.selected,
        totalPrices: state.cartReducer.totalPrices,
        error: state.productsReducer.error
    }
}

const dispatchToProps = {
    loadProductInfo,
    addProduct,
    selectProduct,
    setProductsError
}


export default connect(stateToProps, dispatchToProps)(Product)
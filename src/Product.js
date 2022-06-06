import React from "react";
import { connect } from "react-redux";
import {loadProductInfo, addProduct, selectProduct, setProductsError} from "./redux/actions"
import DOMPurify from "dompurify"
import AttributeController from "./compoents/AttributeController";
import {productAdaptor, getAttributeProps, getData, attributeAdaptor} from "./services/productService"
import { addTotalPrices, cartProductAdaptor} from "./services/cartService";
import NotFound from "./compoents/NotFound";
import ErrorPage from "./compoents/ErrorPage";
import Loader from "./compoents/Loader";
import Scroller from "./compoents/Scroller";
import Flier from "./compoents/Flier";
class Product extends React.Component {

    constructor(props) {
        super(props)
        this.product = null
        this.state = {
            exist: true,
            showAnimation: false
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
        const {products, selected} = this.props
        const product = products.find(product => product.id === selected)
        sessionStorage.setItem("attributes", JSON.stringify(product))
    }

    handler = ({attributeName, index})=> {
        const {loadProductInfo, products, selected} = this.props
        const newProducts = attributeAdaptor(attributeName, index, products, selected)
        loadProductInfo(newProducts)
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
        this.setState({showAnimation: true})
        setTimeout(()=>this.setState({showAnimation: false}), 500)
    }

    render() {
        const {currency, error, selected, products} = this.props
        const {handler} = this
        const product = products.find(product => product.id === selected)
        const price = product && product.prices[currency]
        return(
            this.state.exist && !error ? 
            product && product.attributes ? 
            <section className={this.props.className}>
                <div className="product-container">
                    <div className="product-view">
                        <Flier shown = {this.state.showAnimation}>
                            <img src={product.gallery[0]} alt="flier"/>
                        </Flier>
                        <AttributeController
                        {...getAttributeProps({product,
                            attributeName:"image",
                            elements:product.gallery,
                            separate: true,
                            handler})}/>
                    </div>
                    <div className="product-content">
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
                        <div>
                            <p className="attribute-title">Price:</p>
                            <p className="price">
                                <b>
                                    {price.currency.symbol}{price.amount}
                                </b>
                            </p>
                        </div>
                        <div className="product-controlls">
                            {product.inStock ? 
                            <button className="to-cart-button" onClick={this.adder}>
                                Add to cart
                            </button>:
                            <button className="disable">Not in Stock</button>}
                            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}
                            className="description"/>
                        </div>
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
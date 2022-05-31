import React, { Suspense } from "react";
import { connect } from "react-redux";
import ErrorPage from "./compoents/ErrorPage";
import NotFound from "./compoents/NotFound";
import {loadProductInfo, setProductsError, selectCategories, addProduct} from "./redux/actions"
import { fetchProducts} from "./services/productService";
import Loader from "./compoents/Loader";
import "./styles/products.css"
import Scroller from "./compoents/Scroller";

class Category extends React.Component {

    constructor(props) {
        super(props)
        this.loading = false
        this.name = null
        this.state = {
            chosen: -1
        }
    }

    shouldComponentUpdate(props) {
        if(props.name !==this.name) {
            return true
        }
        return false
    }

    componentDidMount() {
        this.loader()
    }

    componentDidUpdate() {
        if(this.loading) {
            this.loading = false
            this.name=this.props.name
        } else {
            this.loader()
        }
    }
    
    checker = () => {
        const {categories} = this.props
        const current = window.location.pathname.split("/")[1]
        for(let category of categories) {
            if(category.name === current) {
                return true
            }
        }
        return 
    }

    loader = () => {
        const {loadProductInfo, client, name, setProductsError} = this.props
        if(this.props.error) {
            return
        }
        fetchProducts(name, client)
        .then(response=>{
            loadProductInfo(response.data.category.products)
            this.loading = true
        })
        .catch(error=>{
            setProductsError(error.message)
            this.loading = true
        })
    }

    importItem = (product) => {
        const Item = React.lazy(()=>import("./compoents/Item"))
        return (
            <li key={product.id}>
                <Item item={product} choser={this.props.opener}/>
            </li>
        )
    }

    render() {
        const {error, products, categories, selected} = this.props
        return(
            this.checker() && !error ?
            products.length !== 0 ?
            <section>
                
                <div className="main-container">
                    <h1 className="title">{categories[selected].name}</h1>
                    <ul className="products-gallery">
                        <Suspense fallback = {<Loader/>}>
                            {products.map((product) => this.importItem(product))}
                        </Suspense>
                    </ul>
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
        products: state.productsReducer.products,
        categories: state.categoryReducer.categories,
        error: state.productsReducer.error,
        selected: state.categoryReducer.selected,
        cartProducts: state.cartReducer.products,
        totalPrices: state.cartReducer.totalPrices
    }
}

const dispatchToProps = {
    loadProductInfo,
    setProductsError,
    selectCategories,
    addProduct
}

export default connect(stateToProps, dispatchToProps)(Category)
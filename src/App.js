import React from "react";
import { ApolloConsumer } from "@apollo/client";
import Category from "./Category";
import Header from "./Header";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Product from "./Product";
import Cart from "./Cart";
import {loadCart, selectCategories} from "./redux/actions"
import NotFound from "./compoents/NotFound";
import ErrorPage from "./compoents/ErrorPage";
import Loader from "./compoents/Loader";
import "./styles/app.css"
import { getCategoryIndex } from "./services/categoryService";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.position = 0
    this.state = {
      loading: true,
      cover: false
    }
  }

  componentDidMount() {
    const cartItems = JSON.parse(sessionStorage.getItem("cart"))
    cartItems && this.props.loadCart(cartItems)
  }

  componentDidUpdate() {
    window.scrollTo({top:this.position})
    const {selectedCateg, selectCategories, categories} = this.props
    if(categories.length!==0) {
      const index = getCategoryIndex(categories, selectedCateg)
      if(index !== -1 && index !== selectedCateg) {
        selectCategories(index)
      }
      if(this.state.loading) {
        this.setState({loading:false})
      }
    }
  }

  coverer = () => {
    if(!this.state.cover) {
      this.position = window.scrollY
    } 
    this.setState({cover: !this.state.cover})
    
  }

  render() {
    const {headerError, categories, selectedCateg} = this.props
    const transform = this.state.cover&& `translate(0px,${-this.position}px)`
    return (
      <>
        {this.state.cover && <div className="shadow"/>}
        <ApolloConsumer>
          {client  =>
          <div className={this.state.cover ? "no-scroll":""}>
            <Header client={client} handler={this.coverer}/>
            {!this.state.loading && !headerError && selectedCateg!==-1 ?
            <main style = {{transform}}>
              <Routes>
                <Route index element = {<Navigate to={categories[0].name}/>}/>
                <Route path={"/:category"}>
                  <Route index element = {<Category name = {categories[selectedCateg].name} client = {client}/>}/>
                  <Route path="/:category/:id" element = {<Product client={client}/>}/>
                  <Route path="/:category/:id/*" element = {<NotFound/>}/> 
                </Route>
                <Route path="/cart" element={<Cart/>}/>
              </Routes>
            </main>:
            !this.state.loading && !headerError?
            <NotFound/>:
            !headerError ?
            <Loader/>:
            <ErrorPage message={headerError}/>}
          </div>}
        </ApolloConsumer>
      </>
    )
  }
}

const stateToProps = (state) => {
  return {
    selectedCateg: state.categoryReducer.selected,
    categories: state.categoryReducer.categories,
    headerError: state.categoryReducer.error
  }
}

const dispatchToProps = {
  loadCart,
  selectCategories
}


export default connect(stateToProps, dispatchToProps)(App);

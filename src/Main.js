import React from "react";
import Category from "./Category";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Product from "./Product";
import Cart from "./Cart";
import {selectCategories} from "./redux/actions"
import NotFound from "./compoents/NotFound";
import "./styles/app.css"
import { getCategoryIndex } from "./services/categoryService";
import Loader from "./compoents/Loader";

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.position = 0
    this.state = {
      popup: false,
      loading: true
    }
  }

  componentDidUpdate() {
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

  render() {
    const {categories, selectedCateg, client} = this.props
    
    return (
        !this.state.loading && selectedCateg !== -1 ?
        <>
            <Routes>
                <Route index element = {<Navigate to={categories[0].name}/>}/>
                <Route path={"/:category"}>
                <Route index element = {
                    <Category  name = {categories[selectedCateg].name}
                        client = {client}
                        opener = {this.props.opener}/>
                    }/>
                <Route path="/:category/:id" element = {
                    <Product client={client} className = "main-container"/>
                }/>
                <Route path="/:category/:id/*" element = {<NotFound/>}/> 
                </Route>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>:
        this.state.loading?
        <Loader/>:
        <NotFound/>
    )
  }
}

const stateToProps = (state) => {
  return {
    selectedCateg: state.categoryReducer.selected,
    categories: state.categoryReducer.categories
  }
}

const dispatchToProps = {
  selectCategories
}

export default connect(stateToProps, dispatchToProps)(Main);
import React from "react";
import { connect } from "react-redux";
import {setAttribute} from "../redux/actions"
import ImageSwiper from "./ImageSwiper";


class AttributeController extends React.Component {

    getIndex = () => {
        const {index} = this.props
        let productIndex = 0
        if(index === -1) {
            const product = this.props.products.find(product => product.id === this.props.selected)
            productIndex = this.props.products.indexOf(product)
        } else {
            productIndex = index
        }
        return productIndex
    }
    
    generatePanel = () => {
        const {currentAttribute, attributeName, pattern} = this.props
        let productIndex = this.getIndex()
        if(this.props.elements) {
            return this.props.elements.map((element, index) => 
            <li onClick={()=>this.props.handler({attributeName, index, productIndex})}
                key={index}
                className={index === currentAttribute ? "active": null}>
                {pattern(element)}
            </li>)
        } else {
            return null
        }
    }

    generateSwiperPanel() {
        const gallery = this.generatePanel()
        if(gallery.length > 4) {
            return <ImageSwiper gallery = {gallery} amount = {4}/>
        }
        return gallery
    }
   
    render() {
        return(
                this.props.separate ?
                <>
                    <ul className="vertical-list">
                        {this.generateSwiperPanel()} 
                    </ul>
                    <div className="current-display">
                        {this.props.pattern(this.props.elements[this.props.currentAttribute])}
                    </div>
                </>:
                <ul className="attribute-list">
                    {this.generatePanel()} 
                </ul>
        )
    }
}

const stateToProps = (state) => {
    return {
        selected: state.productsReducer.selected,
        products: state.cartReducer.products,
    }
}

const dispatchToProps = {
    setAttribute
}


export default connect(stateToProps, dispatchToProps)(AttributeController)
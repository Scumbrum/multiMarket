import React from "react";
import { connect } from "react-redux";
import {selectCurrency} from "../redux/actions"


class Item extends React.Component {

    componentDidMount() {
        document.addEventListener("click", this.unsetter)
    }

    unsetter = (e) => {
        e.target !== this.ref.current && this.setState({opened:false})
    }

    componentWillUnmount(){
        document.removeEventListener("click", this.unsetter)
    }

    constructor(props) {
        super(props)
        this.state = {
            opened: false
        }
        this.ref = React.createRef()
    }
    
    opener = () => {
        this.setState({opened:!this.state.opened})
    }
   
    render() {
        const {currencies, selectedCurr, selectCurrency} = this.props
        return(
                currencies.length !== 0 &&
                <div className="switcher">  
                    <span onClick={this.opener} ref={this.ref}
                    className = {`toggler ${this.state.opened ? "active" : ""}`}>
                        {currencies[selectedCurr].symbol}
                    </span>
                    {this.state.opened &&
                    <div className="switcher-body">
                        {currencies.map((currency,index) => 
                            <p value={index} key={currency.label} onClick={()=>selectCurrency(index)}>
                                <i>{currency.symbol}</i>
                                <span>{currency.label}</span>
                            </p>)}
                    </div>}
                </div>
            
        )
    }
}

const stateToProps = (state) => {
    return {
        currencies: state.currencyReducer.currencies,
        selectedCurr: state.currencyReducer.selected
    }
}

const dispatchToProps = {
    selectCurrency
}


export default connect(stateToProps, dispatchToProps)(Item)
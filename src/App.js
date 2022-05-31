import React from "react";
import { ApolloConsumer } from "@apollo/client";
import Header from "./Header";
import { connect } from "react-redux";
import {loadCart} from "./redux/actions"
import ErrorPage from "./compoents/ErrorPage";
import "./styles/app.css"
import Main from "./Main";
import PopupProduct from "./PopupProduct";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.position = 0
    this.state = {
      loading: true,
      cover: false,
      popup: false
    }
  }

  componentDidMount() {
    const cartItems = JSON.parse(sessionStorage.getItem("cart"))
    if(cartItems) {
      this.props.loadCart(cartItems)
    }
  }

  componentDidUpdate() {
    window.scrollTo({top:this.position})
  }

  coverer = () => {
    if(!this.state.cover) {
      this.position = window.scrollY
    }
    this.setState({cover: !this.state.cover})
  }

  opener = () => {
    this.setState({popup: !this.state.popup})
    this.coverer()
  }

  render() {
    const {headerError} = this.props
    const transform = this.state.cover &&`translate(0px,${-this.position}px)`
    return (
      <ApolloConsumer>
        {client  =>
        <div className={this.state.cover ? "no-scroll":""}>
          <Header client={client} handler={this.coverer}/>
          {this.state.cover && <div className="shadow"/>}
          {!headerError?
          <>
            <main style = {{transform}}>
              <Main client={client} opener={this.opener}/>
            </main>
            {this.state.popup && 
              <PopupProduct client={client} opener={this.opener}/>
            }
          </>:
          <ErrorPage message={headerError}/>}
        </div>}
      </ApolloConsumer>
    )
  }
}

const stateToProps = (state) => {
  return {
    headerError: state.categoryReducer.error
  }
}

const dispatchToProps = {
  loadCart
}

export default connect(stateToProps, dispatchToProps)(App);
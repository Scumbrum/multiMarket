import React from "react";


class Scroller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showScroller: false
        }
    }

    componentDidMount() {
        
        window.addEventListener("wheel", this.listener)
    }

    componentWillUnmount() {
        window.removeEventListener("wheel", this.listener)
    }

    listener = () => {
        if(window.scrollY>100 && !this.state.showScroller) {
            this.setState({showScroller: true})
        }
        if(window.scrollY<200 && this.state.showScroller) {
            this.setState({showScroller: false})
        }
    }

    toTop = () => {
        this.setState({showScroller: false})
        let height = window.scrollY
        const amount = height/15
        const interval = window.setInterval(() => {
            height -= amount
            window.scrollTo({top:height})
            if(height <= 0) {
                window.clearInterval(interval)
            }
        },25)
    }
   
    render() {
        return(
            this.state.showScroller &&
            <button onClick={this.toTop} className="scroller"/>
        )
    }
}


export default Scroller
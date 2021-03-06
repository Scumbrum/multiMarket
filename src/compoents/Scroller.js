import React from "react";


class Scroller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showScroller: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.listener)
    }

    componentWillUnmount() {
        window.addEventListener("scroll", this.listener)
    }

    listener = () => {
        if(window.scrollY>150 && !this.state.showScroller) {
            this.setState({showScroller: true})
        }
        if(window.scrollY<=150 && this.state.showScroller) {
            this.setState({showScroller: false})
        }
    }

    toTop = () => {
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
            <div className="scroller-container" onClick={this.toTop}>
                <button className="scroller"/>
            </div>
        )
    }
}


export default Scroller
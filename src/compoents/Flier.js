import React from "react";
import { calculateTrack } from "../services/productService";


class Flier extends React.Component {

    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.dif = [0,0]
    }

    componentDidMount() {
        window.addEventListener("scroll", this.listener)
        if(this.ref.current) {
            this.dif = calculateTrack(this.ref.current)
        }
    }
    
    componentDidUpdate() {
        this.componentDidMount()
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.listener)
    }

    listener = () => {
        this.dif = calculateTrack(this.ref.current)
    }
   
    render() {
        const {dif} = this
        const {shown, children} = this.props
        const transform = shown && `translate(${dif[0]}px,${-dif[1]}px) scale(.1)`
        return(
            <div className={`flier-container ${shown && "active"}`} 
            style={{transform}}
            ref={this.ref}>
                {children}
            </div>
        )
    }
}


export default Flier
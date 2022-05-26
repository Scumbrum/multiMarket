import React from "react";


class ImageSwiper extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }

    swipe = (e,direction) => {
        
        
        const {gallery} = this.props
        let pos = this.state.current
        if(pos+direction === gallery.length) {
            pos = 0
        } else if(pos+direction === -1) {
            pos = gallery.length -1
        } else {
            pos+=direction
        }
        this.setState({current:pos})
    }

    getIMages = () => {
        const {gallery, amount} = this.props
        const {current} = this.state
        return gallery.filter((_, index) => index >= current && index < amount + current)
    }

   
    render() {
        
        return(
            <div className="swiper">
                {this.getIMages()}
                <div className="controlls">
                    <span onClick={(e)=> this.swipe(e,-1)} className="left">{"<"}</span>
                    <span onClick={(e)=> this.swipe(e,1)} className="right">{">"}</span>
                </div>
            </div>
        )
    }
}


export default ImageSwiper
import React from "react";



class ImageSwiper extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }

    swipe = (direction) => {
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
        const {gallery, amount} = this.props
        return(
            <div className="swiper">
                {this.getIMages()}
                {gallery.length > amount && 
                <div className="controlls">
                    <span onClick={()=> this.swipe(-1)} className="left">
                        <i className="left-arrow"/>
                    </span>
                    <span onClick={()=> this.swipe(1)} className="right">
                        <i className="right-arrow"/>
                    </span>
                </div>
                }
            </div>
        )
    }
}


export default ImageSwiper
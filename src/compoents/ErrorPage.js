import React from "react";


class ErrorPage extends React.Component {
   
    render() {
        const {message} = this.props
        return(
            <section>
                <h1 className="error">{message}:(</h1>
            </section>
        )
    }
}


export default ErrorPage
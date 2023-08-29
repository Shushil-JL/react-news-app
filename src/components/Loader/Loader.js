import React, { Component } from 'react'
import './Loader.css'

export class Loader extends Component {
    render() {
        return (
            <div className="loadingPage">
                <div className="loadingCircle"></div>
            </div>
        )
    }
}

export default Loader
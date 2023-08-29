import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export class NotFound extends Component {
    render() {
        return (
            <div className="notFound">
                <div className="notFoundContainer">
                    <h3>Page Not Found !</h3>
                    <Link to="/">
                        <h4>Go to Home</h4>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotFound

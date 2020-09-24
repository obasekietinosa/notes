import React, { Component } from 'react'
import "./Quote.css"

export default class Quote extends Component {
    render() {
        return (
            <div className="Quote">
                <div className="quote-body">
                    <h3>
                        “{ this.props.body }”
                    </h3>
                    <p>
                        — { this.props.author }
                    </p>
                </div>
                <div className="text-center">
                    <a 
                        href={
                            "https://twitter.com/intent/tweet?text=" 
                            + encodeURIComponent(this.props.body) + 
                            " ⁠— " + 
                            encodeURIComponent(this.props.author) + 
                            "&url=https://quotes.etin.space"
                        } 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Share This Quote <i className="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
        )
    }
}

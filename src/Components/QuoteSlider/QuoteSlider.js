import React, { Component } from 'react'
import base from '../../base'
import './QuoteSlider.css'
import Quote from '../Quote/Quote';
import Loading from '../Loading/Loading';

export default class QuoteSlider extends Component {
    state = {
        quotes: [],
        currentQuote: {
            body: "",
            url: "",
            author: ""
        },
        quotesLoaded: false
    }

    componentDidMount() {
        this.ref = base.syncState('quotes', {
            context: this,
            state: 'quotes',
            then: function () {
                this.setState({
                    quotesLoaded: true
                })
            }
        });
    }

    selectQuote = (x) => {
        this.setState({
            currentQuote: Object.values(this.state.quotes)[x]
        })
    }

    timer = setInterval(() => {
        this.selectQuote(
            Math.floor(Math.random()*Object.values(this.state.quotes).length)
        )
    }, 10000);

    render() {
        return this.state.quotesLoaded ? (
            <div className="QuoteSlider">
                <Quote 
                    body={this.state.currentQuote.body} 
                    author={this.state.currentQuote.author} 
                    url={this.state.currentQuote.url} 
                />
            </div>
        ) : <Loading />
    }
}

import React, { Component } from 'react'
import Quote from '../Quote/Quote';
import base from '../../base';
import "./QuotesList.css";
import Loading from '../Loading/Loading';


export default class QuotesList extends Component {
    state = {
        quotes: [],
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
    render() {
        let quotes = this.state.quotes.map(function (quote, index) {
            return <Quote key={ index } author={ quote.author } body={ quote.body } />
        })
        return this.state.quotesLoaded ? (
            <div className="QuotesList">
                    {quotes}
            </div>
        ) : <Loading />
    }
}

import React, { Component } from 'react'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

import 'highlight.js/styles/atelier-estuary-dark.css'

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);

export default class SyntaxHighlight extends Component {
    constructor(props) {
        super(props)
        this.nodeRef = React.createRef()
    }

    componentDidMount() {
        this.highlight()
    }

    componentDidUpdate() {
        this.highlight()
    }

    highlight = () => {
        if (this.nodeRef) {
            const nodes = this.nodeRef.current.querySelectorAll('pre')
            nodes.forEach((node) => {
                hljs.highlightBlock(node)
            })
        }
    }

    render() {
        const { content } = this.props
        return (
            <div ref={this.nodeRef} dangerouslySetInnerHTML={{ __html: content }} />
        );
    }
}

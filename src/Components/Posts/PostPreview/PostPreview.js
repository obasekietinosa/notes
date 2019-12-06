import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './PostPreview.css'

export default class PostPreview extends Component {
  render() {
    return (
      <div className="PostPreview">
        <h3 className="mb-0">
          {this.props.title}
        </h3>
        <p className="mt-0">
          <small>
            {
              new Date(this.props.datePublished).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }
          </small>
        </p>
        <span>
          {this.props.category}
        </span>
        <div dangerouslySetInnerHTML={{ __html: this.props.excerpt }}>
        </div>
        <div>
          <Link to={this.props.link} className="btn btn-primary">
            Read Now
          </Link>
        </div>
      </div>
    )
  }
}

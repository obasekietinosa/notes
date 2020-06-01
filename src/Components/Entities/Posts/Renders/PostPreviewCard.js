import React, { Component } from 'react'
import { Link } from "react-router-dom"
import PostDate from './PostDate'

export default class PostPreviewCard extends Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.post.image} className="card-img-top" alt={this.props.post.title} />
        <div className="card-body">
          <span>
            {this.props.post.category}
          </span>
          <h5 className="card-title" dangerouslySetInnerHTML={{ __html: this.props.post.title }}></h5>
          <p className="card-subtitle">
            WetalkSound - <PostDate date={this.props.post.datePublished} />
          </p>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: this.props.post.excerpt }}>
          </div>
          <Link to={this.props.post.link}>
            Read More
            </Link>
        </div>
      </div>
    )
  }
}

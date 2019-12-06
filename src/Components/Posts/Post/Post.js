import React, { Component, Fragment } from 'react'
import './Post.css'
import BlogService from '../../../Services/BlogService'
import Loading from '../../Loading/Loading'
import Helmet from 'react-helmet'

export default class Post extends Component {
  constructor() {
    super();
    this.blogService = new BlogService()
    this.state = {
      postLoaded: false,
      post: {
        title: {
          rendered: ""
        },
        content: {
          rendered: ""
        }
      }
    };
  }

  componentDidMount() {
    if (!this.state.postLoaded) {
      this.getPost(this.props.match.params.slug);
    }
  }

  getPost = (slug) => {
    this.blogService.getPostBySlug(slug)
      .then(data => {
        console.log(data)
        let post = data
        let postLoaded = true
        this.setState({ post, postLoaded, error: "" })
      })
      .catch(error => this.setState({ error: "There was an error fetching post. Please try again." }))
  }

  render() {
    return (
      <Fragment>
        {
          this.state.postLoaded ?
            (
              <div className="Post">
                <Helmet>
                  <title>{ this.state.post.title.rendered } - Etin's Notes</title>
                  <meta name="description" content={ this.state.post.excerpt.rendered } />
                </Helmet>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-10 offset-1 offset-md-3 col-md-6">
                      <h1
                        className="text-center"
                        dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}
                      >
                      </h1>
                      <div
                        className="wp-content"
                        dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : <Loading />
        }
      </Fragment>
    )
  }
}

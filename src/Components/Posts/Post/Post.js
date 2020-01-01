import React, { Component, Fragment } from 'react'
import './Post.css'
import BlogService from '../../../Services/BlogService'
import Loading from '../../Loading/Loading'
import Helmet from 'react-helmet'
import PostDate from '../PostDate'
import PostAuthor from '../PostAuthor'

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
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-10 offset-1 offset-md-3 col-md-6">
                                <h1
                                    dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}
                                >
                                </h1>
                                <p>
                                    <small>
                                        <PostDate date={this.state.post.date} />
                                    </small>
                                </p>
                                <PostAuthor 
                                    author={
                                        {
                                            name: this.state.post._embedded.author[0].name,
                                            slug: this.state.post._embedded.author[0].slug,
                                            avatar: this.state.post._embedded.author[0].avatar_urls[96],
                                        }
                                    } 
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-10 offset-1 offset-md-3 col-md-6">
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

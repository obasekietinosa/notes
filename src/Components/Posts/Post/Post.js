import React, { Component, Fragment } from 'react'
import './Post.css'
import BlogService from '../../../Services/BlogService'
import Loading from '../../Loading/Loading'
import Helmet from 'react-helmet'
import PostDate from '../PostDate'
import PostAuthor from '../PostAuthor'
import SocialShare from '../../SocialShare/SocialShare'
import SyntaxHighlight from '../../Utilities/SyntaxHighlight/SyntaxHighlight'
import Default from '../../Default/Default'
import BlogContext from '../../Contexts/BlogContext';

export default class Post extends Component {
  constructor() {
    super();
    this.blogService = new BlogService()
    this.state = {
      status: "POST_LOADING",
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

  static contextType = BlogContext

  componentDidMount() {
    console.log(this.context)
    this.context.getPost(this.props.match.params.slug)
  }

  componentDidUpdate() {
    console.log(this.context)
    if(this.state.postLoaded) {
      return
    }
    if (this.context.currentPost?.slug === this.props.match.params.slug) {
      this.setState({ post: this.context.currentPost, postLoaded: true, status: "POST_LOADED" })
      return
    }
    else if (this.context.notFound) {
      this.setState({ status: "POST_NOT_FOUND", postLoaded: true })
    }
  }

  render() {
    let content = null
    let status = "POST_LOADING"

    if (this.context.currentPost?.slug === this.props.match.params.slug) {
      status = "POST_LOADED"
    }
    else if (this.context.notFound) {
      status: "POST_NOT_FOUND"
    }

    switch (this.state.status) {
      case "POST_LOADING":
        content = <Loading />
        break;
      case "POST_LOADED":
        content =
          <div className="Post">
            <Helmet>
              <title>{this.state.post.title.rendered} - Etin's Notes</title>
              <meta name="description" content={this.state.post.excerpt.rendered} />
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
                  <div className="wp-content">
                    <SyntaxHighlight content={this.state.post.content.rendered} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10 offset-1 offset-md-3 col-md-6">
                  <SocialShare text={"Read " + this.state.post.title.rendered + " on Etin's Notes"} url={window.location.href} tag={"#EtinNotes"} />
                </div>
              </div>
            </div>
          </div>
        break;
      case "POST_NOT_FOUND":
        content = <Default />
        break
      default:
        break;
    }
    return (
      <Fragment>
        { content }
      </Fragment>
    )
  }
}

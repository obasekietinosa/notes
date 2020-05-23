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
import ScrollToTop from '../../Utilities/Routing/ScrollToTop'

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

  render() {
    let content = null
    let status = "POST_LOADING"
    let post = {}

    if (this.context.currentPost?.slug === this.props.match.params.slug) {
      post = this.context.currentPost
      status = "POST_LOADED"
    }
    else if (this.context.notFound) {
      status = "POST_NOT_FOUND"
    }
    else{
      this.context.getPost(this.props.match.params.slug)
    }

    switch (status) {
      case "POST_LOADING":
        content = <Loading />
        break;
      case "POST_LOADED":
        content =
          <div className="Post">
            <Helmet>
              <title>{post.title.rendered} - Etin's Notes</title>
              <meta name="description" content={post.excerpt.rendered} />
              <meta property="og:title" content={`${post.title.rendered} - Etin's Notes`} />
              <meta property="og:description" content={post.excerpt.rendered} />
              <meta property="og:image" content={`https://services.etin.space/notes/generate-image/?title=${encodeURI(post.title.rendered)}`} />
              <meta property="og:url" content={`https://notes.etin.space/posts/${post.slug}`} />
              <meta name="twitter:title" content={`${post.title.rendered} - Etin's Notes`} />
              <meta name="twitter:description" content={post.excerpt.rendered} />
              <meta name="twitter:image" content={`https://services.etin.space/notes/generate-image/?title=${encodeURI(post.title.rendered)}`} />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <header>
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 offset-md-3 col-md-6">
                    <h1
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    >
                    </h1>
                    <p>
                      <small>
                        <PostDate date={post.date} />
                      </small>
                    </p>
                    <PostAuthor
                      author={
                        {
                          name: post._embedded.author[0].name,
                          slug: post._embedded.author[0].slug,
                          avatar: post._embedded.author[0].avatar_urls[96],
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
                    <SyntaxHighlight content={post.content.rendered} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-10 offset-1 offset-md-3 col-md-6">
                  <SocialShare text={"Read " + post.title.rendered + " on Etin's Notes"} url={`https://notes.etin.space/posts/${post.slug}`} tag={"#EtinNotes"} />
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
        <ScrollToTop />
        { content }
      </Fragment>
    )
  }
}

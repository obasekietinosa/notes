import React, { Component } from 'react'
import './Posts.css'
import Loading from 'Components/Utilities/Loading/Loading';
import BlogService from 'Services/BlogService';
import BlogContext from 'Components/Contexts/BlogContext';

export default class PostList extends Component {
  
  constructor(props) {
    super(props);
    this.blogService = new BlogService()
    this.state = {
      postsLoaded: true,
      posts: []
    };
  }

  static contextType = BlogContext

  render() {
    let posts = this.context.posts ?? [];
    const Post = this.props.renderAs
    const Layout = this.props.layout.component
    return (
      <Layout {...this.props.layout.props} >
        {
          posts.map((post, key) => (
              <Post key={key} post={post} />
            )
          )
        }
      </Layout>
    )
  }
}

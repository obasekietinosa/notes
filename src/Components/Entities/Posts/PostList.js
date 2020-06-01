import React, { Component } from 'react'
import Loading from 'Components/Utilities/Loading/Loading';
import BlogContext from 'Components/Contexts/BlogContext';

export default class PostList extends Component {

  componentDidMount() {
    if (! this.context.postsLoaded) {
      this.context.getPosts(this.props.limit)
    }
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
              <Post 
                key={key}
                post={{
                  title: post.title.rendered,
                  datePublished: post.date,
                  image: post['_embedded']['wp:featuredmedia'][0]?.source_url,
                  category: post['_embedded']['wp:term'][0][0].name,
                  excerpt: post.excerpt.rendered,
                  link: "/posts/" + post.slug
                }}
             />
            )
          )
        }
      </Layout>
    )
  }
}

import React, { Component } from 'react'
import './Posts.css'
import Loading from '../Loading/Loading';
import BlogService from '../../Services/BlogService';
import PostPreview from './PostPreview/PostPreview';
import BlogContext from '../Contexts/BlogContext';

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
    let posts = this.context.posts
    return (
      <div className="Posts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 offset-1 offset-md-0 col-md-12">
              <h2 className="text-center">Case Notes</h2>
              {
                this.state.postsLoaded ?
                  (
                    <ol>
                      {
                        posts.map((post, key) => {
                          return (
                            <li key={key}>
                              <PostPreview
                                title={post.title.rendered}
                                category={post['_embedded']['wp:term'][0][0].name}
                                datePublished={post.date}
                                excerpt={post.excerpt.rendered}
                                link={"/posts/" + post.slug}
                              />
                            </li>
                          )
                        })
                      }
                    </ol>
                  )
                  : <Loading />
              }
            </div>
          </div>
        </div>
      </div>

    )
  }
}

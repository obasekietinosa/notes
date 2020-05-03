import React, { Component } from 'react'
import './Posts.css'
import Loading from '../Loading/Loading';
import BlogService from '../../Services/BlogService';
import PostPreview from './PostPreview/PostPreview';
import BlogContext from '../Contexts/BlogContext';

export default class PostList extends Component {
  
  constructor() {
    super();
    this.blogService = new BlogService()
    this.state = {
      postsLoaded: false,
      posts: []
    };
  }

  static contextType = BlogContext

  componentDidMount() {
    console.log(this.context)
    if (!this.context.length) {
      // this.getPosts()
      return
    }
    this.setState({ posts:this.context, postsLoaded: true, error: "" })
  }

  componentDidUpdate() {
    console.log(this.context)
    if (!this.context.length || this.state.posts.length) {
      return
    }
    this.setState({ posts:this.context, postsLoaded: true, error: "" })
  }

  getPosts = () => {
    this.blogService.getPosts()
      .then(data => {
        let posts = data
        let postsLoaded = true
        this.setState({ posts, postsLoaded, error: "" })
      })
      .catch(error => this.setState({ error: "There was an error fetching posts. Please try again." }))
  }

  render() {
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
                        this.state.posts.map((post, key) => {
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

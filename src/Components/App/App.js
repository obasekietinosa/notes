import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import Default from '../Default/Default';
import { BlogProvider } from '../Contexts/BlogContext';
import BlogService from '../../Services/BlogService';

class App extends Component {
  constructor() {
    super();
    this.blogService = new BlogService()
    this.state = {
      postsLoaded: false,
      posts: [],
      currentPost: null
    };
  }

  componentDidMount() {
    if (!this.props.posts) {
      this.getPosts();
    }
  }

  getPosts = () => {
    this.blogService.getPosts()
      .then(data => {
        console.log(data)
        let posts = data
        let postsLoaded = true
        this.setState({ posts, postsLoaded, error: "" })
      })
      .catch(error => this.setState({ error: "There was an error fetching posts. Please try again." }))
  }

  getPost = (slug) => {
    if(slug === this.state.currentPost?.slug) {
        return
    }

    for (let post of this.state.posts) {
        if(slug === post.slug) {
            this.setState({currentPost: post})
            return
        }
    }

    this.blogService.getPostBySlug(slug)
      .then(data => {
        if (!data) {
          this.setState({ notFound: true })
          return
        }
        console.log(data)
        let currentPost = data
        this.setState({ currentPost, error: "" })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <BlogProvider 
        value={ 
            {
                posts: this.state.posts,
                currentPost: this.state.currentPost,
                notFound: this.state.notFound,
                getPosts: this.getPosts,
                getPost: this.getPost,
            } 
        }
      >
        <div className="App">
          <BrowserRouter>
            <Navbar />
              <Switch>
                <Route exact path="/" >
                  <Home />
                </Route>
                <Route path="/posts">
                  <Posts />
                </Route>
                <Route component={ Default } />
              </Switch>
            </BrowserRouter>
        </div>
      </BlogProvider>
    );
  }
}

export default App;

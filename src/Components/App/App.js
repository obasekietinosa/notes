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
      posts: []
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

  render() {
    return (
      <BlogProvider value={ this.state.posts }>
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

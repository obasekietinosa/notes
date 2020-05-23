import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import { Switch, Route, BrowserRouter, StaticRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Default from '../Default/Default';
import { BlogProvider } from '../Contexts/BlogContext';
import BlogService from '../../Services/BlogService';
import Post from '../Posts/Post/Post';
import PostList from '../Posts/PostList';
import Helmet from 'react-helmet'

const AppRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>
      <Route exact path='/posts'>
        <PostList />
      </Route>
      <Route exact path='/posts/:slug' component={Post} />
      <Route component={Default} />
    </Switch>
  </>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.blogService = new BlogService()
    this.state = {
      postsLoaded: true,
      posts: this.props.initialState.posts,
      currentPost: this.props.initialState.currentPost
    };
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

  getPost = (slug) => {
    if (slug === this.state.currentPost?.slug) {
      return
    }

    for (let post of this.state.posts) {
      if (slug === post.slug) {
        this.setState({ currentPost: post })
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
        <Helmet>
          <title>Etin's Notes | A Blog By Etin Obaseki</title>
          <meta property="og:title" content="Etin's Notes | A Memoir by Etin Obaseki" />
          <meta property="og:description"
            content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta name="description" content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta property="og:image" content="%PUBLIC_URL%/icons/thumbnail.png" />
          <meta property="og:url" content="%PUBLIC_URL%" />
          <meta name="twitter:title" content="Etin's Notes | A Memoir by Etin Obaseki" />
          <meta name="twitter:description"
            content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta name="twitter:image" content="%PUBLIC_URL%/icons/thumbnail.png" />
          <meta property="og:site_name" content="Etin's Notes | A Memoir by Etin Obaseki" />
          <meta name="twitter:image:alt" content="Etin's Notes | A Memoir by Etin Obaseki" />
        </Helmet>
        <div className="App">
          {console.log("Location", this.props.location)}
          {
            this.props.location ?
              <StaticRouter location={this.props.location} >
                <AppRoutes />
              </StaticRouter>
              :
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
          }
        </div>
      </BlogProvider>
    );
  }
}

export default App;

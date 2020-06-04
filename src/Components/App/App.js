import React, { Component } from 'react';
import './App.css';
import Navbar from 'Components/Utilities/Layout/Navbar/Navbar';
import { Switch, Route, BrowserRouter, StaticRouter } from 'react-router-dom';
import HomePage from 'Components/Pages/HomePage/HomePage';
import AllPostsPage from 'Components/Pages/AllPostsPage/AllPostsPage';
import PostPage from 'Components/Pages/PostPage/PostPage';
import DefaultPage from 'Components/Pages/DefaultPage/DefaultPage';
import { BlogProvider } from 'Components/Contexts/BlogContext';
import BlogService from 'Services/BlogService';
import Helmet from 'react-helmet'
import Footer from 'Components/Utilities/Layout/Footer/Footer';

const AppRoutes = () => (
  <>
    <Navbar />
    <main>
      <Switch>
        <Route exact path="/" >
          <HomePage />
        </Route>
        <Route exact path='/posts'>
          <AllPostsPage />
        </Route>
        <Route exact path='/posts/:slug' component={PostPage} />
        <Route component={DefaultPage} />
      </Switch>
    </main>
    <Footer />
  </>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.blogService = new BlogService()
    this.state = {
      postsLoaded: true,
      posts: this.props.initialState.posts ?? [],
      currentPost: this.props.initialState.currentPost,
      categories: this.props.initialState.categories ?? [],
      categoriesLoaded: true
    };
  }

  getCategories = () => {
    this.blogService.getCategories()
      .then(data => {
        let categories = data
        let categoriesLoaded = true
        this.setState({ categories, categoriesLoaded, error: "" })
      })
      .catch(error => this.setState({ error: "There was an error fetching categories. Please try again." }))
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
            categories: this.state.categories,
            posts: this.state.posts,
            currentPost: this.state.currentPost,
            notFound: this.state.notFound,
            getPosts: this.getPosts,
            getCategories: this.getCategories,
            getPost: this.getPost,
          }
        }
      >
        <Helmet>
          <title>WeTalkSound | Nigeria's Biggest Music Community</title>
          <meta property="og:title" content="WeTalkSound | Nigeria's Biggest Music Community" />
          <meta property="og:description"
            content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta name="description" content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta property="og:image" content="%PUBLIC_URL%/icons/thumbnail.png" />
          <meta property="og:url" content="%PUBLIC_URL%" />
          <meta name="twitter:title" content="WeTalkSound | Nigeria's Biggest Music Community" />
          <meta name="twitter:description"
            content="A Seed, learning to become a Tree. I write about the experiences that shape me." />
          <meta name="twitter:image" content="%PUBLIC_URL%/icons/thumbnail.png" />
          <meta property="og:site_name" content="WeTalkSound | Nigeria's Biggest Music Community" />
          <meta name="twitter:image:alt" content="WeTalkSound | Nigeria's Biggest Music Community" />
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

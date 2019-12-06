import React, { Component } from 'react'
import './Posts.css'
import Loading from '../Loading/Loading';
import BlogService from '../../Services/BlogService';
import PostPreview from './PostPreview/PostPreview';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import PostList from './PostList';
import Post from './Post/Post';

export default class Posts extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/posts'>
          <PostList />
        </Route>
        <Route path='/posts/:slug' component={Post} />
      </Switch>
    )
  }
}

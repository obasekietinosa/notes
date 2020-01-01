import React, { Component } from 'react'
import './Home.css'
import Header from '../Header/Header';
import PostList from '../Posts/PostList';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <PostList />
      </div>
    )
  }
}

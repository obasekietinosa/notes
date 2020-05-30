import React, { Component } from 'react'
import './Home.css'
import Header from './Sections/Header/Header';
import PostList from 'Components/Entities/Posts/PostList';
import TopCategories from './Sections/TopCategories/TopCategories';
import MostRecentPosts from 'Components/Pages/Home/Sections/MostRecentPosts/MostRecentPosts';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <TopCategories />
        <MostRecentPosts />
      </div>
    )
  }
}

import React, { Component } from 'react';
import './Header.css';
export default class Header extends Component{
  render() {
    return (

      <header className="Header d-flex">
        <div className="container-fluid justify-content-center align-self-center">
          <div className="row">
            <div className="col-12">
              <h2>WeTalkSound</h2>
              <h1><span className="colored">Blog</span>.</h1>
              <h3></h3>
              <a href="mailto:wetalksound@gmail.com" className="btn btn-primary">Subscribe!</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

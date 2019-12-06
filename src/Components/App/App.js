import React from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import Default from '../Default/Default';

function App() {
  return (
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
  );
}

export default App;

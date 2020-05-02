import React from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import { Switch, Route, BrowserRouter, StaticRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Posts from '../Posts/Posts';
import Default from '../Default/Default';

const AppRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
      <Route component={Default} />
    </Switch>
  </>
)

function App() {
  return (
    <div className="App">
      {
        props.location ?
          <StaticRouter>
            <AppRoutes />
          </StaticRouter>
          :
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
      }
    </div>
  );
}

export default App;

import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './HomePage';
import FilmPage from './FilmPage';

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Header/>
        <div className="main-container">
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/film/:id" component={FilmPage} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </React.Fragment>
    ); 
  }
}


export default App;

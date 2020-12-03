import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from "../header/Header";
import Home from "../home/Home";
import LoginPage from "../login/LoginPage";
import SignupPage from "../singup/SignupPage";
import ArticleForm from "../articles/ArticleForm";

import NotFound from "../NotFound";
import {Container} from 'semantic-ui-react'
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Container className={styles['AppContainer']}>

          <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignupPage}/>
            <Route path="/new-article" component={ArticleForm}/>
            <Route path="/edit-article/:hash" component={ArticleForm}/>
            <Route component={NotFound}/>
          </Switch>
        </Container>
      </Router>
    );
  }
};


export default App;
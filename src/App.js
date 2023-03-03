import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
// install with `npm i @auth0/auth0-react`

import LoginPage from './LoginPage';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from "./About";
import './app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <LoginPage />

        {this.props.auth0.isAuthenticated ? 
        
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestBooks />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          <Footer />
        </Router>
      
        : null }

      </>
    );
  }
}

export default withAuth0(App);

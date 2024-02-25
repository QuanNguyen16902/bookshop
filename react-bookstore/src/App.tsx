import React, { Component } from "react";
import "./App.css";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBook } from "./layouts/SearchBookPage/components/SearchBook";
import { SearchBookPage } from "./layouts/SearchBookPage/SearchBookPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
// import { oktaConfig } from "./lib/OktaConfig" ;
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
// import LoginWidget from "./auth/LoginWidget";
import { ReviewListPage } from "./layouts/BookCheckoutPage/ReviewListPage/ReviewList";
import { MessagesPage } from "./layouts/MessagePage/MessagePage";
import { ManageBookstorePage } from "./layouts/ManagePage/ManageBookstorePage";
import EditBookPage from "./layouts/ManagePage/components/EditBookPage";
import ViewBookPage from "./layouts/ManagePage/components/ViewBookPage";
import { ShoppingCartPage } from "./layouts/ShoppingCart/ShoppingBookPage";
import CheckoutPage from "./layouts/ShoppingCart/ShoppingCart";

import Navbar from "./layouts/NavbarAndFooter/Navbar";
import LoginPage from "./layouts/LoginPage/LoginPage";
import Register from "./layouts/LoginPage/RegisterPage";
import ShoppingCart from "./layouts/ShoppingCart/ShoppingCart";
import CheckoutDetails from "./layouts/ShoppingCart/PlaceOrder";
// const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  // const customAuthHandler = () => {
  //   history.push('/login')
  // }

    return (
      <div className="d-flex flex-column min-vh-100">
        {/* <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}> */}
  
        <Navbar />
        <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to='/home' />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBookPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
          <Route path='/edit/:bookId'>
            <EditBookPage/>
          </Route>
          <Route path='/view/:bookId'>
            <ViewBookPage/>
          </Route>
  
          <Route path='/reviewList/:bookId'>
            <ReviewListPage/>
          </Route>
          
          <Route path='/shopping-book'>
            <ShoppingCartPage/>
          </Route>
          <Route path='/checkoutPage'>
            <ShoppingCart />
          </Route>
  
          <Route path='/place-order'>
            <CheckoutDetails />
          </Route>
  
          <Route path='/admin'>
            <ManageBookstorePage/>
          </Route>
  
         <Route path='/login'>
            <LoginPage/>
          </Route> 
         <Route path='/register'>
            <Register/>
          </Route> 
  
  
  
  
          {/* <Route path='/login' render={
            () => <LoginWidget config={oktaConfig}/>
            } />
            <Route path='/login/callback' component={LoginCallback}/>
            <SecureRoute path='/messages'><MessagesPage/></SecureRoute>
            <SecureRoute path='/admin'><ManageBookstorePage/></SecureRoute> */}
        </Switch>
        </div>
        <Footer />
        {/* </Security> */}
      </div>
    );
  }
 

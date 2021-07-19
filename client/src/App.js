import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import SimpleAuctionApp from "./simple_auction/SimpleAuctionApp";
import PaymentChannelApp from "./simple_payment_channel/PaymentChannelApp";
import BallotApp from "./ballot/App";

import getWeb3 from "./utils/getWeb3";


class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ballot">Ballot</Link>
              </li>
              <li>
                <Link to="/simple_auction">Simple Auction</Link>
              </li>
              <li>
                <Link to ="/simple_payment_channel">Simple Payment Channel</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/ballot">
              <BallotApp />
            </Route>
            <Route path="/simple_auction">
              <SimpleAuctionApp />
            </Route>
            <Route path="/simple_payment_channel">
              <PaymentChannelApp />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      );
  }
}

export default App;

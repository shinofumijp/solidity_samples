import React, { Component } from "react";

import SimpleAuctionApp from "./simple_auction/SimpleAuctionApp";
import PaymentChannelApp from "./simple_payment_channel/PaymentChannelApp";

import getWeb3 from "./utils/getWeb3";


class App extends Component {
  render() {
    return(
      <div>
        <SimpleAuctionApp />
        <PaymentChannelApp />
      </div>
      );
  }
}

export default App;

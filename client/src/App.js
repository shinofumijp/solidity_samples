import React, { Component } from "react";

import SimpleAuctionApp from "./simple_auction/SimpleAuctionApp";
import PaymentChannelApp from "./simple_payment_channel/PaymentChannelApp";

import getWeb3 from "./utils/getWeb3";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = { sender: 0, web3: null, accounts: null, auction_contract: null, payment_channel_contract: null };
  }

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

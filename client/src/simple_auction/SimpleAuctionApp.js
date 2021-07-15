import React, { Component } from "react";

import getWeb3 from "../utils/getWeb3";
import Contract from "../contracts/SimpleAuction"
import Form from "./Form"
import WithdrawForm from "./WithdrawForm"
import CloseForm from "./CloseForm"

class SimpleAuctionApp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Contract.networks[networkId];
      const instance = new web3.eth.Contract(
        Contract.abi,
        deployedNetwork && deployedNetwork.address
      );
      this.setState({ web3, accounts, auction_contract: instance }, this.runApp);
    }
    catch (error) {
      alert(
        `Failed`,
      );
      console.error(error);
    }
  }

  runApp = async () => {
    const { accounts, auction_contract } = this.state;

    const highestBid = await auction_contract.methods.highestBid().call();
    const highestBidder = await auction_contract.methods.highestBidder().call();
    const beneficiary = await auction_contract.methods.beneficiary().call();
    const auctionEndTime = await parseInt(auction_contract.methods.auctionEndTime().call());

    this.setState({ highestBid, highestBidder, beneficiary, auctionEndTime });
  }

  bid = async (value) => {
    const { accounts, auction_contract } = this.state;

    const response = await auction_contract.methods.bid().send({ from: accounts[0], value: value });
  }

  auctionEnd = () => {
    try {
      if (this.auctionEnded()) {
        auction_contract.methods.auctionEnd().send({ from: accounts[0] });
      }
    } catch (error) {
      console.log("auction has ended");
      console.log(error);
    }
  }

  auctionEnded = () => {
    if (this.state.auctionEndTime == null) {
      return false;
    }

    return this.state.auctionEndTime <= Date.now;
  }

  withdraw = async () => {
    const { accounts, auction_contract } = this.state;

    const response = await auction_contract.methods.withdraw().send({ from: accounts[0] });
  }

  render() {
    const { web3 } = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract... </div>;
    }

    return(
      <div>
        <h2>SimpleAuctionApp</h2>
        <p>HighestBidder: {this.state.highestBidder}</p>
        <p>HighestBid: {this.state.highestBid}</p>
        {!this.auctionEnded() ? <Form onSubmitHandler={this.bid} /> : <CloseForm  onSubmitHandler={this.actionEnded}/>}
        <WithdrawForm onSubmitHandler={this.withdraw}/>
      </div>
    );
  }
}

export default SimpleAuctionApp;

import React, { Component } from "react";

import getWeb3 from "../utils/getWeb3";
import Contract from "../contracts/Ballot"

class BallotApp extends Component {
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
      this.setState({ web3, accounts, contract: instance }, this.runApp);
    } catch (error) {
      alert(
        `Failed`,
      );
      console.error(error);
    }
  }

  runApp = async () => {
    const { accounts, contract } = this.state;

    const chairperson = await contract.methods.chairperson().call();
    const proposal0 = await contract.methods.proposals(0).call();
    const proposal1 = await contract.methods.proposals(1).call();
    const proposals = [proposal0, proposal1];
    const winningProposal = await contract.methods.winningProposal().call();
    const winnerName = await contract.methods.winnerName().call();
    const voter = await contract.methods.voters(accounts[0]).call();
    this.setState({ chairperson, proposals, winningProposal, winnerName, voter });
  }

  giveRightToVote = (address) => {
    const { accounts, contract, chairperson } = this.state;
    const account = accounts[0];

    if(account == chairperson) {
      contract.methods.giveRightToVote(address).send({ from: account });
    }
  }

  delegate = (to) => {
    const { accounts, contract } = this.state;
    const account = accounts[0];

    contract.methods.delegate(to).send({ from: account });
  }

  vote = (proposal) => {
    const { accounts, contract } = this.state;
    const account = accounts[0];

    contract.methods.vote(proposal).send({ from: account });
  }

  onDelegateSubmitHandler = (event) => {
    event.preventDefault();
    this.delegate(this.state.delegateTo);
  }

  onDelegeteChangeHandler = (event) => {
    this.setState({
      delegateTo: event.target.value,
    });
  }

  onVoteSubmitHandler = (event) => {
    event.preventDefault();
    this.vote(this.state.voteProposal);
  }

  onVoteChangeHandler = (event) => {
    this.setState({
      voteProposal: event.target.value,
    });
  }

  onGiveRightToSubmitHandler = (event) => {
    event.preventDefault();
    this.giveRightToVote(this.state.giveRightTo);
  }

  isChairperson = () => {
    const { accounts, chairperson } = this.state;
    return accounts && accounts[0] == chairperson;
  }

  onGiveRightToChangeHandler = (event) => {
    this.setState({
      giveRightTo: event.target.value,
    });
  }

  render() {
    return(
      <div>
        <h2>Ballot</h2>
        <form onSubmit={this.onDelegateSubmitHandler}>
          <input type="text" value={this.state.delegateTo || ""} onChange={this.onDelegeteChangeHandler}></input>
          <input type="submit" value="delegate" />
        </form>
        <form onSubmit={this.onVoteSubmitHandler}>
          <input type="text" value={this.state.voteProposal || ""} onChange={this.onVoteChangeHandler}></input>
          <input type="submit" value="vote" />
        </form>
        { this.isChairperson() &&
        <form onSubmit={this.onGiveRightToSubmitHandler}>
          <input type="text" value={this.state.giveRightTo || ""} onChange={this.onGiveRightToChangeHandler}></input>
          <input type="submit" value="GiveRight" />
        </form>
        }
      </div>
    );
  }
}

export default BallotApp;

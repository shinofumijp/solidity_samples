import React, { Component } from "react";
import getWeb3 from "./getWeb3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Contract.networks[networkId];
      const instance = new web3.eth.Contract(
        Contract.abi,
        displayedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, runApp);
    } catch (error) {
      alert(
        `Failed`,
      );
      console.error(error);
    }
  }

  runApp = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.set(5).send({ from: accounts[0] });

    const response = await contract.methods.get().call();

    this.setState({ storageValue: response });
  }

  signPayment = (contractAddress, amount, callback) => {
    const { accounts } = this.state;
    const defaultAccount = accounts[0];

    const message = constructPaymentMessage(contractAddress, amount);
    signMessage(message, callback);
  }

  constructPaymentMessage = (contractAddress, amount) => {
    return abi.soliditySHA3(
      ["address", "uint256"],
      [contractAddress, amount]
    );
  }

  signMessage = (message, callback) => {
    web3.eth.personal.sign(
      "0x" + message.toString("hex"),
      defaultAccount,
      callback
    );
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract... </div>;
    }
    return (
      <div className="App">
      </div>
    );
  }
}

import React, { Component } from "react";
import ABI from "ethereumjs-abi";
import {fromRpcSig, ecrecover, pubToAddress, stripHexPrefix} from 'ethereumjs-util'

import getWeb3 from "../utils/getWeb3";

import Form from "./Form";
import CloseForm from "./CloseForm";
import Contract from "../contracts/SimplePaymentChannel"

class PaymentChannelApp extends Component {

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
        deployedNetwork && deployedNetwork.address,
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

    const response = await contract.methods.sender().call();

    this.setState({ sender: response });
  }

  signPayment = (contractAddress, amount, callback) => {
    const message = this.constructPaymentMessage(contractAddress, amount);
    this.signMessage(message, callback);
  }

  constructPaymentMessage = (contractAddress, amount) => {
    return ABI.soliditySHA3(
      ["address", "uint256"],
      [contractAddress, amount]
    );
  }

  signMessage = (message, callback) => {
    const { accounts, web3 } = this.state;
    const defaultAccount = accounts[0];
    web3.eth.personal.sign(
      "0x" + message.toString("hex"),
      defaultAccount,
      callback
    );
  }

  prefixed = (hash) => {
    return ABI.soliditySHA3(
      ["string", "bytes32"],
      ["\x19Ethereum Signed Message:\n32", hash]
    );
  }

  recoverSigner = (message, signature) => {
    const split = fromRpcSig(signature);
    const publicKey = ecrecover(message, split.v, split.r, split.s);
    const signer = pubToAddress(publicKey).toString("hex");
  }

  isValidSignature = (contractAddress, amount, signature, expectedSigner) => {
    const message = this.prefixed(this.constructPaymentMessage(contractAddress, amount));
    const signer = this.recoverSigner(message, signature);
    console.log(signer);

    return signer.toLowerCase() == stripHexPrefix(expectedSigner).toLowerCase();
  }

  handleClose = async (amount, signature) => {
    const { accounts, contract } = this.state;

    const response = await contract.methods.close(amount, signature).call();
  }

  render() {
    return (
      <div className="App">
        <h2>Simple Payment Channel App</h2>
        <Form handleSubmit={this.signPayment} />
        <CloseForm handleClose={this.handleClose} isValidSignature={this.isValidSignature}/>
      </div>
    );
  }
}

export default PaymentChannelApp;

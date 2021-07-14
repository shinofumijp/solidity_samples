import React, { Component } from "react";

class CloseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { signature: null };
  }

  handleClose = (event) => {
    event.preventDefault();
    console.log(this.props.handleClose);
    this.props.handleClose(this.state.signature, 2);
  }

  handleChange = (event) => {
    this.setState({ signature: event.target.value });
  }

  checkIsValidSignature = () => {
    this.props.isValidSignature(this.state.contract_address, this.state.amount, this.state.signature, "");
  }

  handleAmountChange = (event) => {
    this.setState({ amount: parseInt(event.target.value) });
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleClose}>
          <input type="text" name="signature" value={this.state.signature || ""} onChange={this.handleChange}/>
          <input type="text" name="amount" value={this.state.amount || 0 } onChange={this.handleAmountChange}/>
          <input type="submit" value="close" />
        </form>
        <div onClick={this.checkIsValidSignature}>
          check
        </div>
      </div>
    );
  }
}

export default CloseForm;

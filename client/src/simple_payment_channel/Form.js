import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { contract_address: null, amount: 0 };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.contract_address, this.state.amount, () => {});
  }

  handleChange = (event) => {
    this.setState({ contract_address: event.target.value });
  }

  handleAmountChange = (event) => {
    this.setState({ amount: parseInt(event.target.value) });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="address" value={this.state.contract_address || ""} onChange={this.handleChange}/>
        <input type="text" name="amount" value={this.state.amount || 0} onChange={this.handleAmountChange}/>
        <input type="submit" />
      </form>
    );
  }
}

export default Form;

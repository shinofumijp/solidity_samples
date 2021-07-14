import React, { Component } from "react";

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = { bidValue: 0 };
  }

  onChangeHandler = (event) => {
    this.setState({ bidValue: parseInt(event.target.value || '0') });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmitHandler(this.state.bidValue);
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="text" value={this.state.bidValue } onChange={this.onChangeHandler} ></input>
          <input type="submit" value="bid" />
        </form>
      </div>
    );
  }
}

export default Form;

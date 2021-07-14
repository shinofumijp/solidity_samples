import React, { Component } from "react";

class WithdrawForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmitHandler = (event) => {
    event.preventDefault;
    this.props.onSubmitHandler();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default WithdrawForm;

import React, { Component } from "react";

class CloseForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmitHandler();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="submit" value="Close" />
        </form>
      </div>
    );
  }
}

export default CloseForm;

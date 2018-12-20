import React, { Component } from 'react';
const { getTransactionReceipt } = require('fmms');

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', result: '', address: '', error: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    event.preventDefault();
    getTransactionReceipt(value)
      .then(result => {
        console.log(result);
        this.setState({
          result: result,
          error: ''
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ account: '', address: '', error: error.toString() });
      });
  }

  render() {
    const { result, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Tx:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <p>Receipt : </p>
          <p>{JSON.stringify(result)}</p>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default CreateAccountForm;

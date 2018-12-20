import React, { Component } from 'react';
const { createAccount } = require('fmms');

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', account: '', address: '', error: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    event.preventDefault();
    createAccount(value)
      .then(account => {
        console.log(account);
        this.setState({
          account: account,
          address: '0x' + account.address,
          error: ''
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ account: '', address: '', error: error.toString() });
      });
  }

  render() {
    const { account, error, address } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Password:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {account && (
          <div>
            <p>New Account Created: {address}</p>
            <p>{JSON.stringify(account)}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default CreateAccountForm;

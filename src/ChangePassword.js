import React, { Component } from 'react';
const { changePassword } = require('fmms');

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      privateKey: '',
      account: '',
      address: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { oldPassword, newPassword, privateKey } = this.state;
    event.preventDefault();
    changePassword(oldPassword, JSON.parse(privateKey), newPassword)
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
          <div>
            <label>
              Old Password:
              <input
                type="text"
                value={this.state.oldPassword}
                onChange={event =>
                  this.setState({ oldPassword: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              PrivateKey:
              <input
                type="text"
                value={this.state.privateKey}
                onChange={event =>
                  this.setState({ privateKey: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              New Password:
              <input
                type="text"
                value={this.state.newPassword}
                onChange={event =>
                  this.setState({ newPassword: event.target.value })
                }
              />
            </label>
          </div>
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

export default ChangePassword;

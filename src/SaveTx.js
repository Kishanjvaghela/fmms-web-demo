import React, { Component } from 'react';
const { saveData } = require('fmms');

class SaveTx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      type: '',
      userId: '',
      address: '',
      password: '',
      privateKey: '',
      result: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { data, type, userId, address, password, privateKey } = this.state;
    event.preventDefault();
    try {
      const userObj = {
        userId: userId,
        userAddress: address
      };
      const loginObject = {
        password,
        privateKeyObj: JSON.parse(privateKey)
      };
      saveData(JSON.parse(data), type, userObj, loginObject)
        .then(result => {
          console.log(result);
          this.setState({
            result: result,
            error: ''
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ result: '', error: error.toString() });
        });
    } catch (error) {
      console.log(error);
      this.setState({ result: '', error: error.toString() });
    }
  }

  render() {
    const { result, error, address } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Data JSON:
              <textarea
                type="text"
                value={this.state.data}
                onChange={event => this.setState({ data: event.target.value })}
              ></textarea>
            </label>
          </div>
          <div>
            <label>
              Data Type (int):
              <input
                type="text"
                value={this.state.type}
                onChange={event => this.setState({ type: event.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              User Id:
              <input
                type="text"
                value={this.state.userId}
                onChange={event =>
                  this.setState({ userId: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              User Address:
              <input
                type="text"
                value={this.state.address}
                onChange={event =>
                  this.setState({ address: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Modifier Password:
              <input
                type="text"
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Modifier PrivateKey:
              <input
                type="text"
                value={this.state.privateKey}
                onChange={event =>
                  this.setState({ privateKey: event.target.value })
                }
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        {result && (
          <div>
            <p>Tx submitted to network</p>
            <p>{result}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default SaveTx;

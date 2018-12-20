// require('dotenv').config();
import React, { Component } from 'react';
import './App.css';
import CreateAccount from './CreateAccount';
import ChangePassword from './ChangePassword';
import SaveTx from './SaveTx';
import GetTx from './GetTx';
// const { init: setupConfig } = require('fmms');
import { init as setupConfig } from 'fmms';
// UTC--2018-09-13T14_45_06.629Z--633642c036db81fb7a726a37a8b42254556b56f0
class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      web3Url: process.env.REACT_APP_WEB3URL,
      ownerAddress: process.env.REACT_APP_OWNER,
      keystoreObj: require('./keystore/keystore.json'),
      abi: require('./fmms_abi/ropsten-abi.json'),
      password: process.env.REACT_APP_OWNER_PASSWORD,
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      bufferGasPrice: 0, // gwei
      bufferGasLimit: 200000 // wei
    };
    console.log(config);
    setupConfig(config);
  }
  componentDidMount() {
    // const config = {
    //   web3Url: 'https://ropsten.infura.io/qe93eRW1ZLx44WsdN2wh',
    //   ownerAddress: '0x633642C036DB81FB7a726a37A8B42254556B56F0',
    //   keystorePath: './',
    //   abi: require('./fmms_abi/ropsten-abi.json'),
    //   password: '12345678',
    //   contractAddress: '0xE4f4586212B8841aafBd4DE5Ac4dC75E94a7F82A'
    // };
    // setupConfig({});
  }
  render() {
    return (
      <div className="App">
        <div>
          <ul>
            <li>
              <h3>Create Account</h3>
              <CreateAccount />
            </li>
            <li>
              <h3>Change Password</h3>
              <ChangePassword />
            </li>
            <li>
              <h3>Save Transaction</h3>
              <SaveTx />
            </li>
            <li>
              <h3>Get TransactionReceipt</h3>
              <GetTx />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

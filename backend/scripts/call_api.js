#!/usr/bin/env node
var request = require('request');
const ethUtils = require('ethereumjs-util');

const tenz = require('../src/tenzorum')
const { w3 } = require('../src/provider.js')


const user = require('./user.js')

const privateKey = '0xf20fe8e18ce0da9a812d4b63c252781b0f75e3143c148e9d52438a5e385d6745'
const userPubAddr = ethUtils.bufferToHex(ethUtils.privateToAddress(privateKey));
const KDAI = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2';

/*
const getPersonalWallet = async pubAddr => {
  const url = tenz.relayerUrl + '/personal/'+pubAddr
  request(url, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}
*/

async function transferTokens(personalWalletAddress) {
}

async function main() {
  const url = tenz.relayerUrl + '/deploy/'+userPubAddr
  request.post(url, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body); // Print the HTML for the Google homepage.
  /*
  tenz.initSdk(w3, privateKey, getPersonalWallet())
  tenzSdk.initSdk(web3, privateKey, personalWalletAddress);
  const result = await tenzSdk.transferTokensWithTokenReward(tokenAddress, tenTokens, toAddress, oneToken);
  console.log(result);
  */
  })
}

main()

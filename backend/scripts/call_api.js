var request = require('request');
const ethUtils = require('ethereumjs-util');

const tenz = require('../src/tenzorum')
const { w3 } = require('../src/provider.js')
const user = require('./user.js')

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

async function main() {
  const url = tenz.relayerUrl + '/deploy/'+user.userPubAddr
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

module.exports = async(
  truffleCB,
  {artifacts = this.artifacts, verbose = true} = {}
) => {
  try {
    let DAI
    const network = artifacts.options._values.network
    if (network === 'development') {
      let addr = await(await artifacts.require('TestToken').deployed()).address
      DAI = await artifacts.require('ERC20').at(addr)
    }
    if (network === 'kovan') {
      DAI = await artifacts.require('ERC20').at(KDAI)
    }
    console.log('balance', await(await DAI.balanceOf(user.userPubAddr)).toString())
    await main()
  }
  catch (e) {
    console.error(e)
  }
}






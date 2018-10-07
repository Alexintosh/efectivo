var request = require('request');
const ethUtils = require('ethereumjs-util');

const tenz = require('../src/tenzorum')
const { w3 } = require('../src/provider.js')

const user = require('./user.js')

const KDAI = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2';

async function main(tokenAddr) {
  const url = tenz.relayerUrl + '/deploy/'+user.userPubAddr
  
  let personalWalletAddress = await request.post(url, (error, response, body) => {
    if(error) console.log('error:', error);
    console.log('body:', body); 
    return body
  })
    
  console.log(user.privateKey)
  
  await tenz.initSdk(w3, user.privateKey, personalWalletAddress);
  const payload = await tenz.transferTokensWithTokenReward(
    tokenAddr,
    1,
    await w3.eth.accounts.create().address,
    1 
  );
  console.log(result);
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
    await main(DAI.address)
  }
  catch (e) {
    console.error(e)
  }
}


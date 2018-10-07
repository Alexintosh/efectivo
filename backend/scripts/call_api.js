const fetch = require('node-fetch')
const ethUtils = require('ethereumjs-util');

const tenz = require('../src/tenzorum')
const { w3, relayAccount} = require('../src/provider.js')

const user = require('./user.js')

const KDAI = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2';

async function main(DAI) {

  let url = tenz.relayerUrl + '/deploy/'+user.userPubAddr
  // requests for a personal wallet
  let personalWalletAddress = (await fetch(url, { method: 'POST', body: {}})
    .then(res => res.json())).res

  let receipt = await DAI.mint(personalWalletAddress, 10000)
  console.log('minting tokens...\n txn: ', receipt.tx)
  //init tenzorum sdk
  await tenz.initSdk(w3, user.privateKey, personalWalletAddress);
  //build the compatible signature for the tenzorum personal wallet
  const payload = await tenz.transferTokensWithTokenReward(
    DAI.address,
    1,
    await w3.eth.accounts.create().address,
    1 
  )

  console.log('payload', payload)
  url = tenz.relayerUrl + '/execute/' + personalWalletAddress
  await fetch(url, {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
    .then(json => console.log('metaaaaa!', json))
}

module.exports = async(
  truffleCB,
  {artifacts = this.artifacts, verbose = true} = {}
) => {
  try {
    let DAI
    const network = artifacts.options._values.network
    if (network === 'development') {
      DAI = await artifacts.require('TestToken').new()
			console.log('TEST TOKEN ADDR', DAI.address)
    }
    if (network === 'kovan') {
      DAI = await artifacts.require('ERC20').at(KDAI)
    }
    await main(DAI)
    console.log('payment', await(await DAI.balanceOf(relayAccount)).toString())
  }
  catch (e) {
    console.error(e)
  }
}


require('dotenv').config()
const Web3 = require('web3')
const ethUtils = require('ethereumjs-util')

//const w3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
const w3 = new Web3('http://localhost:8545')

const pk = '282b525212437911c1f8da8649b2ac3b514adfd2fe62409e5b363d58d4027b8e'
const privateKey = Buffer.from(pk, 'hex')
const publicAddress = ethUtils.bufferToHex(ethUtils.privateToAddress(privateKey))

function prepareData(input) {
  let encoded = w3.eth.abi.encodeFunctionCall({

    name: 'execute',
    type: 'function',
    inputs: [{
      type: 'uint8',
      name: 'v'
    },{
      type: 'bytes32',
      name: 'r'
    },{
      type: 'bytes32',
      name: 's'
    },{
      type: 'address',
      name: 'from'
    },{
      type: 'address',
      name: 'to'
    },{
      type: 'uint256',
      name: 'value'
    },{
      type: 'bytes',
      name: 'data'
    },{
      type: 'address',
      name: 'rewardType'
    },{
      type: 'uint256',
      name: 'rewardAmount'
    }]
  }, [input.v, input.r, input.s, input.from, input.to, input.value, input.data, input.rewardType, input.rewardAmount])

  return encoded
}

const executeCall = async (personalWallet, payload) => {
  //TODO: check gas estimates
  const gasLimit = w3.utils.toHex('211000')
  const gasPrice = w3.utils.toHex(w3.utils.toWei('10','gwei'))
  console.log('publicAddress', publicAddress)
  const nonce = await w3.eth.getTransactionCount(publicAddress)
  console.log('nonce', nonce)

  let rawTx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: personalWallet,
    value: '0x00',
    data: await prepareData(payload)
  }

  const signedTxn = await w3.eth.accounts.signTransaction(rawTx, '0x'+pk)
  return w3.eth.sendSignedTransaction(signedTxn.rawTransaction)
}

module.exports = {
  relayAccount: publicAddress,
  w3,
  executeCall,
}

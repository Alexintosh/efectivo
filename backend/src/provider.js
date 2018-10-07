require('dotenv').config()
const Web3 = require('web3')
const ethUtils = require('ethereumjs-util')

//kovan
const w3 = new Web3(process.env.WEB3_PROVIDER)
// rinkeby pk
const pk = 'f20fe8e18ce0da9a812d4b63c252781b0f75e3143c148e9d52438a5e385d6745'
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
  relayPk: pk,
  w3,
  executeCall,
}

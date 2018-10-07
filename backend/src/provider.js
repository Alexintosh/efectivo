require('dotenv').config()
const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
const ethUtils = require('ethereumjs-util')

//const w3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
const w3 = new Web3('http://localhost:8545')

//const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
const privateKey = '0x282b525212437911c1f8da8649b2ac3b514adfd2fe62409e5b363d58d4027b8e'
const publicAddress = ethUtils.bufferToHex(ethUtils.privateToAddress(privateKey));

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
  }, [input.v, input.r, input.s, input.from, input.to, input.value, input.data, input.rewardType, input.rewardAmount]);

  return encoded;
}

const executeCall = async function(personalWallet, payload) {
      //check if from is master account
      //let personalWallet = new web3.eth.Contract(ABI, req.params.personalWallet);
      //TODO: check gas estimates
      const gasLimit = w3.utils.toHex("211000");
      const gasPrice = w3.utils.toHex(w3.utils.toWei("10","gwei"));
      const nonce = w3.utils.toHex(await w3.eth.getTransactionCount(publicAddress));

      let data = prepareData(payload);

      let rawTx = {
          nonce: nonce,
          gasPrice: gasPrice,
          gasLimit: gasLimit,
          to: personalWallet,
          value: '0x00',
          data: data
      };

      let tx = new Tx(rawTx);
      tx.sign(privateKey);
      let serializedTx = tx.serialize();

}

module.exports = {
  relayAccount: publicAddress,
  w3,
  executeCall,
}

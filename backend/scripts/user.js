
const ethUtils = require('ethereumjs-util');
// This should be use this creates a random ether account with no ether
//web3.eth.accounts.create();
const privateKey =  '0xf20fe8e18ce0da9a812d4b63c252781b0f75e3143c148e9d52438a5e385d6745'
module.exports = {
  privateKey,
  userPubAddr: ethUtils.bufferToHex(ethUtils.privateToAddress(privateKey))
}


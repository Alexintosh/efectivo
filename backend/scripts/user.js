const { w3 } = require('../src/provider.js')
let newAccount = w3.eth.accounts.create()
module.exports = {
  privateKey: newAccount.privateKey.replace('0x',''),
  userPubAddr: newAccount.address
}


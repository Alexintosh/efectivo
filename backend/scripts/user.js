const { w3 } = require('../src/provider.js')
let newAccount = w3.eth.accounts.create()
module.exports = {
  privateKey: newAccount.privateKey,
  userPubAddr: newAccount.address
}


const TestToken = artifacts.require('./TestToken.sol');

const user = require('../scripts/user')

module.exports = async function(deployer, network, accounts) {
	await deployer.deploy(TestToken, accounts[0])
  console.log((await TestToken.deployed()).address)
  let receipt = await (await TestToken.deployed()).mint(user.userPubAddr, 10000)
  console.log('minting tokens...\n txn: ', receipt.tx)
  let balance = await (await TestToken.deployed()).balanceOf(user.userPubAddr)
  console.log('balance:', balance.toString())
};

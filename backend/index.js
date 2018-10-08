const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const personalWallet = require('./build/contracts/PersonalWallet.json')
const ERC20_ABI = require('./build/contracts/ERC20.json')
app.use(bodyParser.json())

const {
  w3,
  executeCall,
  relayAccount,
  relayPk
} = require('./src/provider')

const PORT = 8080
const HOST = '0.0.0.0'
const KDAI = '0xc4375b7de8af5a38a93548eb8453a498222c4ff2'

const deployPersonal = async () => {
  const rawTx = {
    data: personalWallet.deployedBytecode,
    from: relayAccount,
    value: '0x00',
    gas: 310000,
    gasPrice: await w3.utils.toWei('0.0000000001'),
    nonce: await w3.eth.getTransactionCount(relayAccount)
  }

  const signedTxn = await w3.eth.accounts.signTransaction(rawTx, '0x'+relayPk)
  const receipt = await w3.eth.sendSignedTransaction(signedTxn.rawTransaction)
  return receipt.contractAddress
}

const fundSomeDai = async (to) => {
  const amount =  10000
  const rawTx = {
    // function call [4] is transfer
    data: await w3.eth.abi.encodeFunctionCall(ERC20_ABI.abi[4], [to, amount]),
    from: relayAccount,
    value: '0x00',
    gas: 310000,
    gasPrice: await w3.utils.toWei('0.0000000001'),
    nonce: await w3.eth.getTransactionCount(relayAccount),
    to: KDAI
  }

  const signedTxn = await w3.eth.accounts.signTransaction(rawTx, '0x'+relayPk)
  await w3.eth.sendSignedTransaction(signedTxn.rawTransaction)
}

app.post('/execute/:personalWallet', async (req, res) => {

  let hash = await executeCall(req.params.personalWallet, req.body)
  res.status(202)
  console.log("returning: " + hash)
  res.json({txHash: hash})
})

app.post('/deploy/:address', async(req, res) => {

  console.log('relayer: ', relayAccount)
	console.log('new pub addr', req.params.address)
  let personalWallet = await deployPersonal()
	console.log('funding with dai...')
  await fundSomeDai(personalWallet)
  res.status(200)
  res.json({personal: personalWallet})
})

//test enpoint
app.get('/ping', async (req, res) => {
  res.status(200)
  res.json({res: 'pong'})
});

app.listen(PORT, HOST, async function () {
  console.log(`TSN is up and running using account: ${relayAccount} and web3 provider: ${w3.currentProvider.host}...`);
});

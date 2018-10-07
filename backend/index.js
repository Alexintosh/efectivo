const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const personalWallet = require('./build/contracts/PersonalWallet.json')
app.use(bodyParser.json())

const {
  w3,
  executeCall,
  relayAccount
} = require('./src/provider')

const PORT = 8080
const HOST = '0.0.0.0'

app.post('/execute/:personalWallet', async (req, res) => {

  let hash = await executeCall(req.params.personalWallet, req.body)
  res.status(202)
  console.log("returning: " + hash)
  res.json({txHash: hash})
})

app.post('/deploy/:address', async(req, res) => {
  console.log('relayer: ', relayAccount)
  let contract = await new w3.eth.Contract(personalWallet.abi)
  let receipt = await contract.deploy({
    data: personalWallet.bytecode, arguments: [req.params.address]
  }).send({
    from: relayAccount,
    gas: 1500000,
    gasPrice: '3000000000'
  })
  res.status(200)
  res.json({res: receipt._address})
})

//test enpoint
app.get('/ping', async (req, res) => {
  res.status(200)
  res.json({res: 'pong'})
});

app.listen(PORT, HOST, function () {
  console.log(`TSN is up and running using account: ${relayAccount} and web3 provider: ${w3.currentProvider.host}...`);
});

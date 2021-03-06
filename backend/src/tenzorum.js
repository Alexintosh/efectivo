/* Tenzorum TSNN Client SDK - https://tenzorum.org
 *
 * @author  Radek Ostrowski & Mark Pereira
 */
const utils = require('web3-utils');
const ethUtils = require('ethereumjs-util');
const fetch = require('node-fetch');

const PersonalWallet = require('../build/contracts/PersonalWallet.json')

let isInitialised = false;

const zeroWei = 0;
const noData = "0x00";
const rewardTypeEther = "0x0000000000000000000000000000000000000000";
const relayerUrl = "http://localhost:8080";

let web3;
let privateKey;
let publicAddress;
let personalWalletAddress;

const initSdk = (_web3, _privateKey, _personalWalletAddress) => {
    web3 = _web3;
    personalWalletAddress = _personalWalletAddress;
    privateKey = Buffer.from(_privateKey, 'hex');
    publicAddress = ethUtils.bufferToHex(ethUtils.privateToAddress(privateKey));
    isInitialised = true;
}

const getTsn = async () => {
    const response = await fetch(relayerUrl);
    const json = await response.json();
    return json.tsn;
}

const preparePayload = async (targetWallet, from, to, value, data, rewardType, rewardAmount) => {
    if(!isInitialised) console.log("ERROR: SDK not initialized");

    const walletInstance = new web3.eth.Contract(PersonalWallet.abi, targetWallet);
    const nonce = await walletInstance.methods.nonces(from).call();
    const hash = ethUtils.toBuffer(utils.soliditySha3(targetWallet, from, to, value, data,
        rewardType, rewardAmount, nonce));

    const signedHash = ethUtils.ecsign(ethUtils.hashPersonalMessage(hash), privateKey);

    let payload = {};
    payload.v = ethUtils.bufferToHex(signedHash.v);
    payload.r = ethUtils.bufferToHex(signedHash.r);
    payload.s = ethUtils.bufferToHex(signedHash.s);
    payload.from = from;
    payload.to = to;
    payload.value = value.toString();
    payload.data = data;
    payload.rewardType = rewardType;
    payload.rewardAmount = rewardAmount.toString();

    // console.log('"'+payload.v+'","'+payload.r+'","'+payload.s+'","'+payload.from+'","'+payload.to+'","'+
    //     payload.value+'","'+payload.data+'","'+payload.rewardType+'","'+payload.rewardAmount+'"');

    return JSON.stringify(payload);
}

const prepareTokenTransferData = async (amount, to) => {
    const encoded = await web3.eth.abi.encodeFunctionCall({
        name: 'transfer',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }, {
            type: 'uint256',
            name: 'amount'
        }]
    }, [to, amount]);
    return encoded;
}

const prepareAddMasterData = async (account) => {
    const encoded = await web3.eth.abi.encodeFunctionCall({
        name: 'addMasterAccount',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'account'
        }]
    }, [account]);
    return encoded;
}

const prepareAddActionData = async (account) => {
    const encoded = await web3.eth.abi.encodeFunctionCall({
        name: 'addActionAccount',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'account'
        }]
    }, [account]);
    return encoded;
}

const transferEtherNoReward = async (ethAmountInWei, toAddress) => {
    return await preparePayload(personalWalletAddress, publicAddress, toAddress, ethAmountInWei, noData, rewardTypeEther, zeroWei);
}

const transferEtherWithEtherReward = async (ethAmountInWei, toAddress, rewardAmount) => {
    return await preparePayload(personalWalletAddress, publicAddress, toAddress, ethAmountInWei, noData, rewardTypeEther, rewardAmount);
}

const transferTokensNoReward = async (tokenAddress, amount, toAddress) => {
    const data = await prepareTokenTransferData(amount, toAddress);
    return await preparePayload(personalWalletAddress, publicAddress, tokenAddress, zeroWei, data, rewardTypeEther, zeroWei);
}

const transferTokensWithTokenReward = async (tokenAddress, amount, toAddress, rewardAmount) => {
    const data = await prepareTokenTransferData(amount, toAddress);
    return await preparePayload(personalWalletAddress, publicAddress, tokenAddress, zeroWei, data, tokenAddress, rewardAmount);
}

const addMasterNoReward = async (account) => {
    const data = await prepareAddMasterData(account);
    return await preparePayload(personalWalletAddress, publicAddress, personalWalletAddress, zeroWei, data, rewardTypeEther, zeroWei);
}

const addActionNoReward = async (account) => {
    const data = await prepareAddActionData(account);
    return await preparePayload(personalWalletAddress, publicAddress, personalWalletAddress, zeroWei, data, rewardTypeEther, zeroWei);
}

module.exports = {
    initSdk,
    getTsn,
    transferEtherNoReward,
    transferEtherWithEtherReward,
    transferTokensNoReward,
    transferTokensWithTokenReward,
    addMasterNoReward,
    relayerUrl 
}

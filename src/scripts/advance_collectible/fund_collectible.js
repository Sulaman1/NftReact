import AdvanceABI from '../../abis/AdvanceCollectibles.json';
import LinkABI from '../../abis/LinkTokenInterface.json';
const Web3 = require("web3")
//const config = require("../../truffle-config.js");
const fund = require("../helpful_scripts");

const Provider = require('@truffle/hdwallet-provider');
const priKey = 'b8ed812a73ca25905a534c4afc5b0f5ba2b387727cf73e4700fe843dcb7971b6';
const mnemonic = 'actual turtle provide away bamboo dad arrow devote knee mind cradle betray';
const provider = new Provider(mnemonic, 'https://rinkeby.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');


//module.exports = async callback => {
//export default fund = async () => {
async function fundT() {
  try {
    const web3 = new Web3(provider);
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    console.log('JS network: ', network);
    console.log("JS accounts:", accounts);
    console.log("JS networkId: ", networkId);
    const dev = accounts[0];
    console.log("developer : ", dev);
    const advanceAdd = await AdvanceABI.networks[networkId].address;

    const AdvanceContract = new web3.eth.Contract(AdvanceABI.abi, advanceAdd);
    const linkA = await AdvanceContract.methods.LinkToken().call();
    console.log("JS Link Address: ", linkA);

    const LinkContract = new web3.eth.Contract(LinkABI.abi, linkA);
    console.log("JS Link Token : ", LinkContract._address)
    const bal = await LinkContract.methods.balanceOf(advanceAdd).call();
    console.log("before balance : ", bal)

    await LinkContract.methods.transfer(advanceAdd, '1000000000000000000').send({ from: dev })
    const bal2 = await LinkContract.methods.balanceOf(advanceAdd).call();
    console.log("after balance : ", bal2)

  }
  catch (err) {
    console.log(err)
  }
}

export default fundT;

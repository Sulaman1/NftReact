// import LinkTokenInterface from '../../contracts/LinkTokenInterface.sol';
// import AdvanceCollectibles from '../../contracts/AdvanceCollectibles.sol';
const LinkTokenInterface = require("../../contracts/LinkTokenInterface.sol");
const AdvanceCollectibles = require("../../contracts/AdvanceCollectibles.sol");
//const AdvanceCollectibles = artifacts.require("AdvanceCollectibles");
var Advancejson = require("../../abis/AdvanceCollectibles.json");
var Linkjson = require("../../abis/LinkTokenInterface.json");
//import contract from 'truffle-contract';
var contract = require("@truffle/contract");
//var LinkTokenInterface = require("../../abis/LinkTokenInterface.json");


//import truffle_config from '../../../truffle-config';
const Web3 = require("web3")
//const config = require("../../truffle-config.js");
///const fund = require("../helpful_scripts");
//const fund_collectible = require("../advance_collectible/fund_collectible");

//const web3 = new Web3("http://127.0.0.1:8545")
//const web3 = new Web3('https://kovan.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');

const Provider = require('@truffle/hdwallet-provider');
//const fromAdd = await web3.utils.toChecksumAddress('0x3EEe74823c59E709606d89BF10f2424465Ba69F9')
const priKey = 'b8ed812a73ca25905a534c4afc5b0f5ba2b387727cf73e4700fe843dcb7971b6';
const mnemonic = 'actual turtle provide away bamboo dad arrow devote knee mind cradle betray';
const provider = new Provider(mnemonic, 'https://rinkeby.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');

//https://stackoverflow.com/questions/46101430/proper-use-of-artifacts-require

//module.exports = async callback => {
async function fundTheToken(){
    console.log("hello crypto");
    const web3 = new Web3(provider);
    let myAccounts = await web3.eth.getAccounts();
    let dev = myAccounts[0];
    console.log("Dev Account: ", dev);

    var acj = contract(Advancejson)
    acj.setProvider(provider);
    var ltj = contract(Linkjson)
    //var con = ltj.at()
    ltj.setProvider(provider);

    // acj.LinkToken().then(function(result) {
    //   // result object contains import information about the transaction
    //   console.log("Value was set to", result.logs[0].args.val);
    // });
    console.log("Contract : ", acj.check4("sdf", 33))
    console.log("Interface : ", ltj)
    // try {
    //   const ac = await AdvanceCollectibles.deployed()
  
    //   const tokenAddress = await ac.LinkToken()
    //   console.log("Chainlink Token Address: ", tokenAddress)
     
    //   const link_token = await LinkTokenInterface.at(tokenAddress)
    //   console.log('LINK_TOKEN: ', link_token)
      
    //   console.log('Funding contract:', ac.address)
    //   const tx = await link_token.transfer(ac.address, '10000000000000000000', {from : dev});
    //   console.log(tx)
    //   //const tx = await token.transfer(ac.address, payment)
      
    // } catch (err) {
    //   console.log(err)
    // }
}

module.exports = { fundTheToken }


// module.exports = async callback => {
//     console.log("hello crypto");
//     //let net = await web3.eth.net.getNetworkType();
//     console.log(web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator));
//     console.log(config.networks.kovan.keyhash);
    
//     let myAccounts = await web3.eth.getAccounts();
//     console.log(myAccounts)
//     let dev = myAccounts[0];
    
//     // let netid = await web3.eth.net.getId();
    
//     // let advance_collectible = await deployer.deploy(
//     //     AdvanceCollectibles, 
//     //     web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator), 
//     //     web3.utils.toChecksumAddress(config.networks.kovan.link_token), 
//     //     config.networks.kovan.keyhash, 
//     //     {from: dev}
//     //     );


//     AdvanceCollectibles.deployed();

//     fund_advance_collectible(advance_collectible)
//     return advance_collectible;
// };


// async function fund_advance_collectible(nft_contract){
//     console.log("IN FUND ADVANCE FUNCTION");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer(nft_contract, 1000000000000000000, {"from" : dev});
// }
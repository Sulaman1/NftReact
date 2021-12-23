import AdvanceABI from '../../abis/AdvanceCollectibles.json';
require("dotenv").config();

const Web3 = require("web3")
const helpFun = require("../helpful_scripts");

const Provider = require('@truffle/hdwallet-provider');
const priKey = process.env.REACT_APP_PRI_KEY;
const mnemonic = process.env.REACT_APP_MNEMONICS;
const provider = new Provider(mnemonic, process.env.REACT_APP_RINKEBY_URL);

async function createNFT() {
    console.log("Creating NFT...");
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
        let oldV = await AdvanceContract.methods.checkEx().call();
        let tc = await AdvanceContract.methods.tokenCounter().call();
        let rn = await AdvanceContract.methods.randNum().call();
        console.log("Old Value and token number and random number: ", oldV, tc, rn);

        let tokenNum = tc + 1;
        tokenNum = tokenNum.toString();
        const receipt = await AdvanceContract.methods.createNFT(tokenNum).send({ from: dev });
        let transactionReceipt = null
        while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
            console.log("TransactionHash : ", receipt.transactionHash)
            transactionReceipt = await web3.eth.getTransactionReceipt(receipt.transactionHash);
            //await sleep(expectedBlockTime)
        }
        let newV = await AdvanceContract.methods.checkEx().call();
        console.log("New Value: ", newV);

        const results = await AdvanceContract.getPastEvents(
            'RequestCollectible',
            {
                fromBlock: 0,
                toBlock: 'latest'
            }
        )
        console.log("Event Result : ", results)

        const requestId = results[0].returnValues.requestId;
        console.log("TxEvents: ", receipt)
        console.log("Results: ", results);
        console.log("Request Id: ", requestId);

        // const tokenId = await AdvanceContract.methods.requestIdToTokenId(requestId).call();
        // console.log("Token Id from mapping: ", tokenId);
        const nft = await AdvanceContract.methods.nfts(tc).call();
        console.log("NFT from mapping: ", nft);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default createNFT;

// module.exports = async callback => {
//     const priKey = '';
//     console.log("Pri Key: ", priKey);

//     const provider = new HDWalletProvider(priKey, kovanurl);      
//     const web3 = new Web3(provider);

//     console.log("hello crypto create collectible");
//     let myAccounts = await web3.eth.getAccounts();
//     console.log(myAccounts)
//     const network = await web3.eth.net.getNetworkType();

//     console.log("network: ", network);
//     const networkId = await web3.eth.net.getId();
//     console.log("networkId: ", networkId);
//     const AdvanceCollectiblesData = await AdvanceCollectibles.networks[networkId];
//     const contAdd = AdvanceCollectiblesData.address;
//     console.log("Contract Address: ", contAdd)
//     const advanceCollectible = new web3.eth.Contract(AdvanceCollectibles.abi, AdvanceCollectiblesData.address);
//     const dev = myAccounts[0];
//     console.log("Dev Account: ", dev);
//     //const fromAdd = await web3.utils.toChecksumAddress('0xAaa25FB3d2b4617793Fa58fC1881F4bb76E6bd62');
//     const oldV = await advanceCollectible.methods.checkEx().call();
//     console.log("Old Value: ", oldV);

//     const receipt = await advanceCollectible.methods.check4("next collectibles").send({from: dev});
//     let transactionReceipt = null
//     while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
//         console.log("TransactionHash : ", receipt.transactionHash)
//         transactionReceipt = await web3.eth.getTransactionReceipt(receipt.transactionHash);
//         //await sleep(expectedBlockTime)
//     }

//     console.log("First Sleep Over");

//     const newV = await advanceCollectible.methods.checkEx().call();
//     console.log("New Value: ", newV);

//     const results = await advanceCollectible.getPastEvents(
//         'RequestCollectible',
//        {
//             fromBlock: 0,
//             toBlock: 'latest'
//         }
//     )
//     console.log("Event Result : ", results)

//     //   await advanceCollectible.events.RequestCollectible({fromBlock: 0})
//     //   .on('data', event => console.log("Second Event", event));

//     const requestId = results[0].returnValues.requestId;
//     console.log("TxEvents: ", receipt)
//     console.log("Results: ", results);
//     console.log("Request Id: ", requestId);

//   //  await sleep(5000);

//     const tokenId = await advanceCollectible.methods.getrequestIdToTokenId(requestId).call();
//     console.log("Token Id: ", tokenId);
//     const breed = await advanceCollectible.methods.gettokenIdToBreedStr(tokenId).call();
//     console.log("Breed is: ", breed);
//     // const myDogBreed = helpFun.get_breed(breed);
//     // console.log("MY Dog Breed ISSS: ", myDogBreed);


//     callback(receipt.tx)

//     // const tx2 = await advance_collectible.createCollectible("The Chainlink Knight");
//     // // const tx2 = await advance_collectible.createCollectible("The Chainlink Elf")
//     // // const tx3 = await advance_collectible.createCollectible("The Chainlink Wizard")
//     // // const tx4 = await advance_collectible.createCollectible("The Chainlink Orc")

//     // console.log("TRANSACTION: ", tx2)
// }

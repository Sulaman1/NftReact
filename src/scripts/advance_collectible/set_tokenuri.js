const AdvanceCollectibles = artifacts.require('AdvanceCollectibles')
//const helpFun = require('../helpful_scripts');
const Web3 = require("web3");

const OPENSEA_FORMAT = "https://testnets.opensea.io/assets/"

module.exports = async callback => {
    const ACcontract = await AdvanceCollectibles.deployed();
    const tokens = await ACcontract.tokenCounter();
    console.log("number of tokens deployed : ", tokens);


    for (let token = 0; token < tokens; token++) {
    
        const breed = helpFun.get_breed(await ACcontract.tokenIdToBreed(token))    
        console.log("Breed : ", breed);
        
        const URI = await ACcontract.tokenURI(token)
        const exists = URI.startsWith("https://")
        console.log("URI : ", URI)
        if(!exists){
            console.log("Setting TokenURI of " + token + " And URI "+ Uris[breed] +"...");

            await setTokenuri(token, ACcontract, Uris[breed])
        }
        else{
            console.log("We have already set the tokenURI of ", token)
        }
    }

    async function setTokenuri(token, contract, uri){
        let myAccounts = await web3.eth.getAccounts();
        let dev = myAccounts[0];
        console.log("Dev Account: ", dev);

        const res = await contract.setTokenURI(token, uri, {from: dev});
        console.log("Result : ", res)
        const contractAdd = await contract.address;
        console.log("contract Address : ", contractAdd)

        console.log("Great!!! you can now see your NFT at " + OPENSEA_FORMAT + contractAdd + "/" + token);
        console.log("Please be patient, wait for 20 mins and hit 'refresh metadata' button")

        
    }
    callback(tokens)
}


function get_breed(breed_number){
    var breed = {0: 'PUG', 1: 'PUG2', 2: 'SHIBA_INU', 3: 'ST_BERNARD'}
    return breed[breed_number];
}

module.exports = { get_breed };


// async function fund_advance_collectible(nft_contract){
//     console.log("IN FUND ADVANCE FUNCTION");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer(nft_contract, 1000000000000000000, {"from" : dev});
// }

// module.exports = async (deployer, networks, accounts) => {
//     console.log("hello crypto");
//     let myAccounts = await web3.eth.getAccounts();
//     let dev = myAccounts[0];

//     let link_token = LinkTokenInterface(
//         web3.utils.toChecksumAddress(config.networks.kovan.link_token)
//     )
//     link_token.transfer();
//     console.log(web3.utils.toChecksumAddress(config.networks.kovan.vrf_coordinator));

// };
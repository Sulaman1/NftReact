// import AdvanceABI from '../../abis/AdvanceCollectibles.json';
// //import { fileExists, upload_to_ipfs, writefile } from '../../../fileS';
// const path = require("path");
// const Web3 = require("web3")
// const helpFun = require("../helpful_scripts");

// //const file = require('../fileS');

// //require('dotenv').load() //use this to load env variables

// const Provider = require('@truffle/hdwallet-provider');
// const priKey = 'b8ed812a73ca25905a534c4afc5b0f5ba2b387727cf73e4700fe843dcb7971b6';
// const mnemonic = 'actual turtle provide away bamboo dad arrow devote knee mind cradle betray';
// const provider = new Provider(priKey, 'https://rinkeby.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');

// var ipfsAPI = require('ipfs-api')
// var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port:5001, protocol: 'https' });

// //const fs = require('fs');

// const metadataTemple = {
//     "name": "",
//     "description": "",
//     "image": "",
//     "attributes": [
//         {
//             "trait_type": "Strength",
//             "value": 100
//         }
//     ]
// };

// const uriTemplet = {}

// async function createMetadata(){
    
//     console.log("Creating Metadata Of All NFTs...")
//     try{
//         const web3 = new Web3(provider);
//         const network = await web3.eth.net.getNetworkType();
//         const accounts = await web3.eth.getAccounts();
//         const networkId = await web3.eth.net.getId();
        
//         console.log('JS network: ', network);
//         console.log("JS accounts:", accounts);
//         console.log("JS networkId: ", networkId);
//         const dev = accounts[0];
//         console.log("developer : ", dev);
    
//         const advanceAdd = await AdvanceABI.networks[networkId].address;
//         const AdvanceContract = new web3.eth.Contract(AdvanceABI.abi, advanceAdd);
        
//         const nfts = await AdvanceContract.methods.tokenCounter().call();
//         console.log("Total Number Of NFTs : ", nfts);

//         let tokenId = 0
//         while (tokenId < nfts) {
//             console.log("token id: ", tokenId)
//             console.log('Let\'s get the overview of your character ' + tokenId + ' of ' + nfts)
//             let characterMetadata = metadataTemple;
        
//             const breed = await AdvanceContract.methods.gettokenIdToBreed(tokenId).call();
//             console.log("My Dog Breed Num Is: ", breed);
            
//             let breedName = helpFun.get_breed(breed)
//             console.log("My Dog Breed Is: ", breedName);

//             tokenId++
//             characterMetadata['name'] = breedName;
            
//             //CREATE MAPPING TO TRACK THE NFTS...
//             if (fileExists('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
//                 console.log('The Metadata file ' + characterMetadata['name'] + ' Exists ')
//                 continue
//             }
        
//             characterMetadata['description'] = 'An adorable ' + breedName + ' pup';
            
//             let image_to_upload;

//             //For setting the env variable "export UPLOAD_IPFS=true"...
//             console.log("IPFS ready : ", process.env.UPLOAD_IPFS)
//             if(process.env.UPLOAD_IPFS){
//                 let image_path = '../../img/'+ breedName.toLowerCase() + '.png';
//                 image_to_upload = await upload_to_ipfs(image_path)

//                 console.log("Returned URI : ", image_to_upload);
            
//                 characterMetadata.image = image_to_upload;
//                 console.log("METADATA with uri : ", characterMetadata);

//                 let filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
//                 let data = JSON.stringify(characterMetadata)
                
//                 writefile(filename + '.json', data)
//                 //fs.writeFileSync(filename + '.json', data)

//                 let json_to_upload = await upload_to_ipfs('../../' + filename + '.json');

//                 console.log("Storing This in URI file: ");
//                 let uriMetadata = uriTemplet;
//                 uriMetadata[breedName] = json_to_upload;

//                 let URIfilename = 'uri/' + 'URIjson'
//                 let URIdata = JSON.stringify(uriMetadata)
//                 writefile(URIfilename + '.json', URIdata)
                
//                 //fs.writeFileSync(URIfilename + '.json', URIdata)
//             }
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// export default createMetadata;

// async function upload_to_ipfs(image_path){
//     //image_path2 = '../../img/pug.png'
//     console.log("Started Uploading to IPFS...", image_path)

//     var img = fs.readFileSync(path.join(__dirname, image_path))
//     console.log(img)
//     var imghash
//     var filename
//     try {
//         var res = await ipfs.add(img);
//         if(res){
//             imghash = res[0].hash;
//         } 
//     } catch(err) {
//         console.log("error while uploading", err);
//     }
    
//     filename = path.basename(image_path);
//     let uri = 'https://ipfs.io/ipfs/'+ imghash +'?filename='+ filename;

//     console.log(uri)
//     return uri;
// }


// // async function upload_to_ipfs(image_path){
// //     //image_path2 = '../../img/pug.png'
// //     console.log("Started Uploading to IPFS...", image_path)

// //     var img = fs.readFileSync(path.join(__dirname, image_path))
// //     console.log(img)
// //     var imghash
// //     var filename
// //     try {
// //         var res = await ipfs.add(img);
// //         if(res){
// //             imghash = res[0].hash;
// //         } 
// //     } catch(err) {
// //         console.log("error while uploading", err);
// //     }
    
// //     filename = path.basename(image_path);
// //     let uri = 'https://ipfs.io/ipfs/'+ imghash +'?filename='+ filename;

// //     console.log(uri)
// //     return uri;
// // }



// // module.exports = async callback => {
    
// //     console.log("Started Creating Metadata...")
// //     const advanceCollectible = await AdvanceCollectibles.deployed()
// //     length = await advanceCollectible.tokenCounter();
// //     console.log("length: ", length )
// //     tokenId = 0
// //     while (tokenId < length) {
// //         console.log("token id: ", tokenId)
// //         console.log('Let\'s get the overview of your character ' + tokenId + ' of ' + length)
// //         characterMetadata = metadataTemple;
       
// //         const breed = await advanceCollectible.gettokenIdToBreed(tokenId);
// //         console.log("My Dog Breed Num Is: ", breed);
        
// //         let breedName = helpFun.get_breed(breed)
// //         console.log("My Dog Breed Is: ", breedName);

// //         tokenId++
// //         characterMetadata['name'] = breedName;
// //         if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
// //             console.log('The Metadata file ' + characterMetadata['name'] + ' Exists ')
// //             continue
// //         }
     
// //         characterMetadata['description'] = 'An adorable ' + breedName + ' pup';
        
// //         let image_to_upload;

// //         //For setting the env variable "export UPLOAD_IPFS=true"...
// //         console.log("IPFS ready : ", process.env.UPLOAD_IPFS)
// //         if(process.env.UPLOAD_IPFS){
// //             image_path = '../../img/'+ breedName.toLowerCase() + '.png';
// //             image_to_upload = await upload_to_ipfs(image_path)


// //             console.log("Returned URI : ", image_to_upload);
           
// //             characterMetadata.image = image_to_upload;
// //             console.log("METADATA with uri : ", characterMetadata);

// //             filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
// //             let data = JSON.stringify(characterMetadata)
// //             fs.writeFileSync(filename + '.json', data)

// //             json_to_upload = await upload_to_ipfs('../../' + filename + '.json');

// //             console.log("Storing This in URI file: ");
// //             uriMetadata = uriTemplet;
// //             uriMetadata[breedName] = json_to_upload;

// //             URIfilename = 'uri/' + 'URIjson'
// //             let URIdata = JSON.stringify(uriMetadata)
// //             fs.writeFileSync(URIfilename + '.json', URIdata)
// //         }

// //         // filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
// //         // let data = JSON.stringify(characterMetadata)
// //         // fs.writeFileSync(filename + '.json', data)
// //     }



// //     async function upload_to_ipfs(image_path){
// //         //image_path2 = '../../img/pug.png'
// //         console.log("Started Uploading to IPFS...", image_path)

// //         var img = fs.readFileSync(path.join(__dirname, image_path))
// //         console.log(img)
// //         var imghash
// //         var filename
// //         try {
// //             var res = await ipfs.add(img);
// //             if(res){
// //                 imghash = res[0].hash;
// //             } 
// //         } catch(err) {
// //             console.log("error while uploading", err);
// //         }
        
// //         filename = path.basename(image_path);
// //         uri = 'https://ipfs.io/ipfs/'+ imghash +'?filename='+ filename;

// //         console.log(uri)
// //         return uri;
// //     }

// //     //{"Name":"pug.png","Hash":"QmPQAkiHwT3AnzKWKAqww4JvoVYLP1dh9Z11Rj6vBa4TBc","Size":"8645"}
// //     //curl -X POST -F file=@img/pug.png http://localhost:5001/api/v0/add

// //     function upload_to_ipfs2(filePath){
// //         console.log("File Path: ", filePath)

// //         let data = new FormData();
// //         console.log("DataF : ", data)
// //         data.append("file", fs.createReadStream(filePath));

// //         console.log("Data : ", data);

// //         ipfs_url = "http://localhost:5001";

// //         const res = axios.post(ipfs_url+ "/api/v0/add", data, {
// //             maxContentLength: "Infinity", 
// //             headers: {
// //             "Content-Type": `multipart/form-data; boundary=${data._boundary}`
// //             },
// //         });
// //         console.log("Response Data : ", res.data);
// //     }

// //     function upload_to_ipfs3(filePath){
// //         console.log("function image Path: ", filePath)
// //         fs.readFile(filePath, 'utf8', (err, data) => {
// //             console.log("Data : ", data)
// //             ipfs_url = "http://localhost:5001";
        
// //         fetch(ipfs_url + "/api/v0/add", data)
// //         .then(function (response) {
// //             return response.json();
// //         })
// //         .then(function (myJson) {
// //             document.querySelector("#ipText").innerHTML = myJson.ip;
// //         })
// //         .catch(function (error) {
// //             console.log("Error: " + error);
// //         });
        
// //         response = request.post(ipfs_url + "/api/v0/add", files={"file":data})
// //         console.log("Response: ", response.JSON())
// //         })
// //     }

// //     callback(advanceCollectible)
// // }

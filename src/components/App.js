import { func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

import helpFun from '../scripts/helpful_scripts';
import fundT from '../scripts/advance_collectible/fund_collectible'
import createNFT from '../scripts/advance_collectible/create_collectible'
import createMetadata from '../scripts/advance_collectible/create_metadata'
import readJson from '../scripts/misc/filttest'

import AdvanceABI from '../abis/AdvanceCollectibles.json';
import LinkABI from '../abis/LinkTokenInterface.json';

const path = require("path");
const Provider = require('@truffle/hdwallet-provider');
const mnemonic = 'actual turtle provide away bamboo dad arrow devote knee mind cradle betray';
const provider = new Provider(mnemonic, 'https://rinkeby.infura.io/v3/c5a0caa6b6bc4b9783e5ef0f055aa538');

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [tokenC, setTokenC] = useState();
  const [nftC, setNftC] = useState();
  const [allNfts, setAllNfts] = useState([]);
  const [fileName, setFileName] = useState();
  const [fileHash, setFileHash] = useState("");

  const [name, setName] = useState("");
  const [nation, setNation] = useState("");
  const [cnic, setCnic] = useState("");
  const [age, setAge] = useState("");
  const [add, setAdd] = useState("");
  const [bname, setbName] = useState("");
  const [bnation, setbNation] = useState("");
  const [bcnic, setbCnic] = useState("");
  const [bage, setbAge] = useState("");
  const [badd, setbAdd] = useState("");
  const [date, setDate] = useState("");

  const [buffer, setBuffer] = useState();
  const [nftUri, setNftUri] = useState();
  const [metadataUri, setMetadataUri] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const [metadataUploaded, setMetadataUploaded] = useState(false);
  const [Acontract, setAcontract] = useState({});
  const [nftCreated, setNftCreated] = useState(true);

  //Load Blockchain...
  useEffect(() => {
    async function loadBlockchainData() {
      setLoading(true);
      const web3 = new Web3(provider);
      const network = await web3.eth.net.getNetworkType();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      setUser(accounts[0]);
      // console.log('network: ', network);
      // console.log("accounts:", accounts);
      // console.log("networkId: ", networkId);
      const advanceData = await AdvanceABI.networks[networkId];

      const AdvanceContract = new web3.eth.Contract(AdvanceABI.abi, advanceData.address);
      setAcontract(AdvanceContract);
      const linkA = await AdvanceContract.methods.LinkToken().call();

      // console.log("Acontract Address: ", AdvanceContract._address);
      // console.log("Link Address: ", linkA);

      const LinkContract = new web3.eth.Contract(LinkABI.abi, linkA);
      //      console.log("Link Token : ", LinkContract._address)
      let count = await AdvanceContract.methods.nftCount().call();
      for (var i = 0; i < count; i++) {
        let fnft = await AdvanceContract.methods.nfts(i).call()
        console.log(fnft)
        let aut = fnft.author;
        let des = fnft.desc;
        let id = fnft.id;
        let nfturi = fnft.nftUri;
        let obj = { aut, des, id, nfturi }
        const updateNfts = [
          ...allNfts,
          {
            author: aut,
            desc: des,
            id: id,
            nftUri: nfturi
          }
        ];
        setAllNfts(updateNfts)
      }

    }
    loadBlockchainData().then(() => {
      //loading false
      setLoading(false);
    });
  }, []);

  //Check And Load Metamask...
  useEffect(() => {
    async function loadMetamask() {
      console.log("General Effect")
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected Or change to ganache Network. You should trying MetaMask!')
      }
    }
    loadMetamask();
  });

  //Detact Metamask Account change activity...
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log("Cureent Account: ", accounts[0]);
      setUser(accounts[0])
    });
  }, []);

  function handleChangeName(e) {
    setName(e);
    console.log("name : ", name);
  }
  function handleChangeNation(e) {
    setNation(e);
    console.log("nation : ", nation);
  }
  function handleChangeCnic(e) {
    setCnic(e);
    console.log("cnic : ", cnic);
  }
  function handleChangeAge(e) {
    setAge(e);
    console.log("age : ", age);
  }
  function handleChangeAdd(e) {
    setAdd(e);
    console.log("add : ", add);
  }

  function handleChangebName(e) {
    setbName(e);
    console.log("bname : ", bname);
  }
  function handleChangebNation(e) {
    setbNation(e);
    console.log("bnation : ", bnation);
  }
  function handleChangebCnic(e) {
    setbCnic(e);
    console.log("bcnic : ", bcnic);
  }
  function handleChangebAge(e) {
    setbAge(e);
    console.log("bage : ", bage);
  }
  function handleChangebAdd(e) {
    setbAdd(e);
    console.log("badd : ", badd);
  }
  function handleChangeDate(e) {
    setDate(e);
    console.log("date : ", date);
  }


  async function fundTokenfile() {
    //FIRST WAY CORRECT
    setLoading(true)
    fundT().then((e) => {
      setLoading(false);
    });

    //SECOND WAY CORRECT
    //await fundT();
  }

  async function createNFTbtn() {
    setLoading(true);
    var created = createNFT().then(() => {
      setLoading(false);
    });
    console.log("Created : ", created)
    if (created) {
      setNftCreated(false);
      let tokenNum = await Acontract.methods.tokenCounter().call();
      setTokenC(tokenNum);
    }
  }

  async function createMDbtn() {
    const metadataTemple = {
      "image": "",
      "Groom Name": "",
      "Groom Nationality": "",
      "Groom CNIC": "",
      "Groom Age": "",
      "Groom Address": "",
      "Bride Name": "",
      "Bride Nationality": "",
      "Bride CNIC": "",
      "Bride Age": "",
      "Bride Address": "",
      "Marriage Date": ""
      // "attributes": [
      //   {
      //     "trait_type": "Strength",
      //     "value": 100
      //   }
      // ]
    };
    let characterMetadata = metadataTemple;
    let fileNoExt = fileName.substring(0, fileName.lastIndexOf('.'));
    let uri;
    console.log("File With Out Ext : ", fileNoExt);
    //characterMetadata['name'] = fileNoExt;

    characterMetadata['image'] = nftUri;
    characterMetadata['Groom Name'] = name;
    characterMetadata['Groom Nationality'] = nation;
    characterMetadata['Groom CNIC'] = cnic;
    characterMetadata['Groom Age'] = age;
    characterMetadata['Groom Address'] = add;
    characterMetadata['Bride Name'] = bname;
    characterMetadata['Bride Nationality'] = bnation;
    characterMetadata['Bride CNIC'] = bcnic;
    characterMetadata['Bride Age'] = bage;
    characterMetadata['Bride Address'] = badd;

    characterMetadata['Marriage Date'] = date;

    var buf = Buffer.from(JSON.stringify(characterMetadata));
    console.log("buffer : ", buf);

    ipfs.add(buf, (error, result) => {
      console.log("Result: ", result);
      if (error) {
        console.error(error);
        return;
      }
      console.log(result[0])
      let fh = result[0].hash
      setMetadataHash(fh);
      uri = 'https://ipfs.io/ipfs/' + fh + '?filename=' + fileNoExt + '.json';
      setMetadataUri(uri);

      console.log("UPDATING NFT UPLOADER IN CONTRACT...");
      Acontract.methods.nftUpload(uri, name).send({ from: user })
        .on("transactionHash", (hash) => {
          console.log("Tx After Setting in Contract: ", hash)
          if (hash) {
            setMetadataUploaded(true)
          }
        })
    });
    let nftN = await Acontract.methods.nftCount().call();
    setNftC(nftN)
  }

  function captureFile(event) {
    setLoading(true)
    event.preventDefault();
    //console.log("WINDOW: ",  window)
    console.log("EVENT.TARGET: ", event.target);
    const file = event.target.files[0]
    console.log("File IS : ", file.name);

    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      setBuffer(Buffer(e.target.result))
      console.log('Buffer : ', buffer)
      setLoading(false);
    }
    setFileName(file.name);
    console.log("file Name : ", fileName);
  }

  function submitToIPFS() {
    console.log("Submitting to IPFS: ", name)

    let uri
    ipfs.add(buffer, (error, result) => {
      console.log("Result: ", result);
      if (error) {
        console.error(error);
        return;
      }
      console.log(result[0])
      let fh = result[0].hash
      setFileHash(fh);
      uri = 'https://ipfs.io/ipfs/' + fh + '?filename=' + fileName;
      setNftUri(uri);
      // Acontract.methods.nftUpload(uri, desc).send({from: user})
      // .on("transactionHash", (hash) => {
      //   console.log("Tx After Setting in Contract: ", hash)
      // })
    })
  }

  async function setTokenUri() {
    const OPENSEA_FORMAT = "https://testnets.opensea.io/assets/"
    const contractAdd = await Acontract._address;
    console.log("Acontract Address : ", contractAdd);
    let tokenId = await Acontract.methods.tokenCounter().call();

    //tokenId = tokenId - 1;

    console.log("Deploying Token : ", tokenId);
    console.log("Metadata URI : ", metadataUri)
    let res;
    if (tokenId - nftC > 0) {
      res = await Acontract.methods.setTokenURI(nftC, metadataUri).send({ from: user });
      //nftCount++
    }
    else {
      res = await Acontract.methods.setTokenURI(tokenId, metadataUri).send({ from: user });
    }

    console.log("Result : ", res)

    console.log("Great!!! you can now see your NFT at " + OPENSEA_FORMAT + contractAdd + "/" + tokenId);
    console.log("Please be patient, wait for 20 mins and hit 'refresh metadata' button")
    setNftCreated(true);
    setFileName("");
    setBuffer("");
    setFileHash("");
    setNftUri("");
    setMetadataHash("");
    setMetadataUri("");
  }

  const el = <h5>Hello Crypto {user}</h5>

  if (loading) {
    return (
      <div>
        <h1>loading...</h1>
        <div class="loader"></div>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        {el}
      </header>
      <button onClick={fundTokenfile}>Fund The Token</button>
      <br />
      {(nftCreated) ? <button onClick={createNFTbtn}>Create NFT</button> : null}
      {(!nftCreated) ?
        <div>
          <form onSubmit={(event) => {
            event.preventDefault();
            //const desc = this.description.value;
            submitToIPFS();
          }}>
            <input
              type="file"
              //accept=".mp4, .mkv .ogg .wmv"
              onChange={captureFile}
              className="btn btn-success"
              style={{ width: '250px', margin: '0px 0px 10px 0px' }}
            />
            {/* <input
            type="text"
            name="index"
            onChange = {e => (handleChange(e.target.value))}
            //onChange = {e => (setIndex(e.target.value))}
          /> */}
            <input
              id="name"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangeName(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Name"
              required
            />
            <input
              id="nation"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangeNation(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Nation"
              required
            />
            <input
              id="cnic"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangeCnic(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Cnic"
              required
            />
            <input
              id="age"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangeAge(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Age"
              required
            />
            <input
              id="address"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangeAdd(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Address"
              required
            />

            <input
              id="bname"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangebName(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Bride Name"
              required
            />
            <input
              id="bnation"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangebNation(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Bride Nation"
              required
            />
            <input
              id="bcnic"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangebCnic(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Bride Cnic"
              required
            />
            <input
              id="bage"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangebAge(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Bride Age"
              required
            />
            <input
              id="baddress"
              type="text"
              className="form-control-sm"
              onChange={e => (handleChangebAdd(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Bride Address"
              required
            />

            <input
              id="date"
              type="date"
              className="form-control-sm"
              onChange={e => (handleChangeDate(e.target.value))}
              //ref={(input) => { this.description = input }}
              placeholder="Date"
              required
            />
            <button type="submit" >Upload To IPFS</button>
          </form>

          {(nftUri) ? <button onClick={createMDbtn}>Create Metadata</button> : null}
          {(metadataUploaded) ? <button onClick={setTokenUri}>Upload To Opensea</button> : null}
        </div>
        : null
      }
      <p>File Name : {fileName}</p>
      <p>Buffer : {buffer} </p>
      <p>File Hash : {fileHash}</p>
      <p>Nft Uri : <a href={nftUri}> {nftUri} </a></p>
      <p>Num Of NFTs : {nftC}</p>
      <p>Metadata Hash : {metadataHash}</p>
      <p>Metadata Uri : <a href={metadataUri}>{metadataUri}</a></p>
      <p>Num Of Tokens : {tokenC}</p>
      {/* <p>All Nfts : { allNfts }</p> */}

    </div>
  );
}

export default App;
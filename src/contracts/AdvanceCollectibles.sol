// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract AdvanceCollectibles is ERC721, VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    uint256 public tokenCounter;
    address public LinkToken;
    string public checkEx;
    uint256 public randNum;
    uint256 public nftCount = 0;

    event RequestedRandomness(bytes32 requestId);
    event RequestCollectible(bytes32 indexed requestId);
    event nftUploadedEvent(
        uint256 id,
        string nftUri,
        string desc,
        address uploader
    );

    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => string) public requestIdToTokenURI;
    //mapping(uint256 => NFT) public tokenIdToNft;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    mapping(uint256 => NFT) public nfts;

    struct NFT {
        uint256 id;
        string _uri;
        string nftUri;
        string name;
        string bname;
        string date;
        address author;
    }

    constructor(
        address _vrfCoordinatorAddress,
        address _linkTokenAddress,
        bytes32 _keyHash
    )
        public
        VRFConsumerBase(_vrfCoordinatorAddress, _linkTokenAddress)
        ERC721("Crypto Boy", "CBK")
    {
        keyHash = _keyHash;
        LinkToken = _linkTokenAddress;
        fee = 1.0 * 10**18;
        tokenCounter = 0;
    }

    string public mockVar;
    event myEvent(bytes32 requestId);

    // function getrequestIdToSender(bytes32 requestId) view public returns(address){
    //     return requestIdToSender[requestId];
    // }
    // function getrequestIdToTokenURI(bytes32 requestId) view public returns(string memory){
    //     return requestIdToTokenURI[requestId];
    // }
    // function gettokenIdToNft(uint32 tokenId) view public returns(Breed){
    //     return tokenIdToNft[tokenId];
    // }
    // function gettokenIdToNftStr(uint32 tokenId) view public returns(string memory){
    //     Breed breed = Breed(tokenId);

    //     if (Breed.PUG == breed) return "PUG";
    //     if (Breed.SHIBA_INU == breed) return "SHIBA_INU";
    //     if (Breed.ST_BERNARD == breed) return "ST_BERNARD";
    // }
    // function getrequestIdToTokenId(bytes32 requestId) view public returns(uint256){
    //     return requestIdToTokenId[requestId];
    // }

    function createNFT(string memory uri) public payable returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) > fee,
            "Not enough LINK - fill contract with Link"
        );
        bytes32 requestId;
        checkEx = uri;

        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenURI[requestId] = uri;
        emit RequestCollectible(requestId);

        return requestId;
    }

    //Whenever to set TokenUri call this function...
    function nftUpload(
        string memory _uri,
        string memory nftUri,
        string memory name,
        string memory bname,
        string memory date
    ) public {
        require(bytes(_uri).length > 0, "NFT Uri is not received");

        nfts[nftCount] = NFT(
            nftCount,
            _uri,
            nftUri,
            name,
            bname,
            date,
            msg.sender
        );
        nftCount++;

        emit nftUploadedEvent(nftCount, _uri, name, msg.sender);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        address nftOwner = requestIdToSender[requestId];
        string memory tokenURI = requestIdToTokenURI[requestId];
        randNum = randomNumber;
        uint256 newItemId = tokenCounter;

        _safeMint(nftOwner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter = tokenCounter + 1;
        //tokenIdToNft[newItemId] = nfts[newItemId];
        requestIdToTokenId[requestId] = newItemId;
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller owner or approved"
        );
        _setTokenURI(tokenId, tokenURI);
    }
}

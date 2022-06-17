// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TPG_NFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    IERC20 public ERC20Token;
    uint256 public rate = 100 * 10**18;  // have to hold 100 tokens for getting an NFT
    string metadataURI = "https://ipfs.io/ipfs/QmSV5nZLDEa7NxGiGnyorB4XG8UieJCAyRrBCneJ2xz5Aq";

    Counters.Counter private _tokenIdCounter;

    //mapping from token Id to token URIs
    mapping(uint256 => string) private _tokenURIs;

    //Sets the NFT name and symbol
    constructor(address _erc20Token) ERC721("TPG_TOKEN", "TPG") {
        ERC20Token = IERC20(_erc20Token);
    }

    // sets tokenURI of the tokenId
      function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token"); //tokenId must exist
        _tokenURIs[tokenId] = _tokenURI;
    }

    //safeMint mints tokenId and assigned it to the caller
    function safeMint() public  {
        //transfer the Erc20 token to the NFT contract 
        ERC20Token.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        //mints the NFT
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
    
        //WithdrawToken transfers all the token fron NFT contract to Owner address
       function withdrawToken() public onlyOwner {
        ERC20Token.transfer(msg.sender, ERC20Token.balanceOf(address(this)));
    }
}
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
    uint256 public rate = 100 * 10**18;  // have to hold 10 tokens for getting an NFT
    string metadataURI = "https://ipfs.io/ipfs/QmSV5nZLDEa7NxGiGnyorB4XG8UieJCAyRrBCneJ2xz5Aq";

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private _tokenURIs;
    constructor(address _erc20Token) ERC721("TPG_TOKEN", "TPG") {
        ERC20Token = IERC20(_erc20Token);
    }

      function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function safeMint() public  {
        ERC20Token.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
    
       function withdrawToken() public onlyOwner {
        ERC20Token.transfer(msg.sender, ERC20Token.balanceOf(address(this)));
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TPG_NFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    IERC20 public TPGToken;
    uint256 public rate = 100 * 10**18;  // have to hold 10 tokens for getting an NFT

    Counters.Counter private _tokenIdCounter;



    constructor(address _TPGToken) ERC721("TPG_NFT", "TPG") {
        TPGToken = IERC20(_TPGToken);
    }

    function safeMint() public  {
        TPGToken.transferFrom(msg.sender, address(this), rate);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }
    
       function withdrawToken() public onlyOwner {
        TPGToken.transfer(msg.sender, TPGToken.balanceOf(address(this)));
    }
}
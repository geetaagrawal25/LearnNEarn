// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Erc20_mint is ERC20, Ownable {
    
    //Setting our Erc20 token name and symbol, they can only be set once during construction call
    constructor() ERC20("KARMACREDITS", "KARMA") {
        _mint(msg.sender, 10000000 * (10**18)); //It will mint all the tokens to the owner address
    }

    //Owner can mint more tokens anytime by calling this function
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount); // 
    }
}
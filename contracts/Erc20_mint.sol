// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TESTINGBOT is ERC20, Ownable {
    
    constructor() ERC20("TESTINGBOT", "TBT") {
        _mint(msg.sender, 10000000 * (10**18));
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
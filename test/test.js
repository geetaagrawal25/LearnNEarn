const { expect } = require("chai");
const { ethers } = require("hardhat");

//import { ethers } from "ethers";

describe("Token to NFT", function () {
  it("Total minted token assign to owner", async function () {
    const [owner] = await ethers.getSigners();

    const erc20 = await ethers.getContractFactory("Erc20_mint")

    const hardhatErc20 = await erc20.deploy();
    const owner_balance = await hardhatErc20.balanceOf(owner.address);
    expect(owner_balance.to.equal(10000000));

  });

  it("Scholar can mint NFT", async function () {
    const [scholar] = await ethers.getSigners();

    const tokenToNft = await ethers.getContractFactory("tokenToNft");
    
    const hardhatTokenToNft = await tokenToNft.deploy();

    const scholar_mint = await hardhatToken.safeMint();
    
    const scholar_Bal = await hardhatToken.balanceOf(scholar);

    expect(scholar-Bal).to.equal(1);

  });

  it("Wthdraw function should transfer all token to owner", async function () {
    const [owner] = await ethers.getSigners();

    const tokenToNft = await ethers.getContractFactory("tokenToNft");
    
    const hardhatTokenToNft = await tokenToNft.deploy();
    console.log(hardhatTokenToNft);
  
    const withdraw = await hardhatToken.withdrawToken();

    
  });
});
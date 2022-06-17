const { expect } = require("chai");
const { ethers } = require("hardhat");

//import { ethers } from "ethers";

describe("Mint token and NFT", function () {
  it("Total minted token get assigned to owner", async function () {
    const [owner] = await ethers.getSigners();

    const Erc20_mint = await ethers.getContractFactory("Erc20_mint");

    const hardhatErc20 = await Erc20_mint.deploy();
    const owner_balance = await hardhatErc20.balanceOf(owner.address);
    expect(owner_balance.toString()).to.equal(ethers.utils.parseEther("10000000").toString());
  });

  it("Scholar can mint NFT", async function () {
    const [scholar] = await ethers.getSigners();

    const Erc20_mint = await ethers.getContractFactory("Erc20_mint");
    const hardhatErc20 = await Erc20_mint.deploy();
    
    const NFT = await ethers.getContractFactory("TPG_NFT");
    const hardhatTPG_NFT = await NFT.deploy(hardhatErc20.address);
    console.log(hardhatErc20.address);
    console.log(hardhatTPG_NFT.address);
    
    let txn = await hardhatErc20.connect(scholar).approve(hardhatTPG_NFT.address,ethers.utils.parseEther("10000"));
    await hardhatTPG_NFT.safeMint();
    
    const scholar_Bal = await hardhatTPG_NFT.balanceOf(scholar);
    expect(scholar-Bal).to.equal(1);

  });

  it("Wthdraw function should transfer all token to owner", async function () {
    const [owner] = await ethers.getSigners();
    const Erc20_mint = await ethers.getContractFactory("Erc20_mint");
    const hardhatErc20 = await Erc20_mint.deploy();
    
    const NFT = await ethers.getContractFactory("TPG_NFT");
    const hardhatTPG_NFT = await NFT.deploy(hardhatErc20.address);
      
    const owner_balance = await hardhatErc20.balanceOf(owner);
    const contract_balance = await hardhatErc20.balanceOf(hardhatTPG_NFT.address);

    await hardhatTPG_NFT.withdrawToken();
    const owner_newbalance = await hardhatErc20.balanceOf(owner);

    let total_bal = owner_balance+contract_balance;

    expect(owner_newbalance).to.equal(total_bal);
  });
});
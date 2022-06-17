import { useEffect, useState } from 'react';
import React, { Component }  from 'react';
import './App.css';
import erc20contract from './contracts/Erc20_mint.json';
import nftContract from './contracts/TPG_NFT.json';


import { ethers } from 'ethers';

const erc20ContractAddress = "0xA00fDCF9cb911D1f23c19bde597e3c7748FF1330";
const erc20Abi = erc20contract.abi;

const nftContractAddress = "0x2b9D4d8878A8fDF40f50dCcDa565F41833EcC9cE";
const nftAbi = nftContract.abi;

let erc20balance=0;
function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);

        console.log("Initialize payment by signer" );
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
          const account = accounts[0];
        console.log(account);
        //let txn = await nftContract.mintNFT(1, { value: ethers.utils.parseEther("0.01") });
        //let txn1 = await erc20contract.connect(signer).approve(nftContractAddress,ethers.utils.parseEther("10000"));
        let txn = await nftContract.safeMint()
        //let txn = await nftContract.withdrawToken();//account, 1);
        console.log("sending the value of the KARMA... please wait");
        //await txn.wait();
		alert("Congratulations! NFT has been bought by you & ownership is changed to you, you can enter the Linux event with a discount of 65%");
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }
    }
    } catch (err) {
      console.log(err);
    }
  }

  
  const listAccountDetailsHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        //const signer = provider.getSigner();
        const erc20Contract = new ethers.Contract(erc20ContractAddress, erc20Abi, provider);
        console.log("contract name = " + await erc20Contract.name() + "contract symbol " + await erc20Contract.symbol() + 
        " the total supply is " + erc20Contract.totalSupply());

        const test = await provider.send("eth_requestAccounts", []);
        console.log("theseare accounts " + test);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const balance = await erc20Contract.balanceOf(signerAddress);
        console.log("balance" + balance);
        erc20balance = balance/10 ** 18;
        document.getElementById("tokenbalanceui").value = erc20balance;
        //console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
       <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
         Mint NFT
       </button>
      
	  
    )
  }

  
  const listAccountDetailsButton = () => {
    return (
      
      <button onClick={listAccountDetailsHandler} className='cta-button mint-nft-button'>
        List KARMA Tokens
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Learn & Earn - with Karma credits!</h1>
      <div>
      </div>
	  
	  
	  
	
	  
      <div>
      <h2>This button when clicked will show you the list of the ERC 20 tokens you have in your account - </h2>
      <input text id="tokenbalanceui"></input>
        {currentAccount ? listAccountDetailsButton() : connectWalletButton()}
      </div>

<div><br></br><br></br>BUY TICKETS TO LINUX EVENTS WHICH ARE PAID IN GENERAL</div>
      <div class="card" data-groups="[&quot;people&quot;]"><a href="image-detail.html">
          <figure class="pp-effect"><img class="img-fluid" src="images/coupon.jpg" alt="People"/>
            <figcaption>
              <div class="h4">Linux NFT Enabled</div>
              <p>Discounts</p>
            </figcaption>
          </figure></a></div>
		  <div>
           {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>

    </div>
  )
}

export default App;

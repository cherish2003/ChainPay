import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Web3 from "web3";
import TokenTransferorABI from "../Contracts/TokenTransferor_compData.json"; // Load your contract's ABI
import { WalletContext } from "../context/WalletContext.jsx"; // Load your contract's ABI
// import "./App.css";

const HeroSection = () => {
  const { setWallet } = useContext(WalletContext);
  const Navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    console.log(account);
    console.log(web3);
  }, [account]);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed and accessible
      if (window.ethereum) {
        // Initialize Web3
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request access to MetaMask accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Retrieve user's account address
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setWallet(accounts[0]);
        // const ac= await
      } else {
        // MetaMask is not installed or not accessible
        alert("Please install MetaMask to connect your wallet.");
      }
      Navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="flex mb-40 flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl text-white sm:text-6xl lg:text-7xl text-center tracking-wide">
        ChainPay
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          Blockchain Empowered
        </span>
      </h1>

      <p className="mt-10 text-lg text-center  max-w-4xl">
        ChainPay streamlines transactions through blockchain technology,
        ensuring unparalleled security and efficiency. Experience the simplicity
        and safety of payments redefined.
      </p>
      <div className="flex justify-center my-10">
        <button
          type="submit"
          className="animate-rotate-x py-3 px-4 mx-3 rounded-md border"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

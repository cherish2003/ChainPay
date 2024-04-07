import React, { useEffect, useState } from "react";
import Web3 from "web3";
import TokenTransfer from "../Contracts/TokenTransferor_compData.json"; // Import the contract ABI
import { contractBytecode } from "/Users/cherish/Desktop/ChainPay/src/Contracts/ContractBytecode.js";

function DumCOm() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [contractInstance, setcontractInstance] = useState(null);
  const [ccipBalance, setCcipBalance] = useState(0);

  const [routerAddress, setRouterAddress] = useState("");

  const [linkContractAddress, setLinkContractAddress] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        // Modern dapp browsers
        const ethereum = window.ethereum;
        try {
          // Request account access if needed
          await ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        // Non-dapp browsers
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    initWeb3();
  }, []);
  useEffect(() => {
    if (web3 && contractAddress) {
      // Instantiate the contract
      const contractInstance = new web3.eth.Contract(
        TokenTransfer,
        contractAddress
      );
      setcontractInstance(contractInstance);
      console.log(contractInstance);
    }
  }, [web3, contractAddress]);

  const deployContract = async () => {
    try {
      if (!web3) return;
      if (!routerAddress || !linkContractAddress) {
        alert("Please enter router address and LINK contract address.");
        return;
      }

      const accounts = await web3.eth.getAccounts();
      const Contract = new web3.eth.Contract(TokenTransfer);

      // Deploy contract using provided router and LINK contract addresses
      const deployedContract = await Contract.deploy({
        data: "0x" + contractBytecode, // Provide contract bytecode
        arguments: [routerAddress, linkContractAddress], // Pass router and LINK contract addresses as constructor arguments
      }).send({
        from: accounts[0], // Use the first account from MetaMask
        gas: 5000000, // Adjust gas as needed
      });

      // Update contract state with deployed contract
      setContract(deployedContract);

      // Update contract address state
      setContractAddress(deployedContract.options.address);
      console.log(contract);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };
  const handleContractAddressChange = (event) => {
    setContractAddress(event.target.value);
  };
  useEffect(() => {
    const fetchCcipBalance = async () => {
      try {
        if (!contract) return;
        // Call the ccipTokenBalance() function
        const balance = await contract.methods.ccipTokenBalance().call();
        setCcipBalance(balance);
      } catch (error) {
        console.error("Error fetching CCIP token balance:", error);
      }
    };

    if (contract) {
      fetchCcipBalance();
    }
  }, [contract]);
  const transferTokens = async () => {
    try {
      if (!contract) return;
      const accounts = await web3.eth.getAccounts();

      // Example: Call a contract function
      await contract.methods.ccipTokenBalance().send({ from: accounts[0] });

      console.log("Transaction successful");
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };
  const [tokenContract, setTokenContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchContractEvents = async () => {
      // Create a new Web3 instance

      // Instantiate the contract using its ABI and address
      const tokenTransferorContract = new web3.eth.Contract(
        TokenTransfer, // Use the imported ABI
        "0x1B0Fb486C32E48BcB895efC494bFE195F554614C" // Replace with your contract address
      );

      try {
        // Retrieve all past events of the TokensTransferred event
        const events = await tokenTransferorContract.getPastEvents(
          "TokensTransferred",
          {
            fromBlock: 0, // The block number to start searching from (0 for genesis block)
            toBlock: "latest", // The block number to search up to (latest for the most recent block)
          }
        );

        // Update the state with the retrieved events
        setEvents(events);
      } catch (error) {
        console.error("Error fetching contract events:", error);
      }
    };

    fetchContractEvents();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  useEffect(() => {
    const init = async () => {
      // Initialize Web3
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          const web3 = window.web3;
          // Get the network ID
          const networkId = await web3.eth.net.getId();
          // Get the deployed network data
          const deployedNetwork = TokenTransfer.networks[networkId];
          // Initialize contract
          const contract = new web3.eth.Contract(
            TokenTransfer.abi,
            deployedNetwork && deployedNetwork.address
          );
          setTokenContract(contract);
        } catch (error) {
          // User denied account access
          console.error("User denied account access:", error);
        }
      } else if (window.web3) {
        // Legacy dapp browsers...
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // Non-dapp browsers...
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    init();
  }, []);

  const getBalance = async () => {
    try {
      // Get contract balance using the contract instance
      const balance = await contractInstance.methods.ccipTokenBalance().call();
      console.log("Contract balance:", balance);
      return balance;
    } catch (error) {
      console.error("Error getting contract balance:", error);
      throw error; // Throw error for handling in the caller function
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <header className="App-header">
        <h1>Deploy Contract</h1>
        <div>
          <label>Router Address:</label>
          <input
            type="text"
            value={routerAddress}
            onChange={(e) => setRouterAddress(e.target.value)}
          />
        </div>
        <div>
          <label>LINK Contract Address:</label>
          <input
            type="text"
            value={linkContractAddress}
            onChange={(e) => setLinkContractAddress(e.target.value)}
          />
        </div>
        <button onClick={deployContract}>Deploy Contract</button>
        {contractAddress && <p>Contract deployed at: {contractAddress}</p>}
        <div>CCIP Balance: {ccipBalance}</div>
        <p>Token Balance: {balance}</p>
        <input
          type="text"
          placeholder="Enter Contract Address"
          value={contractAddress}
          onChange={handleContractAddressChange}
        />
        <button onClick={transferTokens}>Transfer Tokens</button>
        <button onClick={getBalance}>getBalance</button>
      </header>
    </div>
  );
}

export default DumCOm;

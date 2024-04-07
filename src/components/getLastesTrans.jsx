import React, { useEffect, useState } from "react";
import Web3 from "web3";
import TokenTransfer from "../Contracts/TokenTransferor_compData.json"; // Import the contract ABI
import { contractBytecode } from "/Users/cherish/Desktop/ChainPay/src/Contracts/ContractBytecode.js";

const ContractEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchContractEvents = async () => {
      // Create a new Web3 instance
      const web3 = new Web3("0x1B0Fb486C32E48BcB895efC494bFE195F554614C"); // Use Web3.givenProvider for browser environments or specify your Ethereum node URL

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

  return (
    <div>
      <h2>Contract Events</h2>
      <ul>
        {/* {events.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default ContractEvents;

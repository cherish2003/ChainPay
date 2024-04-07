import { useState, useEffect, useContext } from "react";
import Web3 from "web3";

import "./index.scss";
import { WalletContext } from "../../context/WalletContext";
function BlockTable() {
 const [contractInstance, setContractInstance] = useState(null);

 useEffect(() => {
   // Initialize Web3 and create contract instance
   const initWeb3 = async () => {
     if (window.ethereum) {
       const web3 = new Web3(window.ethereum);
       try {
         await window.ethereum.request({ method: "eth_requestAccounts" });
         const contractInstance = new web3.eth.Contract(
           TokenTransfer,
           contract?.contractAddress
         );
         setContractInstance(contractInstance);
       } catch (error) {
         console.error("User denied account access");
       }
     } else {
       console.log("Non-Ethereum browser detected.");
     }
   };

   initWeb3();
 }, []);

  const merchantObject = [
    {
      id: 1,
      imgS: "https://docs.chain.link/assets/chains/avalanche.svg",
      name: "Fuji Testnet",
      routerAddress: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
      chainselector: "14767482510784806043",
    },
    {
      id: 2,
      imgS: "https://docs.chain.link/assets/chains/bnb-chain.svg",
      name: "BNB Chain testnet",
      routerAddress: "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f",
      chainselector: "13264668187771770619",
    },
    {
      id: 3,
      imgS: "https://docs.chain.link/assets/chains/ethereum.svg",
      name: "Sepolia testnet",
      routerAddress: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
      chainselector: "16015286601757825753",
    },
    {
      id: 4,
      imgS: "https://docs.chain.link/assets/chains/arbitrum.svg",
      name: "Arbitrum Sepolia testnet",
      routerAddress: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
      chainselector: "3478487238524512106",
    },
    {
      id: 5,
      imgS: "https://docs.chain.link/assets/chains/base.svg",
      name: "Base Sepolia testnet",
      routerAddress: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",

      chainselector: "10344971235874465080",
    },
    {
      id: 6,
      imgS: "https://docs.chain.link/assets/chains/kroma.svg",
      name: "Kroma Sepolia testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "5990477251245693094",
    },
    {
      id: 7,
      imgS: "https://docs.chain.link/assets/chains/optimism.svg",
      name: "Optimism Sepolia testnet",
      routerAddress: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
      chainselector: "5224473277236331295",
    },
    {
      id: 8,
      imgS: " https://docs.chain.link/assets/chains/polygon.svg",
      name: "Mumbai testnet",
      routerAddress: "0x1035CabC275068e0F4b745A29CEDf38E13aF41b1",
      chainselector: "12532609583862916517",
    },
    {
      id: 9,
      imgS: "https://docs.chain.link/assets/chains/wemix.svg",
      name: "Wemix testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "9284632837123596123",
    },

    {
      id: 10,
      imgS: " https://docs.chain.link/assets/chains/gnosis-chain.svg",
      name: "Gnosis Chiado testnet",
      routerAddress: "0x19b1bac554111517831ACadc0FD119D23Bb14391",
      chainselector: "8871595565390010547",
    },
  ];

  const {
    contract,
    setContractVal,
    account,
    Cinstance,
    statuses,
    setStatuses,
  } = useContext(WalletContext);
  console.log(account);
  console.log(Cinstance);

  async function callAllowlistDestinationChain(chainSelector, allowed) {
    try {
      // Call the allowlistDestinationChain function
      const result = await Cinstance.methods
        .allowlistDestinationChain(chainSelector, allowed)
        .send({ from: account }); // Specify the account address from which you are making the transaction

      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error calling allowlistDestinationChain:", error);
    }
  }

  async function handleDeploy(chainSelector) {
    console.log("Deploying for chain ID:", chainSelector);
    callAllowlistDestinationChain(chainSelector, true); // Assuming you want to set it as allowed
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [chainSelector]: "Active",
    }));
  }

  return (
    <>
      <div className=" mt-[3rem] bg-[#1E1E1E] p-4 pb-8">
        <div className="mt-8 h-[19rem] overflow-y-auto border border-gray-300 rounded table-containe">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full border-collapse rounded-lg">
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="border-b-2 border-gray-600 px-4 py-2 rounded-tl-lg">
                    Blockchain
                  </th>
                  <th className="border-b-2 border-gray-600 px-4 py-2">
                    Chain ID
                  </th>
                  <th className="border-b-2 border-gray-600 px-4 py-2">
                    Button
                  </th>
                  <th className="border-b-2 border-gray-600 px-4 py-2 rounded-tr-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1E1E1E] text-white">
                {/* Dummy data */}
                {merchantObject.map((item) => (
                  <tr key={item.id}>
                    <td className="border-gray-600 px-4 py-2">
                      <div className="flex items-center">
                        <span className="mr-2">{item.name}</span>
                        <img
                          className="h-4 w-4"
                          src={item.imgS}
                          alt="Blockchain Icon"
                        />
                      </div>
                    </td>
                    <td className="border-gray-600 px-4 py-2 text-center">
                      {item.chainselector}
                    </td>
                    <td className="border-gray-600 px-4 py-2 text-center">
                      <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm ${
                          statuses[item.chainselector] === "Active"
                            ? "opacity-50"
                            : null
                        }`}
                        onClick={() => handleDeploy(item.chainselector)}
                        disabled={statuses[item.chainselector] === "Active"}
                      >
                        Active
                      </button>
                    </td>
                    <td className="border-gray-600 px-4 py-2 text-center rounded-br-lg">
                      {statuses[item.chainselector] === "Active" ? (
                        <span className="text-green-500 animate-pulse">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-500 animate-pulse">
                          Not Active
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockTable;

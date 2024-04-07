import React, { useState, useContext, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { setMerchantValue } from "../../../utils/Redux/slices/merchantSlice";
import { useSelector, useDispatch } from "react-redux";
import { WalletContext } from "/Users/cherish/Desktop/ChainPay/src/context/WalletContext.jsx";
import TokenTransfer from "/Users/cherish/Desktop/ChainPay/src/Contracts/TokenTransferor_compData.json";

import Web3 from "web3";

function TokenPay() {
  const { contract, Cinstance, account } = useContext(WalletContext);
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
    console.log(contract);
  }, []);

  const merchantObject = [
    {
      id: 1,
      name: "Fuji Testnet",
      routerAddress: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
      chainselector: "14767482510784806043",
      Link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    },
    {
      id: 2,
      name: "BNB Chain testnet",
      routerAddress: "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f",
      chainselector: "13264668187771770619",
      Link: "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
    },
    {
      id: 3,
      name: "Sepolia testnet",
      routerAddress: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
      chainselector: "16015286601757825753",
      Link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    {
      id: 4,
      name: "Arbitrum Sepolia testnet",
      routerAddress: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
      chainselector: "3478487238524512106",
      Link: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    },
    {
      id: 5,
      name: "Base Sepolia testnet",
      routerAddress: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
      chainselector: "10344971235874465080",
      Link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    },
    {
      id: 6,
      name: "Kroma Sepolia testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "5990477251245693094",
      Link: "0xa75cca5b404ec6f4bb6ec4853d177fe7057085c8",
    },
    {
      id: 7,
      name: "Optimism Sepolia testnet",
      routerAddress: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
      chainselector: "5224473277236331295",
      Link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    },
    {
      id: 8,
      name: "Mumbai testnet",
      routerAddress: "0x1035CabC275068e0F4b745A29CEDf38E13aF41b1",
      chainselector: "12532609583862916517",
      Link: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    {
      id: 9,
      name: "Wemix testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "9284632837123596123",
      Link: "0x3580c7a817ccd41f7e02143bfa411d4eeae78093",
    },

    {
      id: 10,
      name: "Gnosis Chiado testnet",
      routerAddress: "0x19b1bac554111517831ACadc0FD119D23Bb14391",
      chainselector: "8871595565390010547",
      Link: "0xDCA67FD8324990792C0bfaE95903B8A64097754F",
    },
  ];
  // Define state variables for input values
  const dispatch = useDispatch();

  const [destinationSelector, setDestinationSelector] = useState("dummy_value");
  const [chainID, setChainID] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("dummy_value");
  const [amount, setAmount] = useState("1000000000000000");
  const merchant = useSelector((state) => state.merchant);

  function handleChange(e) {
    console.log(e.target.value);
    merchantObject.map((item) => {
      if (item.name == e.target.value) {
        dispatch(setMerchantValue(item));
      }
    });
  }
  const handlePayToken = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Ensure contract instance is available
      // if (!contractInstance) {
      //   console.error("Contract instance not available");
      //   return;
      // }

      const destinationChainSelector = parseInt(merchant.chainselector);
      const tokenAddress = "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05";
      const amountToSend = amount.toString();

      // Call the transferTokensPayLINK function
      const result = await contractInstance.methods
        .transferTokensPayLINK(
          destinationChainSelector,
          receiverAddress,
          tokenAddress,
          amountToSend
        )
        .send({ from: account });

      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };
  return (
    <>
      <div className="relative">
        <div className="flex items-center absolute top-0 left-0 w-full">
          <h2 className="text-yellow-400 font-bold italic animate-pulse fancy-text">
            Powered by
          </h2>
          <img
            src={logo}
            alt=""
            className="w-10 h-10 ml-2 filter drop-shadow-md"
          />
        </div>
      </div>
      <div className="flex mb-[8rem] items-center mt-[6rem] justify-center h-[70vh]">
        {" "}
        {/* Adjusted margin top */}
        <div className="form-container bg-gray-800 w-[25rem] rounded-lg p-6 border-2 border-transparent shadow-lg">
          {" "}
          {/* Adjusted width and padding */}
          <div className="border-b-2 border-gray-600 mb-4 pb-2 flex items-center justify-center">
            <h1 className="text-center text-blue-500 text-2xl font-semibold mb-2">
              Final Step
            </h1>
          </div>
          <div className="p-2">
            <form className="flex flex-col items-center justify-center">
              <div className="mb-2 w-full">
                <label className="text-white mb-1">
                  Destination Selector(Your current blockchain)
                </label>{" "}
                {/* Added margin bottom */}
                <div>
                  <select
                    onChange={handleChange}
                    name=""
                    id=""
                    className="bg-[#383854] text-white border border-gray-300 rounded-md py-2 px-6"
                  >
                    {merchantObject
                      ? merchantObject.map((item) => {
                          return (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div className="mb-2 w-full">
                <label className="text-white mb-1">Chain ID</label>{" "}
                {/* Added margin bottom */}
                <input
                  disabled
                  type="text"
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Chain ID"
                  value={merchant.chainselector}
                />
              </div>
              <div className="mb-2 w-full">
                <label className="text-white mb-1">Receiver Address</label>{" "}
                {/* Added margin bottom */}
                <input
                  type="text"
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Receiver Address"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                />
              </div>
              <div className="mb-2 w-full">
                <label className="text-white mb-1">
                  Token Address of Merchant
                </label>{" "}
                {/* Added margin bottom */}
                <input
                  type="text"
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Token Address of Merchant"
                  value={contract?.Link}
                  disabled // Disable the input field
                />
              </div>
              <div className="mb-2 w-full">
                <label className="text-white mb-1">Amount</label>{" "}
                {/* Added margin bottom */}
                <input
                  type="text"
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Amount"
                  defaultValue={1000000000000000}
                  value={amount}
                />
              </div>
              <button
                className="bg-blue-800 mt-2 text-white rounded-full py-3 px-6 shadow-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out"
                onClick={(e) => handlePayToken(e)}
              >
                Pay Token Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenPay;

import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMerchantValue } from "../../utils/Redux/slices/merchantSlice";
import "react-dropdown/style.css";
import BlockTable from "./BlockTable";
import "./index.scss";
import { contractBytecode } from "/Users/cherish/Desktop/ChainPay/src/Contracts/ContractBytecode.js";
import { WalletContext } from "/Users/cherish/Desktop/ChainPay/src/context/WalletContext.jsx";
import TokenTransfer from "/Users/cherish/Desktop/ChainPay/src/Contracts/TokenTransferor_compData.json";
import Web3 from "web3";

function SelectMerchant() {
  const [web3, setWeb3] = useState(null);

  const merchantObject = [
    {
      id: 1,
      name: "Fuji Testnet",
      routerAddress: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
      chainselector: "14767482510784806043",
      Ctok: "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
      Link: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    },
    {
      id: 2,
      name: "BNB Chain testnet",
      routerAddress: "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f",
      chainselector: "13264668187771770619",
      Ctok: "0xbFA2ACd33ED6EEc0ed3Cc06bF1ac38d22b36B9e9",
      Link: "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
    },
    {
      id: 3,
      name: "Sepolia testnet",
      routerAddress: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
      chainselector: "16015286601757825753",
      Ctok: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
      Link: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
    {
      id: 4,
      name: "Arbitrum Sepolia testnet",
      routerAddress: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
      chainselector: "3478487238524512106",
      Ctok: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      Link: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    },
    {
      id: 5,
      name: "Base Sepolia testnet",
      routerAddress: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
      chainselector: "10344971235874465080",
      Ctok: "0x88A2d74F47a237a62e7A51cdDa67270CE381555e",
      Link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    },
    {
      id: 6,
      name: "Kroma Sepolia testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "5990477251245693094",
      Ctok: "0x6AC3e353D1DDda24d5A5416024d6E436b8817A4e",
      Link: "0xa75cca5b404ec6f4bb6ec4853d177fe7057085c8",
    },
    {
      id: 7,
      name: "Optimism Sepolia testnet",
      routerAddress: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
      chainselector: "5224473277236331295",
      Ctok: "0x8aF4204e30565DF93352fE8E1De78925F6664dA7",
      Link: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    },
    {
      id: 8,
      name: "Mumbai testnet",
      routerAddress: "0x1035CabC275068e0F4b745A29CEDf38E13aF41b1",
      chainselector: "12532609583862916517",
      Ctok: "0xc1c76a8c5bFDE1Be034bbcD930c668726E7C1987",
      Link: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    },
    {
      id: 9,
      name: "Wemix testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "9284632837123596123",
      Ctok: "0xF4E4057FbBc86915F4b2d63EEFFe641C03294ffc",
      Link: "0x3580c7a817ccd41f7e02143bfa411d4eeae78093",
    },

    {
      id: 10,
      name: "Gnosis Chiado testnet",
      routerAddress: "0x19b1bac554111517831ACadc0FD119D23Bb14391",
      chainselector: "8871595565390010547",
      Ctok: "0xA189971a2c5AcA0DFC5Ee7a2C44a2Ae27b3CF389",
      Link: "0xDCA67FD8324990792C0bfaE95903B8A64097754F",
    },
  ];
  const { contract, setContractVal, setWallet, setContractinT, Cinstance } =
    useContext(WalletContext);
  console.log(contract);
  const [isActive, setIsActive] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [contractAddress, setContractAddress] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [deploying, setDeploying] = useState(false); // Added state for deployment status
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
      if (contract) {
        setDeployed(true);
      }
    };

    initWeb3();
  }, []);
  const merchant = useSelector((state) => state.merchant);
  console.log("hello ji", merchant);
  const dispatch = useDispatch();

  const options = ["one", "two", "three", "four"];
  const defaultOption = options[0];

  function handleChange(e) {
    console.log(e.target.value);
    merchantObject.map((item) => {
      if (item.name == e.target.value) {
        dispatch(setMerchantValue(item));
      }
    });
  }
  useEffect(() => {
    if (web3 && contractAddress) {
      // Instantiate the contract
      const contractInstance = new web3.eth.Contract(
        TokenTransfer,
        contractAddress
      );
      setContractinT(contractInstance);
      console.log(contractInstance);
    }
  }, [web3, contractAddress]);

  const deployContract = async (routerAddress, linkContractAddress) => {
    try {
      if (!web3) return;
      if (!routerAddress || !linkContractAddress) {
        alert("Please enter router address and LINK contract address.");
        return;
      }
      console.log(routerAddress, linkContractAddress);
      const accounts = await web3.eth.getAccounts();
      const Contract = new web3.eth.Contract(TokenTransfer);

      // Set deploying state to true while deploying
      setDeploying(true);

      // Deploy contract using provided router and LINK contract addresses
      const deployedContract = await Contract.deploy({
        data: "0x" + contractBytecode, // Provide contract bytecode
        arguments: [routerAddress, linkContractAddress], // Pass router and LINK contract addresses as constructor arguments
      }).send({
        from: accounts[0], // Use the first account from MetaMask
        gas: 5000000, // Adjust gas as needed
      });

      setWallet(accounts[0]);
      // Update contract state with deployed contract
      setContractVal({
        name: merchant.name,
        routerAddress: merchant.routerAddress,
        chainselector: merchant.chainselector,
        Ctok: merchant.Ctok,
        Link: merchant.Link,
        contractAddress: deployedContract.options.address,
      });
      setContractAddress(deployedContract.options.address);

      // Update contract address state
      console.log(deployedContract.options.address);
      console.log(contract);

      // Set deployed state to true after deployment
    } catch (error) {
      console.error("Error deploying contract:", error);
      setIsButtonDisabled(false);
    } finally {
      // Reset deploying state after deployment attempt
      setDeploying(false);
    }
  };

  const handleDeployment = async () => {
    setIsButtonDisabled(true);
    deployContract(merchant.routerAddress, merchant.Link);
    setDeployed(true);
  };
  return (
    <>
      <div className="bg-[#1E1E1E] p-4 pb-8">
        <div className="">
          <h2 className="text-lg text-white ">Select Blockchain</h2>
        </div>
        <div
          id="selectMerchant"
          className="flex p-20 items-center justify-between  rounded-md p-4"
        >
          <div>
            <select
              onChange={handleChange}
              name=""
              id=""
              className="bg-[#383854] text-white border border-gray-300 rounded-md py-2 px-4"
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

          <div className="text-white ml-4">
            <div className="">
              Merchant Selected:{" "}
              <span className="text-green-500">{merchant.name}</span>
            </div>
            <div>
              Router Address:{" "}
              <span className="text-blue-500">{merchant.routerAddress}</span>
            </div>
            <div>
              Chain ID:{" "}
              <span className="text-yellow-500">{merchant.chainselector}</span>
            </div>
            <div>
              Link Contract ID:{" "}
              <span className="text-orange-400">{merchant.Link}</span>
            </div>
          </div>
        </div>
        <button
          className={`button ${isActive ? "active" : ""} ${
            isFinished ? "finished" : ""
          }`}
          disabled={isButtonDisabled}
          onClick={handleDeployment}
        >
          {deploying ? (
            <span className="deploying">Deploying...</span>
          ) : deployed ? (
            <span className="deployed">Deployed</span>
          ) : (
            <span className="submit">Deploy</span>
          )}
        </button>

        <div style={{ marginTop: "10px", color: "white" }}>
          Note: The testnet which your selecting and deploying your merchant
          store will hosted on that chain
        </div>

        <div style={{ marginTop: "10px", color: "white" }}>
          Contract Address:{contract?.contractAddress}
        </div>
      </div>
    </>
  );
}

export default SelectMerchant;

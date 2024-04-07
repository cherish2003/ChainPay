import "./Cards.css";
import { WalletContext } from "/Users/cherish/Desktop/ChainPay/src/context/WalletContext.jsx";
import { useState, useContext, useEffect } from "react";

const Cards = () => {
  const { contract, setContractVal, setWallet, setContractinT, Cinstance } =
    useContext(WalletContext);
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
  return (
    <section className="content-area-top">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title  ">Blockchain Selected</h4>
      </div>

      {merchantObject.map((merchant) => (
        <div key={merchant.id}>
          {merchant.name === contract?.name && (
            <img className="merchant-card" src={merchant.imgS} />
          )}

          {/* Render other merchant details here */}
        </div>
      ))}
    </section>
  );
};

export default Cards;

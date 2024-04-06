import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {setMerchantValue} from "../../utils/Redux/slices/merchantSlice"
import "react-dropdown/style.css";

function SelectMerchant() {
//   const [merchant, setMerchant] = useState({
//     name:" ",
//     routerAddress: "",
//     chainselector: "",
//   });

const merchant=useSelector((state) => state.merchant);
console.log("hello ji",merchant);
const dispatch = useDispatch()




  const options = ["one", "two", "three"];
  const defaultOption = options[0];
  const merchantObject = [
    {
        id:1,
      name: "Fuji Testnet",
      routerAddress: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
      chainselector: "14767482510784806043",
    },
    {
        id:2,
      name: "BNB Chain testnet",
      routerAddress: "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f",
      chainselector: "13264668187771770619",
    },
    {
        id:3,
      name: "Sepolia testnet",
      routerAddress: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
      chainselector: "16015286601757825753",
    },
    {
        id:4,
      name: "Arbitrum Sepolia testnet",
      routerAddress: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
      chainselector: "3478487238524512106",
    },
    {
        id:5,
      name: "Base Sepolia testnet",
      routerAddress: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",

      chainselector: "10344971235874465080",
    },
    {
        id:6,
      name: "Kroma Sepolia testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "5990477251245693094",
    },
    {
        id:7,
      name: "Optimism Sepolia testnet",
      routerAddress: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
      chainselector: "5224473277236331295",
    },
    {
        id:8,
      name: "Mumbai testnet",
      routerAddress: "0x1035CabC275068e0F4b745A29CEDf38E13aF41b1",
      chainselector: "12532609583862916517",
    },
    {
        id:9,
      name: "Wemix testnet",
      routerAddress: "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D",
      chainselector: "9284632837123596123",
    },

    {
        id:10,
      name: "Mumbai testnet",
      routerAddress: "0x19b1bac554111517831ACadc0FD119D23Bb14391",
      chainselector: "8871595565390010547",
    },
  ];
  
  function handleChange(e) {
    console.log(e.target.value);
    merchantObject.map((item) => {
      if (item.routerAddress == e.target.value) {
        // setMerchant({
        //   name:item.name,
        //   routerAddress: item.routerAddress,
        //   chainselector: item.chainselector,
        // });
        dispatch(setMerchantValue(item))
      }
    });
  }

  return (
    <>
    <div className="bg-[#1E1E1E] p-4 pb-8">
    <div className="">
        <h2 className="text-lg text-white ">Select Merchant</h2>
    </div>
    <div id="selectMerchant" className="flex p-20 items-center justify-between  rounded-md p-4">
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
                  <option key={item.id} value={item.routerAddress}>
                    {item.name}
                  </option>
                );
              })
            : null}
        </select>
      </div>
  
      <div className="text-white ml-4">
        <div className="font-bold">Merchent Selected: {merchant.name}</div>
        <div>Router Address:  {merchant.routerAddress}</div>
        <div>Chain Selector: {merchant.chainselector}</div>
      </div>
    </div>
    </div>
    
  </>
  
  );
}

export default SelectMerchant;

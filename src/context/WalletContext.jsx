import React, { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import TokenTransferorABI from "../Contracts/TokenTransferor_compData.json";

export const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [statuses, setStatuses] = useState({});
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [Cinstance, setCinstance] = useState(null);

  // Load account and contract from local storage on component mount
  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    const storedContract = localStorage.getItem("contract");

    if (storedAccount) setAccount(storedAccount);
    if (storedContract) setContract(JSON.parse(storedContract));
  }, []);
  useEffect(() => {
    // Retrieve statuses from local storage when component mounts
    const savedStatuses = localStorage.getItem("statuses");
    if (savedStatuses) {
      setStatuses(JSON.parse(savedStatuses));
    }
  }, []);

  // Update local storage when account or contract changes
  useEffect(() => {
    localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [statuses]);
  useEffect(() => {
    if (account) {
      localStorage.setItem("account", account);
    } else {
      localStorage.removeItem("account");
    }
  }, [account]);

  useEffect(() => {
    if (contract) {
      localStorage.setItem("contract", JSON.stringify(contract));
    } else {
      localStorage.removeItem("contract");
    }
  }, [contract]);

  const setWallet = (val) => {
    setAccount(val);
  };

  const setContractVal = (val) => {
    setContract(val);
  };
  const setContractinT = (val) => {
    setCinstance(val);
  };

  return (
    <WalletContext.Provider
      value={{
        setWallet,
        account,
        contract,
        setContractVal,
        setContractinT,
        Cinstance,
        statuses,
        setStatuses,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

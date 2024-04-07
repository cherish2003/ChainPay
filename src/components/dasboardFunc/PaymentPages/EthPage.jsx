import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { WalletContext } from "../../../context/WalletContext";
import { useContext } from "react";

function EthPage() {
  const { contract } = useContext(WalletContext);

  return (
    <>
      <div className="relative">
        <div className="flex items-center absolute top-0 left-0">
          <h2 className="text-yellow-400 font-bold italic animate-pulse fancy-text">
            Powered by
          </h2>
          <img
            src={logo}
            alt=""
            className="w-10 h-10 ml-2 filter drop-shadow-md"
          />
        </div>
        <div>
          <p className="text-center text-gray-300 text-lg text flex justify-center items-center">
            Contract address : {contract?.contractAddress}
          </p>{" "}
          {/* Added color and font weight */}
        </div>
      </div>
      <div className="flex items-center mt-[10rem] justify-center h-4/5">
        <div className="form-container bg-gray-800 w-[20rem] rounded-lg p-8 border-2 border-transparent shadow-lg relative">
          <div className="p-4">
            <div className="border-b-2 border-gray-600 mb-4 pb-4 flex items-center justify-center">
              <h1 className="text-center text-blue-500 text-2xl font-semibold">
                Transfer 0.1 ETH to the contract
              </h1>
            </div>
            <p className="text-center text-gray-300 text-sm mb-8">
              <span className="text-yellow-300 font-semibold">
                Note :{"  "}
              </span>{" "}
              ETH and polygon are supported
            </p>
            <form className="flex flex-col items-center justify-center">
              <Link to="/payment-token">
                <button className="bg-blue-800 text-white rounded-full py-3 px-6 shadow-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out">
                  Proceed
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EthPage;

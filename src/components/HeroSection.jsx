import { Link } from "react-router-dom";



const HeroSection = () => {
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
      ChainPay streamlines transactions through blockchain technology, ensuring unparalleled security and efficiency. Experience the simplicity and safety of payments redefined.







      </p>
      <div className="flex justify-center my-10">
        <Link
          to="/dashboard"
          className=" animate-bounce focus:animate-none hover:animate-none tracking-wide text-white bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
        >
          DashBoard
        </Link>
        <a href="#" className="animate-rotate-x py-3 px-4 mx-3 rounded-md border">
          Connect Wallet
        </a>
      </div>
      
    </div>
  );
};

export default HeroSection;

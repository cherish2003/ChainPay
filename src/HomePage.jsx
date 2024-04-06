import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";

import DashBoardFeature from "./components/DashBoardFeature";


const HomePage= () => {
  return (
    <>


      <Navbar />
     
      <div className="max-w-7xl bg-black text-white mx-auto pt-20 px-6">
        <HeroSection />
       

        <FeatureSection />

        <DashBoardFeature/>
        <Workflow />
      
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

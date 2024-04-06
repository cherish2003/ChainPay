import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/dashboard.png";
import { checklistItems } from "../constants";


const DashBoardFeature = () => {
  return (
    <div className="mt-20">
     
      <h2 className="text-3xl mb-8 sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
      Analytical Dashboard{" "}
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
        Gain Insights, Drive Success
        </span>

      </h2>
      
      

        <div className="p-10 w-full">
          <img src={codeImg} alt="Coding" />
        </div>

        
      
     
    </div>
  );
};

export default DashBoardFeature;

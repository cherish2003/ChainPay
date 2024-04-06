import codeImg from "../assets/dashboard.png";
import { ContainerScroll } from "./ScrollView.jsx";

const DashBoardFeature = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl mb-8 sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
                Analytical Dashboard{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                  Gain Insights, Drive Success
                </span>
              </h2>
            </>
          }
        >
          <img
            src={codeImg}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
};

export default DashBoardFeature;

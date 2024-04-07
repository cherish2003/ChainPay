import Cards from "../Cards/Cards";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import { QRCodeSVG } from "qrcode.react";

const AreaCards = () => {
  return (
    <section className="content-area-cards ">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Todays Transactions",
          value: "0",
          text: "",
        }}
      />

      <div className="progress-bar  display-flex">
        <div className="progress-bar-info"></div>
        <div className="progress-bar-list ">
          <Cards />
        </div>
      </div>
{/* 
      <div className="progress-bar ">
        <div className="progress-bar-info"></div>
        <div className="progress-bar-list">
          <div className="flex flex-row  pl-20 pt-4">
            <QRCodeSVG size={170} value="https://reactjs.org/" />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default AreaCards;

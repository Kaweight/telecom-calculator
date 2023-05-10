import { useState } from "react";
import data from "../../data.json";
import "./homePage.scss";
import { PricingData } from "../../components/calculator/types/Calculator";
import Calculator from "../../components/calculator/Calculator";

export const HomePage = () => {
  const [pricingData, setPricingData] = useState<PricingData>(data);

  return (
    <div className="home-page">
      <Calculator pricingData={pricingData} />
    </div>
  );
};

export default HomePage;

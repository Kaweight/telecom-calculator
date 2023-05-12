import { useState } from "react";
import data from "../../data.json";
import styles from "./HomePage.module.scss";
import { PricingData } from "../../features/calculator/types/Calculator";
import Calculator from "../../features/calculator/Calculator";

export const HomePage = () => {
  const [pricingData, setPricingData] = useState<PricingData>(data);

  return (
    <div className={styles["home-page"]}>
      <Calculator pricingData={pricingData} />
    </div>
  );
};

export default HomePage;

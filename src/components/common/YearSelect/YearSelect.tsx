import React from "react";
import { PricingData } from "../../../features/calculator/types/Calculator";
import styles from "./YearSelect.module.scss";

interface YearSelectProps {
  selectedYear: number;
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  pricingData: PricingData;
}

const YearSelect: React.FC<YearSelectProps> = ({
  selectedYear,
  handleYearChange,
  pricingData,
}) => {
  return (
    <>
      <h2 className={styles.subtitle}>Wybierz rok:</h2>
      <select
        className={styles.select}
        value={selectedYear}
        onChange={handleYearChange}
      >
        {pricingData.prices.map((price) => (
          <option key={price.year} value={price.year}>
            {price.year}
          </option>
        ))}
      </select>
    </>
  );
};

export default YearSelect;

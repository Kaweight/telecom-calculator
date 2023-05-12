import React, { useState } from "react";
import CalculatorOption from "../../components/common/CalculatorOption/CalculatorOption";
import { PricingData, Price } from "./types/Calculator";
import YearSelect from "../../components/common/YearSelect/YearSelect";
import styles from "./Calculator.module.scss";
import { SERVICES } from "../../features/serviceNames";

interface CalculatorProps {
  pricingData: PricingData;
}

const Calculator: React.FC<CalculatorProps> = ({ pricingData }) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    pricingData.prices[0].year
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const selectedPrice: Price | undefined = pricingData.prices.find(
    (price) => price.year === selectedYear
  );

  const services = selectedPrice ? selectedPrice.data : {};

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleServiceToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const service = event.target.value;
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
      if (service === "decoder4K") {
        setSelectedServices((prevServices) =>
          prevServices.includes("tv") || prevServices.includes("internetAndTv")
            ? [...prevServices, "decoder4K"]
            : prevServices
        );
      }
    } else {
      setSelectedServices([...selectedServices, service]);

      if (
        (service === "tv" || service === "internetAndTv") &&
        !selectedServices.includes("decoder4K")
      ) {
        setSelectedServices((prevServices) => [...prevServices, "decoder4K"]);
      }
    }
  };

  const calculateTotalPrice = (): number => {
    const selectedPrice: Price | undefined = pricingData.prices.find(
      (price) => price.year === selectedYear
    );

    if (!selectedPrice) return 0;

    let totalPrice = 0;

    totalPrice += selectedServices.includes("internet")
      ? selectedPrice.data.internet
      : 0;
    totalPrice += selectedServices.includes("tv") ? selectedPrice.data.tv : 0;
    totalPrice += selectedServices.includes("internetAndTv")
      ? selectedPrice.data.internetAndTv
      : 0;
    totalPrice += selectedServices.includes("phoneSubscription")
      ? selectedPrice.data.phoneSubscription
      : 0;
    totalPrice +=
      selectedServices.includes("decoder4K") && selectedServices.includes("tv")
        ? selectedPrice.data.decoder4K
        : 0;

    return totalPrice;
  };

  const calculatePackageDifference = (): number => {
    const selectedPrice: Price | undefined = pricingData.prices.find(
      (price) => price.year === selectedYear
    );

    if (!selectedPrice) return 0;

    const packageSum =
      (selectedServices.includes("internet")
        ? selectedPrice.data.internet
        : 0) +
      (selectedServices.includes("tv") ? selectedPrice.data.tv : 0) +
      (selectedServices.includes("decoder4K")
        ? selectedPrice.data.decoder4K
        : 0);

    const internetAndTvPrice = selectedPrice.data.internetAndTv;
    const packageDifference = packageSum - internetAndTvPrice;

    return packageDifference;
  };

  return (
    <div className={styles.calculator}>
      <h1 className={styles.title}>Cennik</h1>
      <YearSelect
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        pricingData={pricingData}
      />

      <h2 className={styles.subtitle}>Wybierz usługi:</h2>
      {Object.entries(services).map(([service, price]) => (
        <CalculatorOption
          key={service}
          value={service}
          checked={selectedServices.includes(service)}
          onChange={handleServiceToggle}
          description={SERVICES[service]?.label || ""}
          price={typeof price === "number" ? price : 0}
          disabled={
            (service === "decoder4K" &&
              !selectedServices.includes("tv") &&
              !selectedServices.includes("internetAndTv")) ||
            false
          }
        />
      ))}

      {selectedServices.includes("internet") &&
        selectedServices.includes("tv") && (
          <p className={styles.info}>
            Przy takiej konfiguracji korzystniejsza jest opcja{" "}
            <span>Internet + Telewizja</span> za którą zapłacisz{" "}
            <span className={styles.price}>
              {calculatePackageDifference()} zł
            </span>{" "}
            mniej niż wybierając osobno Internet z Telewizją.
          </p>
        )}

      <h2 className={styles.subtitle}>Całkowita cena zamówienia:</h2>
      <p className={styles.price}>{calculateTotalPrice()} zł</p>
    </div>
  );
};

export default Calculator;

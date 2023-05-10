import React, { useState, useEffect } from "react";
import "./calculator.scss";
import { PricingData, Price } from "../calculator/types/Calculator";

interface CalculatorProps {
  pricingData: PricingData;
}

const Calculator: React.FC<CalculatorProps> = ({ pricingData }) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    pricingData.prices[0].year
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (
      selectedServices.includes("tv") ||
      selectedServices.includes("internetAndTv")
    ) {
      setSelectedServices((prevServices) => {
        if (!prevServices.includes("decoder4K")) {
          return [...prevServices, "decoder4K"];
        }
        return prevServices;
      });
    }
  }, [selectedServices]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleServiceToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const service = event.target.value;
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const calculateTotalPrice = (): number => {
    const selectedPrice: Price | undefined = pricingData.prices.find(
      (price) => price.year === selectedYear
    );

    if (!selectedPrice) return 0;

    let totalPrice = 0;

    totalPrice += selectedServices.includes("internet")
      ? selectedPrice.internet
      : 0;
    totalPrice += selectedServices.includes("tv") ? selectedPrice.tv : 0;
    totalPrice += selectedServices.includes("internetAndTv")
      ? selectedPrice.internetAndTv
      : 0;
    totalPrice += selectedServices.includes("phoneSubscription")
      ? selectedPrice.phoneSubscription
      : 0;
    totalPrice +=
      selectedServices.includes("decoder4K") && selectedServices.includes("tv")
        ? selectedPrice.decoder4K
        : 0;

    return totalPrice;
  };

  const calculatePackageDifference = (): number => {
    const selectedPrice: Price | undefined = pricingData.prices.find(
      (price) => price.year === selectedYear
    );

    if (!selectedPrice) return 0;

    const packageSum =
      (selectedServices.includes("internet") ? selectedPrice.internet : 0) +
      (selectedServices.includes("tv") ? selectedPrice.tv : 0) +
      (selectedServices.includes("decoder4K") ? selectedPrice.decoder4K : 0);

    const internetAndTvPrice = selectedPrice.internetAndTv;
    const packageDifference = packageSum - internetAndTvPrice;

    return packageDifference;
  };

  return (
    <div className="calculator">
      <h1 className="calculator__title">Cennik</h1>
      <h2 className="calculator__subtitle">Wybierz rok:</h2>
      <select
        className="calculator__select"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {pricingData.prices.map((price) => (
          <option
            key={price.year}
            value={price.year}
            className="calculator__option"
          >
            {price.year}
          </option>
        ))}
      </select>

      <h2 className="calculator__subtitle">Wybierz usługi:</h2>
      <label className="calculator__label">
        <input
          type="checkbox"
          value="internet"
          checked={selectedServices.includes("internet")}
          onChange={handleServiceToggle}
          className="calculator__checkbox"
        />
        <span className="calculator__text">
          Internet (
          {
            pricingData.prices.find((price) => price.year === selectedYear)
              ?.internet
          }{" "}
          zł)
        </span>
      </label>
      <label className="calculator__label">
        <input
          type="checkbox"
          value="tv"
          checked={selectedServices.includes("tv")}
          onChange={handleServiceToggle}
          className="calculator__checkbox"
        />
        <span className="calculator__text">
          Telewizja (
          {pricingData.prices.find((price) => price.year === selectedYear)?.tv}{" "}
          zł)
        </span>
      </label>
      <label className="calculator__label">
        <input
          type="checkbox"
          value="internetAndTv"
          checked={selectedServices.includes("internetAndTv")}
          onChange={handleServiceToggle}
          className="calculator__checkbox"
        />
        <span className="calculator__text">
          Internet + Telewizja (
          {
            pricingData.prices.find((price) => price.year === selectedYear)
              ?.internetAndTv
          }{" "}
          zł)
        </span>
      </label>
      <label className="calculator__label">
        <input
          type="checkbox"
          value="phoneSubscription"
          checked={selectedServices.includes("phoneSubscription")}
          onChange={handleServiceToggle}
          className="calculator__checkbox"
        />
        <span className="calculator__text">
          Abonament telefoniczny (
          {
            pricingData.prices.find((price) => price.year === selectedYear)
              ?.phoneSubscription
          }{" "}
          zł)
        </span>
      </label>
      <label className="calculator__label">
        <input
          type="checkbox"
          value="decoder4K"
          checked={selectedServices.includes("decoder4K")}
          onChange={handleServiceToggle}
          disabled={
            !selectedServices.includes("tv") &&
            !selectedServices.includes("internetAndTv")
          }
          className="calculator__checkbox"
        />
        <span className="calculator__text">
          Dekoder 4K (
          {
            pricingData.prices.find((price) => price.year === selectedYear)
              ?.decoder4K
          }{" "}
          zł)
        </span>
      </label>

      {selectedServices.includes("internet") &&
        selectedServices.includes("tv") && (
          <p className="calculator__info">
            Przy takiej konfiguracji korzystniejsza jest opcja{" "}
            <span>Internet + Telewizja</span> za którą zapłacisz{" "}
            <span className="calculator__price">
              {calculatePackageDifference()} zł
            </span>{" "}
            mniej.
          </p>
        )}

      <h2 className="calculator__subtitle">Całkowita cena zamówienia:</h2>
      <p className="calculator__price">{calculateTotalPrice()} zł</p>
    </div>
  );
};

export default Calculator;

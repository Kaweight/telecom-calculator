import React from "react";
import CheckboxInput from "../CheckboxInput/CheckboxInput";

interface CalculatorOptionProps {
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  price: number | undefined;
  disabled?: boolean;
}

const CalculatorOption: React.FC<CalculatorOptionProps> = ({
  value,
  checked,
  onChange,
  description,
  price,
  disabled,
}) => {
  const displayedPrice = price || 0;

  return (
    <CheckboxInput
      value={value}
      checked={checked}
      onChange={onChange}
      description={description}
      price={displayedPrice}
      disabled={disabled}
    />
  );
};

export default CalculatorOption;

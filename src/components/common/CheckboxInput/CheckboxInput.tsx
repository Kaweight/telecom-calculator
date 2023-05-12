import React from "react";
import styles from "./CheckboxInput.module.scss";

interface CheckboxInputProps {
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  price: number;
  disabled?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  value,
  checked,
  onChange,
  description,
  price,
  disabled,
}) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />
      <span className={styles.text}>
        {description} ({price} zł)
      </span>
    </label>
  );
};

export default CheckboxInput;

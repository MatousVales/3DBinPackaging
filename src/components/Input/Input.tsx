import React, {FunctionComponent} from "react";

import './Input.scss';

type InputProps = {
  label: string;
  value: string | number;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: FunctionComponent<InputProps> = ({
  label,
  value,
  handleChange,
}) => {
  return (
    <div className="Input">
      <label>
        {label}
        <input value={value} onChange={handleChange} />
      </label>
    </div>
  );
};
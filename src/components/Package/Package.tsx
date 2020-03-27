import React, {ChangeEvent, FunctionComponent} from "react";

import { Input } from "../Input";

import './Package.scss';

export enum PackageType {
  container = 'container',
  item = 'item',
}

type PackageProps = {
  id?: number;
  name: string;
  type: PackageType;
  width: number;
  height: number;
  depth: number;
  weight?: number;
  maxWeight?: number;
  quantity?: number;
  handleInputChange: Function;
  handleRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Package: FunctionComponent<PackageProps> = ({
  id,
  name,
  type,
  width,
  height,
  depth,
  weight,
  maxWeight,
  quantity,
  handleInputChange,
  handleRemove,
}) => {
  const localInputHandle = (inputKey: string, type: string, event: ChangeEvent<HTMLInputElement>) => {
    const numbers = /^[0-9]+$/;
    let value: number | string = event.target.value;

    if (type === 'number' && value.match(numbers)) {
      handleInputChange(inputKey, id, parseInt(value));
    } else if (type === 'string' || value === '') {
      handleInputChange(inputKey, id, value);
    }
  };

  return (
    <div className="Package">
      <Input label="Id" value={name} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('name','string', e)} />
      <Input label="Wdt" value={width} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('width','number', e)} />
      <Input label="Hgt" value={height} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('height','number', e)} />
      <Input label="Dpt" value={depth} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('depth','number', e)} />

      {type === PackageType.item ? (
        <span>
          <Input label="Wgt" value={weight || 0} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('weight','number', e)} />
          <Input label="Qty" value={quantity || 0} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('quantity','number', e)} />
          <button className="Package__button" onClick={handleRemove}>Remove</button>
        </span>
      ) : (
        <Input label="Max. wgt" value={maxWeight || 0} handleChange={(e: ChangeEvent<HTMLInputElement>) => localInputHandle('maxWeight','number', e)} />
      )}
    </div>
  )
};
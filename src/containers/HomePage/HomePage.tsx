import React, {FunctionComponent, useState} from "react";

import { iniItems, initContainer } from "../../constants";
import { Item, Container, Result, Error } from "../../types";
import { postPack } from '../../api';

import { Package, PackageType } from "../../components/Package";
import { ResultContainer } from "../../components/ResultContainer";

import './HomePage.scss';

export const HomePage: FunctionComponent<{}> = () => {
  const [items, setItems] = useState<Item[]>(iniItems);
  const [container, setContainer] = useState<Container>(initContainer);
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<Error[]>([]);

  const handleItemInput = (inputKey: string, id: number, value: string | number) => {
    setItems(oldArray => {
      return oldArray.map((item: Item) => {
        if (item.id === id) {
          let newItem = {...item};
          // @ts-ignore
          newItem[inputKey] = value;

          return newItem
        }
        return item;
      });
    })
  };

  const handleContainerInput = (inputKey: string, id: number, value: string) => {
    let newState = {...container};
    // @ts-ignore
    newState[inputKey] = value;

    setContainer(newState);
  };

  const addItem = () => {
    const newItem: Item = {id: items.length, name: 'Item1', width: 4, height: 5, depth: 6, weight: 0, quantity: 5};

    setItems(oldArray => [...oldArray, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(oldArray => oldArray.filter((item: Item) => item.id !== id));
  };

  const pack = () => {
    postPack(container, items)
      .then(data => {
        if (data.response.status === 1) {
          const packedBin = data.response.bins_packed[0];
          const notPackedItems = packedBin.not_packed_items.map((item: any) => {
            return {name: item.id, quantity: item.q};
          });

          setResult({
            width: packedBin.bin_data.w,
            height: packedBin.bin_data.h,
            depth: packedBin.bin_data.d,
            usedSpace: packedBin.bin_data.used_space,
            usedWeight: packedBin.bin_data.used_weight,
            packedItemsLength: packedBin.items.length,
            notPackedItems,
            maxWeight: container.maxWeight,
          });
        } else {
          setResult(null);
        }
        setErrors(data.response.errors);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const renderItems = items.map((item: Item) => {
    return (
      <Package
        key={item.id}
        id={item.id}
        name={item.name}
        type={PackageType.item}
        width={item.width}
        height={item.height}
        depth={item.depth}
        weight={item.weight}
        quantity={item.quantity}
        handleInputChange={handleItemInput}
        handleRemove={() => removeItem(item.id)}
      />
    )
  });

  const renderErrors = errors.map((error: Error) => {
    const errorClasses = ['HomePage__error'];
    if (error.level === 'critical') errorClasses.push('HomePage__error--critical');
    else if (error.level === 'warning') errorClasses.push('HomePage__error--warning');

    return <p className={errorClasses.join(' ')}>{error.message}</p>
  });

  return (
    <div className="Homepage">
      <div className="Homepage__items">
        {renderItems}
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="Homepage__container">
        <Package
          name={container.name}
          type={PackageType.container}
          width={container.width}
          height={container.height}
          depth={container.depth}
          maxWeight={container.maxWeight}
          handleInputChange={handleContainerInput}
        />
      </div>
      <button onClick={pack}>Pack</button>
      {renderErrors}
      {result ? (
        <ResultContainer
          result={result}
        />
      ) : (
        ''
      )}
    </div>
  );
};
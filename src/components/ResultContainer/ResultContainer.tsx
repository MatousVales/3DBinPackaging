import React, { FunctionComponent } from "react";

import { notPackedItem, Result } from "../../types";

import './ResultContainer.scss';

type ResultContainerProps = {
  result: Result;
}

export const ResultContainer: FunctionComponent<ResultContainerProps> = ({ result }) => {
  const renderNotPackedItems = result.notPackedItems.map((item: notPackedItem) => {
    return <li key={item.name}>ID: {item.name} Quantity: {item.quantity}</li>;
  });

  return (
    <div className="ResultContainer">
      Dimensions:
      <ul>
        <li>Width: {result.width}</li>
        <li>Height: {result.height}</li>
        <li>Depth: {result.depth}</li>
        <li>Max. wgt.: 	{result.maxWeight}</li>
      </ul>
      <ul>
        <li>Packed items: {result.packedItemsLength}</li>
        <li>Space taken: {result.usedSpace} %</li>
        <li>Weight taken: {result.usedWeight} %</li>
      </ul>
      {result.notPackedItems.length ? (
        <div className="ResultContainer__notPackedItems">
          ---
          Items that have not been packed:
          <ul>
            {renderNotPackedItems}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
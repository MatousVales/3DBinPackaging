export interface Item {
  id: number;
  name: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  quantity: number;
}

export interface Container {
  name: string;
  width: number;
  height: number;
  depth: number;
  maxWeight: number;
}

export interface notPackedItem {
  name: string,
  quantity: number,
}

export interface Error {
  level: string;
  message: string;
}

export interface Result {
  width: number,
  height: number,
  depth: number,
  usedSpace: number,
  usedWeight: number,
  packedItemsLength: number,
  maxWeight: number,
  notPackedItems: notPackedItem[],
}
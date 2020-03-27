import { Item, Container } from "../types";

const API_URL = 'https://eu.api.3dbinpacking.com';
const API_USERNAME = 'frantisekblaha';
const API_KEY = '5978079bdc2558ab1c61c1e5d031e0f2';

export const postPack = async (container: Container, items: Item[]): Promise<any> => {
  const response = await fetch(`${API_URL}/packer/pack`, {
    method: 'POST',
    body: JSON.stringify({
      username: API_USERNAME,
      api_key: API_KEY,
      bins: [
        { id: container.name, w: container.width, h: container.height, d: container.depth, max_wg: container.maxWeight },
      ],
      items: items.map((item: Item) => {
        return {
          id: item.name,
          w: item.width,
          h: item.height,
          d: item.depth,
          wg: item.weight,
          vr: 1,
          q: item.quantity
        }
      }),
    }),
  });

  return response.json();
};
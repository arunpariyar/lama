import { BASE_URL } from "./constants";

async function loadItem(itemId: string) {
  const response = await fetch(BASE_URL + '/item/' + itemId);
  const item = await response.json();
  return item;
}

async function newItem(itemData: any) {
  const response = await fetch(BASE_URL + '/item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  const newItem = await response.json();
  return newItem;
}

async function delItem(itemData: any) {
  const response = await fetch(BASE_URL + '/item', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  const deletedItem = await response.json();
  return deletedItem;
}

async function updItem(itemData: any) {
  const response = await fetch(BASE_URL + '/item', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  const parsedRes = await response.json();
  return parsedRes;
}

export { loadItem, newItem, delItem, updItem };

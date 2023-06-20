import { BASE_URL } from "./constants";

async function loadUser(userId: any) {
  const response = await fetch(BASE_URL + '/user/' + userId);
  const user = await response.json();
  const res = !user ? 'No data' : user;
  return res;
}

async function createUser(userData: any) {
  const response = await fetch(BASE_URL + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const user = await response.json();
  return user;
}

async function logUser(userData: any) {
  const response = await fetch(BASE_URL + '/login', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const user = await response.json();
  return user;
}

async function updateUser(userData: any) {
  return fetch(BASE_URL + '/user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export { loadUser, createUser, logUser, updateUser };

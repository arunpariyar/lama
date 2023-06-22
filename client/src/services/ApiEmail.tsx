import { BASE_URL } from "./constants";

async function sendEmail(userId: string) {
  await fetch(BASE_URL + '/email/' + userId);
}

export { sendEmail };

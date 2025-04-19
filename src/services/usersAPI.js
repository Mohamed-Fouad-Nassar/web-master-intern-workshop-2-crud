import axios from "axios";

import { USERS_API_URL } from "../utils/helpers";

export async function getUsers(addedUsersCount) {
  let api = `${USERS_API_URL}?limit=${addedUsersCount || 20}`;

  const res = await axios.get(api);
  return res.data;
}

export async function getUsersCount() {
  const res = await axios.get(USERS_API_URL);
  return res?.data?.length || 0;
}

import axios from "axios";
import { USERS_API_URL } from "../utils/helpers";

export async function getusers(addedUsersCount = 10, allUsers) {
  let api = allUsers
    ? USERS_API_URL
    : `${USERS_API_URL}?limit=${addedUsersCount}`;

  const res = await axios.get(api);

  if (allUsers && allUsers === "admins") {
    return res.data.filter((user) => user.role === "admin");
  } else if (allUsers && allUsers === "customers") {
    return res.data.filter((user) => user.role === "customer");
  } else {
    return res.data;
  }
}

export async function getusersCount() {
  const res = await axios.get(USERS_API_URL);
  return res?.data?.length || 0;
}

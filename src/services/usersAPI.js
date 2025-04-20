import axios from "axios";
import { USERS_API_URL } from "../utils/helpers";

export async function getusers(allUsers, offset = 10) {
  const res = await axios.get(USERS_API_URL);

  return getUsersByRole(allUsers, res).slice(0, offset);
}

export async function getusersCount(allUsers) {
  const res = await axios.get(USERS_API_URL);
  return getUsersByRole(allUsers, res).length || 0;
}

function getUsersByRole(allUsers, res) {
  if (allUsers && allUsers === "admin") {
    return res.data.filter((user) => user.role === "admin");
  } else if (allUsers && allUsers === "customer") {
    return res.data.filter((user) => user.role === "customer");
  } else {
    return res.data;
  }
}

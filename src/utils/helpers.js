import { isAxiosError } from "axios";

export function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
}

export function handleAxiosErr(err, message = "") {
  console.error(err);
  return isAxiosError(err)
    ? err.response?.data || err.response?.data.message || err.message
    : message || "An Unexpected Error. Failed to get data";
}

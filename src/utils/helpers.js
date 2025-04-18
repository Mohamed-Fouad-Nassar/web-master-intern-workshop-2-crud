import { isAxiosError } from "axios";

export const itemsPerPage=10

export function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "EGP",
  }).format(price);
}

export function handleAxiosErr(err, message = "") {
  console.error(err);
  return isAxiosError(err)
    ? err.response?.data || err.response?.data.message || err.message
    : message || "An Unexpected Error. Failed to get data";
}

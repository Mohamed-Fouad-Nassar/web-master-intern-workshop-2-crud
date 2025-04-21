import axios from "axios";

import { PRODUCTS_API_URL } from "../utils/helpers";

export async function getProductsCount(filter, query) {
  const params = new URLSearchParams();

  if (filter?.minPrice) params.set("price_min", filter.minPrice);
  if (filter?.maxPrice) params.set("price_max", filter.maxPrice);
  if (filter?.category) params.set("categoryId", filter.category);

  if (query) params.set("title", query);

  const api = `${PRODUCTS_API_URL}?${params.toString()}`;
  const res = await axios.get(api);
  return res?.data?.length || 0;
}

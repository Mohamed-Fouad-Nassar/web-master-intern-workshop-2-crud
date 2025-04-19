import axios from "axios";

import {
  ITEMS_PER_PAGE,
  PRODUCTS_API_URL,
} from "../utils/helpers";

export async function getProducts(filter, sort, page, query) {
  const offset = (page - 1) * ITEMS_PER_PAGE || 0;
  let api = `${PRODUCTS_API_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`;

  if (query) api += `&title=${query}`;
  if (filter?.minPrice && filter?.maxPrice)
    api += `&price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);
  return res.data;
}

export async function getProductsCount(filter, sort, query) {
  const params = new URLSearchParams();

  if (filter?.minPrice) params.set("price_min", filter.minPrice);
  if (filter?.maxPrice) params.set("price_max", filter.maxPrice);
  if (query) params.set("title", query);

  // if (sort) params.set("sort", sort);

  const api = `${PRODUCTS_API_URL}?${params.toString()}`;
  const res = await axios.get(api);
  return res?.data?.length || 0;
}


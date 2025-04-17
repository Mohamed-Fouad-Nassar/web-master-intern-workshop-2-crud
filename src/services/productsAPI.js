import axios from "axios";

const BASE_API = "https://api.escuelajs.co/api/v1/products";

export async function getProducts(filter, sort, page) {
  // page = 1
  // limit = 10
  // offset = 0 [page - 1] * limit
  // offset = 10 [2 - 1] * 10
  // offset = 20 [3 - 1] * 10

  let api = `${BASE_API}?offset=${page?.offset || 0}&limit=${
    page?.limit || 10
  }`;

  // let api = BASE_API;

  if (filter?.minPrice && filter?.maxPrice)
    api += `&price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);

  return res.data;
}

export async function getProductsCount(filter, sort) {

  let api = BASE_API;

  if (filter?.minPrice && filter?.maxPrice)
    api += `?price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);

  return res.data;
}

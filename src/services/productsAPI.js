import axios from "axios";

const BASE_API = "https://api.escuelajs.co/api/v1/products";

export async function getProducts(filter, sort, page, title) {
  let api = BASE_API;

  if (filter?.minPrice && filter?.maxPrice)
    api += `?price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);

  return res.data;
}

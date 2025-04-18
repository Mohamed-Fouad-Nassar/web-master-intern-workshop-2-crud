import axios from "axios";
import { itemsPerPage } from "../utils/helpers";

const BASE_API = "https://api.escuelajs.co/api/v1/products";

export async function getProducts(filter, sort, page) {
  let api = `${BASE_API}?offset=${
    calcOffset(page, itemsPerPage) || 0
  }&limit=${itemsPerPage}`;

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

// calc the offset based on the current page and items per page
function calcOffset(page, itemsPerPage) {
  if (page?.offset === 0) {
    return 0;
  } else {
    return (page?.offset - 1) * itemsPerPage;
  }
}

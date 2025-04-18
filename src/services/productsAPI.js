import axios from "axios";

import { ITEMS_PER_PAGE, BASE_API_URL } from "../utils/helpers";

export async function getProducts(filter, sort, page) {
  // let api = `${BASE_API_URL}?offset=${
  //   calcOffset(page, ITEMS_PER_PAGE) || 0
  // }&limit=${ITEMS_PER_PAGE}`;
  const offset = (page - 1) * ITEMS_PER_PAGE || 0;

  let api = `${BASE_API_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`;

  if (filter?.minPrice && filter?.maxPrice)
    api += `&price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);

  return res.data;
}

export async function getProductsCount(filter, sort) {
  let api = BASE_API_URL;

  if (filter?.minPrice && filter?.maxPrice)
    api += `?price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

  const res = await axios.get(api);

  return res.data;
}

// // calc the offset based on the current page and items per page
// function calcOffset(page) {
//   if (page === 0) {
//     return 0;
//   } else {
//     return (page - 1) * ITEMS_PER_PAGE;
//   }
// }

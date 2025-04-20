import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api/products";
import { ITEMS_PER_PAGE, PRODUCTS_API_URL } from "../utils/helpers";

export function useGetProducts(filter, sort, page, query) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.currentProducts);

  useEffect(() => {
    const offset = (page - 1) * ITEMS_PER_PAGE || 0;
    let api = `${PRODUCTS_API_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`;

    if (query) api += `&title=${query}`;
    if (filter?.minPrice && filter?.maxPrice)
      api += `&price_min=${filter.minPrice}&price_max=${filter.maxPrice}`;

    dispatch(getAllProducts(api));
  }, [dispatch, sort, page, query]);

  return products;
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";

import { getProducts } from "../services/productsAPI";
import { itemsPerPage } from "../utils/helpers";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");
    const offset = searchParams.get("page") || 1;

    async function getProductsCall() {
      const apiProducts = await getProducts(
        { minPrice, maxPrice },
        null, //not sorting for now
        { offset, limit: itemsPerPage }
      );
      setProducts(apiProducts);
    }

    getProductsCall();
  }, [searchParams]);

  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <ProductsTable products={products} />
      <Pagination />
    </>
  );
}

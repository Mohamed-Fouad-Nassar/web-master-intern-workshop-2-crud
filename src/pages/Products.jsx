import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";

import { getProducts } from "../services/productsAPI";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const minPrice = searchParams.get("price_min");
    const maxPrice = searchParams.get("price_max");
    const page = searchParams.get("page") || 1;

    async function getProductsCall() {
      const apiProducts = await getProducts(
        { minPrice, maxPrice },
        null, //not sorting for now
        page
      );
      setProducts(apiProducts);
    }

    getProductsCall();
  }, [searchParams]);

  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <Suspense fallback={<>Loading...</>}>
        <ProductsTable products={products} />
        <Pagination />
      </Suspense>
    </>
  );
}

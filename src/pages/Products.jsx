// import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";

// import { GetProducts } from "../services/productsAPI";
import { useGetProducts } from "../hooks/useGetProducts";

export default function Products() {
  const [searchParams] = useSearchParams();
  // const [products, setProducts] = useState(null);

  // useEffect(() => {
  const minPrice = searchParams.get("price_min");
  const maxPrice = searchParams.get("price_max");
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query");

  // async function getProductsCall() {
  //   const apiProducts = GetProducts(
  //     { minPrice, maxPrice },
  //     null, //not sorting for now
  //     page,
  //     query
  //   );
  //   setProducts(apiProducts);
  // }

  const products = useGetProducts(
    { minPrice, maxPrice },
    null, // sort
    page,
    query
  );

  //   getProductsCall();
  // }, [searchParams]);

  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <ProductsTable products={products}/>
      <Pagination />
    </>
  );
}

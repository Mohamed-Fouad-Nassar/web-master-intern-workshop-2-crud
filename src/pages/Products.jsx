import { useSearchParams } from "react-router";

import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";

import { useGetProducts } from "../hooks/useGetProducts";

export default function Products() {
  const [searchParams] = useSearchParams();

  const minPrice = searchParams.get("price_min");
  const maxPrice = searchParams.get("price_max");
  const category = searchParams.get("category");

  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query");

  const products = useGetProducts(
    { minPrice, maxPrice, category },
    page,
    query
  );

  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <ProductsTable products={products} />
      <Pagination />
    </>
  );
}

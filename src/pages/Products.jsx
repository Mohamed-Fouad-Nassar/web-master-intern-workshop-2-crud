import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Breadcrumb from "../components/Breadcrumb";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";
import Pagination from "../components/Pagination";

import { getProducts } from "../services/productsAPI";

// const products = [
//   {
//     id: 1,
//     title:
//       "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
//     img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
//     price: 7000.14,
//     discount: 20,
//   },
//   {
//     id: 2,
//     title:
//       "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
//     img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
//     price: 7000.14,
//     discount: 0,
//   },
//   {
//     id: 3,
//     title:
//       "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
//     img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
//     price: 7000.14,
//     discount: 0,
//   },
//   {
//     id: 4,
//     title:
//       "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
//     img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
//     price: 7000.14,
//     discount: 40,
//   },
//   {
//     id: 5,
//     title:
//       "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
//     img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
//     price: 7000.10000004,
//     discount: 0,
//   },
// ];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  // extract minPrice and maxPrice from searchParams
  const minPrice = searchParams.get("price_min");
  const maxPrice = searchParams.get("price_max");

  useEffect(() => {
    async function getProductsCall() {
      const apiProducts = await getProducts({ minPrice, maxPrice });
      setProducts(apiProducts);
    }

    getProductsCall();
  }, [minPrice, maxPrice]); // Only depend on minPrice and maxPrice

  // READ THIS COMMENT :::::::::::::::::::::::::::::::::)
  // this is your old useefect, idont really know what to do man lol

  // useEffect(() => {
  //   const minPrice = searchParams.get("price_min");
  //   const maxPrice = searchParams.get("price_max");

  //   async function getProductsCall() {
  //     const apiProducts = await getProducts({ minPrice, maxPrice });
  //     setProducts(apiProducts);
  //   }

  //   getProductsCall();
  // }, [searchParams]);

  // the proplem now is on the first render the product get set the the full data, then my function runs for the pagination and sets the data lets say (from index 0 to 10) and then the useEffect runs and sets the data to the full data again

  // another think is idk how am i gonna do the pagination with the filter
  // end me
  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <ProductsTable products={products} />
      <Pagination setData={setProducts} />
    </>
  );
}

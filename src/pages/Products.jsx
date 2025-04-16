import Breadcrumb from "../components/Breadcrumb";
import ProductsTable from "../features/products/ProductsTable";
import ProductsHeaderSec from "../features/products/ProductsHeaderSec";
import Pagination from "../components/Pagination";

const products = [
  {
    id: 1,
    title:
      "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
    img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
    price: 7000.14,
    discount: 20,
  },
  {
    id: 2,
    title:
      "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
    img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
    price: 7000.14,
    discount: 0,
  },
  {
    id: 3,
    title:
      "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
    img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
    price: 7000.14,
    discount: 0,
  },
  {
    id: 4,
    title:
      "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
    img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
    price: 7000.14,
    discount: 40,
  },
  {
    id: 5,
    title:
      "LG 7 Kg, 5 Star, Direct Drive Technology, Steam Wash, 6 Motion DD, Smart Diagnosis, Fully-Automatic Front Load",
    img: "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/products/product-img-1.png",
    price: 7000.10000004,
    discount: 0,
  },
];

export default function Products() {
  // isnt the products supposed to be fetched from the server and saved in a state ?

  return (
    <>
      <Breadcrumb cur="products" links={[{ title: "home", href: "/" }]} />
      <ProductsHeaderSec />
      <ProductsTable products={products} />
      <Pagination
        data={products}
        // setData={setUsersData}
      />
    </>
  );
}

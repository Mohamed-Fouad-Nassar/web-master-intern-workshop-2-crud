import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiMiniEye, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import Button from "../components/Button";
import Spinner from "../components/Spinner";

import { formatPrice } from "../utils/helpers";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query.trim() === "") {
      navigate("/products");
      return;
    }

    const FetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/?title=${query}`
        );
        console.log("Products: ", response.data);

        setProducts(response.data);
      } catch (err) {
        console.error("Products Not Found", err);
      } finally {
        setLoading(false);
      }
    };

    FetchProducts();
  }, [query, navigate]);

  if (query.trim() === "") return <Navigate to="/products" />;

  return (
    <div>
      <div className="my-4 overflow-x-auto text-sm">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs font-medium text-secondary-txt dark:text-secondary-txt-dark *:px-6 *:py-2 *:whitespace-nowrap">
              <th>Id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={100} className=" py-60 mx-auto w-full *:mx-auto">
                  <Spinner />
                </td>
              </tr>
            ) : products.length <= 0 ? (
              <tr>
                <td
                  colSpan={100}
                  className="py-60 mx-auto w-full *:mx-auto text-center font-medium text-xl text-gray-900 dark:text-white"
                >
                  No Products Founded With "{query}"
                </td>
              </tr>
            ) : (
              products.map(({ id, images: [img], price, title }) => (
                <tr
                  key={id}
                  className="bg-primary-bg dark:bg-primary-bg-dark text-gray-900 dark:text-white *:px-6 *:py-4 *:whitespace-nowrap *:first:rounded-l-xl *:last:rounded-r-xl"
                >
                  <td title={id}>{id}</td>
                  <td title="product-image">
                    <img
                      src={img}
                      alt="product-image"
                      className="max-w-14 rounded"
                    />
                  </td>
                  <td
                    title={title}
                    className="truncate max-w-[180px] md:max-w-[250px]"
                  >
                    {title}
                  </td>
                  <td title={price}>{formatPrice(price)}</td>
                  <td>
                    <div className="max-w-fit flex gap-2 overflow-hidden *:text-lg">
                      <Button variation="ghost" size="sm">
                        <HiMiniEye className="text-third-txt dark:text-third-txt-dark" />
                      </Button>
                      <Button variation="ghost" size="sm">
                        <HiMiniPencil className="text-third-txt dark:text-third-txt-dark" />
                      </Button>
                      <Button variation="ghost" size="sm">
                        <HiMiniTrash className="text-third-txt dark:text-third-txt-dark" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResults;

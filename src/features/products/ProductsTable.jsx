import { Link } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniEye, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import { deleteProduct } from "../../api/products";

import { useOpenModal } from "../../hooks/useModal";

import { formatPrice } from "../../utils/helpers";

export default function ProductsTable({ products }) {
  const openModal = useOpenModal();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.isLoading);

  const handelDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => toast.success("Product Deleted Successfully"))
      .catch((err) => {
        console.log(err.message);
        toast.error("Something went wrong!");
      });
  };

  return (
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
          {isLoading ? (
            <tr>
              <td colSpan={100} className="h-[60vh] [&_div]:mx-auto">
                <Spinner />
              </td>
            </tr>
          ) : products.length <= 0 ? (
            <tr>
              <td
                colSpan={100}
                className="h-[60vh] mx-auto w-full *:mx-auto text-center font-medium text-xl text-gray-900 dark:text-white"
              >
                No Products Here :(
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
                    <Button
                      size="sm"
                      variation="ghost"
                      onClick={() => openModal(id)}
                    >
                      <HiMiniEye className="text-third-txt dark:text-third-txt-dark" />
                    </Button>

                    <Button
                      as={Link}
                      size="sm"
                      variation="ghost"
                      to={`/products/${id}/edit`}
                    >
                      <HiMiniPencil className="text-third-txt dark:text-third-txt-dark" />
                    </Button>

                    <Button
                      size="sm"
                      variation="ghost"
                      onClick={() => handelDelete(id)}
                    >
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
  );
}

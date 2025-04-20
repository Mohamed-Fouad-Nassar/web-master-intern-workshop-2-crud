import { HiMiniEye, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";

import Spinner from "../../components/Spinner";

import Button from "../../components/Button";

import { useOpenModal } from "../../hooks/useModal";

import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../api/products";

export default function ProductsTable({ products }) {
  const openModal = useOpenModal();
  const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.isLoading);

  const handelDelete = (id) => {
    dispatch(deleteProduct(id));
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
          {loading ? (
            <tr>
              <td colSpan={100} className="h-[80vh] [&_div]:mx-auto">
                <Spinner />
              </td>
            </tr>
          ) : products.length <= 0 ? (
            <tr>
              <td
                colSpan={100}
                className="h-[80vh] mx-auto w-full *:mx-auto text-center font-medium text-xl text-gray-900 dark:text-white"
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
                      onClick={() => openModal(id)}
                      variation="ghost"
                      size="sm"
                    >
                      <HiMiniEye className="text-third-txt dark:text-third-txt-dark" />
                    </Button>
                    <Link to={`/products/${id}/edit`}>
                      <Button variation="ghost" size="lg">
                        <HiMiniPencil className="text-third-txt dark:text-third-txt-dark" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handelDelete(id)}
                      variation="ghost"
                      size="sm"
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

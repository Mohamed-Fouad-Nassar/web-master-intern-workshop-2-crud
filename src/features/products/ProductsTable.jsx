import { HiMiniEye, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";
import { useOpenModal } from "../../hooks/useModal";

import Button from "../../components/Button";

import { formatPrice } from "../../utils/helpers";

export default function ProductsTable({ products }) {
  const openModal = useOpenModal();

  return (
    <div className="my-4 overflow-x-auto text-sm">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-xs font-medium text-secondary-txt dark:text-secondary-txt-dark *:px-6 *:py-2 *:whitespace-nowrap">
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Discount</th>
            {/* the problem with the small screens table overflowing is the class that making the options th appers only on the screen readers only (sr-only) */}
            {/* why is that ?idk man lets just remove the class and it works or maybe we give it d-none "hidden" on small screens its up to u */}
            {/* <th className="sr-only">Options</th> */}
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, title, img, price, discount }) => (
            <tr
              key={id}
              className="bg-primary-bg dark:bg-primary-bg-dark text-gray-900 dark:text-white *:px-6 *:py-4 *:whitespace-nowrap *:first:rounded-l-xl *:last:rounded-r-xl"
            >
              <td title={id}>{id}</td>
              <td title="product-image">
                <img src={img} alt="product-image" className="max-w-14" />
              </td>
              <td
                title={title}
                className="truncate max-w-[180px] md:max-w-[250px]"
              >
                {title}
              </td>
              <td title={price}>{formatPrice(price)}</td>
              <td title={discount}>{formatPrice(discount)}</td>
              <td>
                <div className="max-w-fit flex gap-2 overflow-hidden *:text-lg">
                  <Button
                    onClick={() => openModal(id)}
                    variation="ghost"
                    size="sm"
                  >
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

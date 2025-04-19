import DetailsList from "../DetailsList";

import { formatPrice } from "../../utils/helpers";

export default function ProductModal({ data }) {
  const { id, images, title, price, description, category } = data;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <DetailsList>
        <DetailsList.Row title="ID" value={id} />
        <DetailsList.Row title="Title" value={title} />
        <DetailsList.Row title="Category" value={category?.name} />
        <DetailsList.Row title="Price" value={formatPrice(price)} />
        <DetailsList.Row title="Description" value={description} />
      </DetailsList>
      <div className="flex justify-center flex-wrap gap-2">
        {images.length !== 0 &&
          images.map((src, i) => (
            <div
              key={i}
              className="border rounded-2xl overflow-hidden border-zinc-400"
            >
              <img
                src={src}
                alt={"product-img-" + i}
                className="aspect-square max-w-xs object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

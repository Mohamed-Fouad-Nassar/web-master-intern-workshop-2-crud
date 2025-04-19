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
        {images?.length !== 0 &&
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

// export default function ProductModal({ data }) {
//   const { id, images, title, price, description, category } = data;

//   return (
//     <div className="w-full flex flex-col justify-center items-center gap-10">
//       <div className="w-full flex gap-4">
//         {/* product img */}
//         <img className="size-60 rounded-lg" src={images[0]} alt={title} />
//         {/* product details */}
//         <div className="modal-details">
//           <p>
//             <span>ID:</span>
//             {id}
//           </p>
//           <p>
//             <span>title:</span>
//             {title}
//           </p>
//           <p>
//             <span>price:</span>
//             {price}$
//           </p>
//           <p>
//             <span>category:</span>
//             {category.name}
//           </p>
//           {/* product description for pc view */}
//           <p className="max-md:hidden">
//             <span>description:</span>
//             {description}
//           </p>
//         </div>
//       </div>
//       {/* product description for mobile view */}
//       <div className="md:hidden modal-details">
//         <p>
//           <span>description:</span>
//           {description}
//         </p>
//       </div>
//       {/* product images */}
//       <div className="flex justify-between gap-2">
//         {(images.length >= 3 ? images : Array.from({ length: 3 })).map(
//           (src, i) => (
//             <div
//               className="border rounded-2xl overflow-hidden border-gray-400"
//               key={i}
//             >
//               <img
//                 className="md:size-80"
//                 src={images.length >= 3 ? src : images[0]}
//                 alt={"img" + i}
//               />
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

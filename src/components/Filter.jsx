import { useState } from "react";
import { HiMiniFunnel } from "react-icons/hi2";

import PriceFilterForm from "../features/products/PriceFilterForm";
import CategoryFilterForm from "../features/products/CategoryFilterForm";

import useClickOutSide from "../hooks/useClickOutside";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const ref = useClickOutSide(closeDropdown);

  return (
    <div ref={ref} className="lg:relative">
      <button
        onClick={toggleDropdown}
        className="rounded cursor-pointer uppercase tracking-wider px-2 py-1.5 text-xs flex hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark"
      >
        <span className="sr-only">Filter</span>
        <HiMiniFunnel className="text-xl my-1.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-72 py-2 px-4 rounded text-primary-txt dark:text-primary-txt-dark border border-secondary-bg bg-third-bg shadow dark:border-secondary-bg-dark dark:bg-third-bg-dark">
          <h3 className="mb-2 font-medium">Filter Options</h3>
          <PriceFilterForm closeDropdown={closeDropdown} />
          <hr className="my-4 text-secondary-bg dark:text-secondary-bg-dark" />
          <CategoryFilterForm closeDropdown={closeDropdown} />
        </div>
      )}
    </div>
  );
}

// import { HiMiniFunnel } from "react-icons/hi2";

// import useClickOutSide from "../hooks/useClickOutside";

// export default function Filter() {
//   const ref = useClickOutSide(() => {
//     if (ref.current) ref.current.open = false;
//   }, false);

//   return (
//     <details ref={ref} className="group relative">
//       <summary className="rounded cursor-pointer uppercase tracking-wider px-2 py-1.5 text-xs flex hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark [&::-webkit-details-marker]:hidden">
//         <span className="sr-only">Filter</span>
//         <HiMiniFunnel className="text-xl  my-1" />
//       </summary>

//       <div className="z-10 w-64 py-2 px-4 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:end-0 group-open:top-12 dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-900">
//         <h3>Filter Options</h3>
//       </div>
//     </details>
//   );
// }

import { useState } from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

import useClickOutSide from "../hooks/useClickOutside";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const ref = useClickOutSide(closeDropdown);

  return (
    <div ref={ref} className="md:relative">
      <button
        onClick={toggleDropdown}
        className="rounded cursor-pointer uppercase tracking-wider px-2 py-1.5 text-xs flex hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark"
      >
        <span className="sr-only">Sort</span>
        <HiOutlineChevronUpDown className="text-2xl my-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-64 py-2 px-4 rounded border border-secondary-bg bg-third-bg shadow dark:border-secondary-bg-dark dark:bg-third-bg-dark">
          <h3 className="mb-2 font-medium">Sort Options</h3>

          <p>Sort Options Form Content Here....</p>

          <button
            onClick={closeDropdown}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// import { HiOutlineChevronUpDown } from "react-icons/hi2";

// import useClickOutSide from "../hooks/useClickOutside";

// export default function Sort() {
//   const ref = useClickOutSide(() => {
//     if (ref.current.open) ref.current.open = false;
//   });

//   return (
//     <details ref={ref} className="group">
//       <summary className="rounded cursor-pointer uppercase tracking-wider px-2 py-1.5 text-xs flex hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark [&::-webkit-details-marker]:hidden">
//         <span className="sr-only">Sort</span>
//         <HiOutlineChevronUpDown className="text-2xl my-1" />
//       </summary>

//       <div className="z-10 w-64 py-2 px-4 divide-y divide-gray-300 rounded border border-gray-300 bg-white shadow-sm group-open:absolute group-open:end-0 group-open:top-12 dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-900">
//         <h3>Sort By Options</h3>
//       </div>
//     </details>
//   );
// }

import { useState } from "react";
import { useSearchParams } from "react-router";

import Button from "../../components/Button";

export default function SortProductsForm({ closeDropdown }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const minPrice = searchParams.get("price_min") || 0;
  // const maxPrice = searchParams.get("price_max") || 0;

  const [minPrice, setMinPrice] = useState(searchParams.get("price_min") || 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price_max") || 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (minPrice == 0 || maxPrice == 0) return;

    // console.log("Min Price: ", minPrice);
    // console.log("Max Price: ", maxPrice);

    searchParams.set("price_min", minPrice);
    searchParams.set("price_max", maxPrice);
    searchParams.delete("page"); // to remove the pagination page value
    setSearchParams(searchParams);

    closeDropdown();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h3>Prices</h3>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="minPrice" className="min-w-12 text-sm">
            Min
          </label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            // placeholder="Min price..."
            className="flex-1 mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="maxPrice" className="min-w-12 text-sm">
            Max
          </label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            // placeholder="Max price..."
            className="flex-1 mt-0.5 px-1.5 py-0.5 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="reset"
          onClick={closeDropdown}
          className="bg-red-500 hover:bg-red-600 text-sm text-white px-3 py-1 rounded cursor-pointer"
        >
          Cancel
        </button>
        <Button
          size="sm"
          type="submit"
          variation="primary"
          className="!capitalize !text-sm"
        >
          Confirm
        </Button>
      </div>
    </form>
  );
}

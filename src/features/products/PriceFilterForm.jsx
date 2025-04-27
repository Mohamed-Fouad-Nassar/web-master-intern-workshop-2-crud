import { useState } from "react";
import { useSearchParams } from "react-router";

import Button from "../../components/Button";

export default function PriceFilterForm({ closeDropdown }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get("price_min") || 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price_max") || 0);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      minPrice == 0 ||
      maxPrice == 0 ||
      minPrice > maxPrice ||
      minPrice === maxPrice
    )
      return;

    searchParams.set("price_min", minPrice);
    searchParams.set("price_max", maxPrice);

    searchParams.delete("page");
    setSearchParams(searchParams);

    closeDropdown();
  }

  function handleResetFilter() {
    searchParams.delete("price_min");
    searchParams.delete("price_max");

    setSearchParams(searchParams);
    closeDropdown();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-sm">Prices</h3>
        <Button
          size="sm"
          type="button"
          variation="secondary"
          onClick={handleResetFilter}
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="minPrice" className="min-w-8 text-sm">
            Min
          </label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            // placeholder="Min price..."
            className="block max-w-full flex-1 mt-0.5 px-1.5 py-0.5 border border-secondary-bg dark:border-secondary-bg-dark rounded"
          />
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="maxPrice" className="min-w-8 text-sm">
            Max
          </label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            // placeholder="Max price..."
            className="block max-w-full flex-1 mt-0.5 px-1.5 py-0.5 border border-secondary-bg dark:border-secondary-bg-dark rounded"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button
          size="sm"
          type="reset"
          variation="danger"
          onClick={closeDropdown}
          className="!capitalize !text-sm"
        >
          Cancel
        </Button>
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

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import Button from "../../components/Button";

export default function CategoryFilterForm({ closeDropdown }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState(
    searchParams.get("category") || ""
  );

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (categoryId === "") return;
    searchParams.set("category", categoryId);
    searchParams.delete("page");
    setSearchParams(searchParams);
    closeDropdown();
  }

  function handleResetFilter() {
    searchParams.delete("category");
    setSearchParams(searchParams);
    closeDropdown();
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="category" className="text-sm">
            Category
          </label>
          <Button
            size="sm"
            type="button"
            variation="secondary"
            onClick={handleResetFilter}
          >
            Reset
          </Button>
        </div>

        <select
          id="category"
          name="category"
          value={categoryId}
          disabled={isLoading}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-2 py-1 w-full rounded border border-secondary-bg dark:border-secondary-bg-dark dark:bg-third-bg-dark dark:text-white disabled:opacity-20"
        >
          <option value="" disabled hidden>
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

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
      </div>
    </form>
  );
}

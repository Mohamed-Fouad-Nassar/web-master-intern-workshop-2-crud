import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (pathname !== "/products") navigate(`/products?query=${value}`);
  };

  // Debounce effect: delay updating the URL
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // Update searchParams only when debounced value changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch.trim() !== "") {
      newParams.delete("page");
      newParams.set("query", debouncedSearch);
    } else newParams.delete("query");

    setSearchParams(newParams);
  }, [debouncedSearch]);
  // }, [debouncedSearch, searchParams, setSearchParams]);

  // Reset search when leaving the products page
  useEffect(() => {
    if (pathname !== "/products") {
      setSearch("");
      setDebouncedSearch("");
    }
  }, [pathname]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-[210px] md:w-full flex justify-end flex-row items-center"
    >
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search In Products..."
          className="block w-full pl-4 pr-10 py-1.5 border border-gray-300 dark:border-gray-300/20 rounded-md"
        />
        <HiMagnifyingGlass className="text-lg absolute top-1/2 right-3.5 transform -translate-y-1/2 text-secondary-txt dark:text-secondary-txt-dark" />
      </div>
    </form>
  );
}

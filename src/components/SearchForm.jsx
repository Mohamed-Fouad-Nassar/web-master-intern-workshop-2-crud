import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchParams({ query: value });

    if (value.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (search.trim() !== "") {
          navigate(`/search?query=${encodeURIComponent(search.trim())}`);
        }
      }}
      className="flex flex-row items-center"
    >
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          className="pl-4 pr-10 py-1.5 border border-gray-300 dark:border-gray-300/20 rounded-md"
          onChange={handleSearch}
          value={search}
        />
        <HiMagnifyingGlass className="text-lg absolute top-1/2 right-3.5 transform -translate-y-1/2 text-secondary-txt dark:text-secondary-txt-dark" />
      </div>
    </form>
  );
}

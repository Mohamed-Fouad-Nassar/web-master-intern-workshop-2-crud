import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("search form submitted");
      }}
      className="flex flex-row items-center"
    >
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          className="pl-4 pr-10 py-1.5 border border-gray-300 dark:border-gray-300/20 rounded-md"
        />
        <HiMagnifyingGlass className="text-lg absolute top-1/2 right-3.5 transform -translate-y-1/2 text-secondary-txt dark:text-secondary-txt-dark" />
      </div>
    </form>
  );
}

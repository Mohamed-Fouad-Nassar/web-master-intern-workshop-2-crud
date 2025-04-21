import { Link } from "react-router";
import { HiPlus } from "react-icons/hi2";

import Button from "../../components/Button";
import Filter from "../../components/Filter";
import Heading from "../../components/Heading";

export default function ProductsHeaderSec() {
  return (
    <section className="flex gap-2 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-300/20 py-2">
      <Heading className="!mb-0">Products List</Heading>
      <div className="relative flex gap-2 items-center">
        <Filter />
        <Button
          as={Link}
          to="/products/create"
          className="flex items-center gap-2"
          title="Navigate to create product page"
        >
          <HiPlus className="text-xl" />
          <span className="hidden md:inline">Add New Product</span>
        </Button>
      </div>
    </section>
  );
}

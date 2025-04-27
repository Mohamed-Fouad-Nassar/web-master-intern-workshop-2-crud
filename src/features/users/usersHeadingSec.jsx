import { Link } from "react-router";
import { HiPlus } from "react-icons/hi2";

import Sort from "../../components/Sort";
import Button from "../../components/Button";
import Heading from "../../components/Heading";

export default function usersHeadingSec() {
  return (
    <section className="flex gap-2 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-300/20 py-2">
      <Heading className="!mb-0">Users List</Heading>

      <Button
        as={Link}
        to="/users/create"
        className="flex items-center gap-2"
        title="Navigate to create users page"
      >
        <HiPlus className="text-xl" />
        <span className="hidden md:inline">Add New Users</span>
      </Button>
    </section>
  );
}

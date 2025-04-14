import { HiOutlineBell, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import Button from "./Button";
import SearchForm from "./SearchForm";

import { useDarkMode } from "../contexts/DarkModeContext";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="p-4 flex justify-end items-center gap-2 bg-primary-bg dark:bg-primary-bg-dark text-primary-txt dark:text-primary-txt-dark">
      <SearchForm />
      <Button variation="goth" size="sm">
        <HiOutlineBell className="text-2xl" />
      </Button>
      <Button onClick={toggleDarkMode} variation="goth" size="sm">
        {isDarkMode ? (
          <HiOutlineSun className="text-2xl" />
        ) : (
          <HiOutlineMoon className="text-2xl" />
        )}
      </Button>
    </header>
  );
}

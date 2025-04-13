import { Fragment } from "react";
import { Link } from "react-router";
import { HiMiniChevronRight } from "react-icons/hi2";

export default function Breadcrumb({ cur, links }) {
  return (
    <nav className="mt-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 capitalize text-gray-600 dark:text-gray-200">
        {links?.map(({ title, href }) => (
          <Fragment key={title}>
            <li className="flex items-center gap-1">
              <Link
                to={href}
                className="block transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                {title}
              </Link>
            </li>
            <li>
              <HiMiniChevronRight className="mt-0.5 text-xl" />
            </li>
          </Fragment>
        ))}
        <li className="ms-1" aria-current="page">
          {cur}
        </li>
      </ol>
    </nav>
  );
}

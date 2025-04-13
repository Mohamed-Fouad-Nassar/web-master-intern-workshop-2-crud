import { Link } from "react-router";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ul className="pl-10 py-4 list-disc">
        <li>
          <Link
            to="register"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Register
          </Link>
        </li>
        <li>
          <Link
            to="login"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Login
          </Link>
        </li>
        <br />
        <li>
          <Link
            to="/"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Dashboard
          </Link>
        </li>
        <br />
        <li>
          <Link
            to="products"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="products/create"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Create New Product
          </Link>
        </li>
        <li>
          <Link
            to="products/1/edit"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Edit Product
          </Link>
        </li>
        <br />
        <li>
          <Link
            to="users"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="users/create"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Create New User
          </Link>
        </li>
        <br />
        <li>
          <Link
            to="error"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Error
          </Link>
        </li>
      </ul>

      <Spinner />
    </div>
  );
}

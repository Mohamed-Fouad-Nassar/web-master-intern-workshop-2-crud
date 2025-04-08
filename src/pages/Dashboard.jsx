import { Link } from "react-router";

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
        <li>
          <Link
            to="dashboard"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="error"
            className="text-blue-800 hover:text-blue-950 hover:underline"
          >
            Error
          </Link>
        </li>
      </ul>
    </div>
  );
}

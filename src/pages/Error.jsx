import { Link, useNavigate } from "react-router";

import Button from "../components/Button";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div class="bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div class="flex items-center justify-center min-h-screen px-2">
        <div class="text-center">
          <h1 class="text-9xl font-bold">404</h1>
          <p class="text-2xl font-medium mt-4">Oops! Page not found</p>
          <p class="mt-4 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-2 justify-center items-center">
            <Button variation="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button as={Link} to="/">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

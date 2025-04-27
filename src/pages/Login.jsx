import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <>
      <div className="py-6 text-center">
        <h2 className="text-xl uppercase font-medium mb-2">Log In</h2>
        <p className="max-w-[85%] mx-auto leading-4 text-base text-secondary-txt dark:text-secondary-txt-dark">
          Enter your credentials to access your account
        </p>
      </div>

      <LoginForm />
    </>
  );
}

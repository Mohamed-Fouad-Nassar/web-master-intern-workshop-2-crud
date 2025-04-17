import Button from "../../components/Button";
import FormInput from "../../components/FormInput";

export default function LoginForm() {
  return (
    <form className="block w-full" onSubmit={(e) => e.preventDefault()}>
      <FormInput label="Email" type="email" name="email" />
      <FormInput label="Password" type="password" name="password" />
      <Button className="mt-4 w-full">Log in</Button>
    </form>
  );
}

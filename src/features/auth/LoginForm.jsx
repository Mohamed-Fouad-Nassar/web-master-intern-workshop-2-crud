import { Form, Formik } from "formik";

import Button from "../../components/Button";
import FormInputLogin from "../../components/FormInputLogin";

import {
  loginInitialValues,
  loginValidationSchema,
} from "../../utils/loginValidation";

import useLogin from "./useLogin";

export default function LoginForm() {
  const { isLoading, error, handleSubmit } = useLogin();

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
    >
      <Form className="block w-full">
        <FormInputLogin label="Email" name="email" type="email" />
        <FormInputLogin label="Password" name="password" type="password" />
        <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Form>
    </Formik>
  );
}

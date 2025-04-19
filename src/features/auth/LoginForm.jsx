import { Form, Formik } from "formik";
import Button from "../../components/Button";
import FormInputLogin from "../../components/FormInputLogin";
import {
  createLoginValidationSchema,
  loginInitialValues,
} from "../../utils/loginValidation";
import { useEffect, useState } from "react";
import { getusers } from "../../services/usersAPI";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../store/auth/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [validationSchema, setValidationSchema] = useState(null);
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchUsers() {
      const allData = await getusers(null, true);
      setValidationSchema(createLoginValidationSchema(allData));
    }
    fetchUsers();
  }, []);

  const handleSubmit = (values) => {
    dispatch(LogIn(values));
    console.log("sesh");
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="block w-full">
        <FormInputLogin label="Email" name="email" type="email" />
        <FormInputLogin label="Password" name="password" type="password" />
        <Button type="submit" className="mt-4 w-full">
          {loading ? "Logging in..." : "Log in"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Form>
    </Formik>
  );
}

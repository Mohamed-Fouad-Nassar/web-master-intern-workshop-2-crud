import { Form, Formik } from "formik";
import Button from "../../components/Button";
import FormInputLogin from "../../components/FormInputLogin";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../../utils/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, LogIn } from "../../store/auth/authSlice";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    const res = await dispatch(LogIn(values)).unwrap();
    if (res) {
      dispatch(fetchProfile())
      navigate("/");
    }
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="block w-full">
        <FormInputLogin label="Email" name="email" type="email" />
        <FormInputLogin label="Password" name="password" type="password" />
        <Button type="submit" className="mt-4 w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Form>
    </Formik>
  );
}

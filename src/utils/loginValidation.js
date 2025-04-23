import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  password: string().required("Password is required"),
});

export const loginInitialValues = {
  email: "admin@mail.com",
  password: "admin123",
};

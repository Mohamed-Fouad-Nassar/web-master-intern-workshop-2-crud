import { object, string } from "yup";

export const createLoginValidationSchema = (users) =>
  object({
    email: string()
      .test("", "This email does not exist.", (value) =>
        users.some((user) => user.email === value && user.role === "admin")
      )
      .required("Email is required!"),

    password: string()
      .test("", "Incorrect password", function (value) {
        const emailVal = this.parent.email;
        return users.find(
          (user) =>
            user.password === value &&
            user.email === emailVal &&
            user.role === "admin"
        );
      })
      .required("Password is required"),
  });

export const loginInitialValues = {
  email: "",
  password: "",
};

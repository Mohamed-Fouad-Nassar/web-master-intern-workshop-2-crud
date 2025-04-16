import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserForm = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required("First name is required")
      .matches(
        /^[a-zA-Z ]*$/,
        "First name can only contain letters and spaces"
      ),

    lastName: Yup.string()
      .trim()
      .required("Last name is required")
      .matches(/^[a-zA-Z ]*$/, "Last name can only contain letters and spaces"),

    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
      ),

    avatar: Yup.mixed()
      .required("Avatar is required")
      .test(
        "fileSize",
        "File size is too large (max 5MB)",
        (value) => value && value.size <= 5 * 1024 * 1024
      )
      .test(
        "fileType",
        "Only image files are allowed (JPG, PNG, JPEG)",
        (value) =>
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      ),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password can't be longer than 20 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one letter and one number"
      ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    avatar: null,
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const file = values.avatar;
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Avatar = reader.result;

        const payload = {
          ...values,
          avatar: base64Avatar,
        };

        await axios.post(
          "https://web-master-intern-workshop-2-crud-backend.vercel.app/users",
          payload
        );
        toast.success("User created successfully!");
        resetForm();
        setPreview(null);
        navigate("/users");
      };

      reader.readAsDataURL(file);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="userForm mt-10 p-9 vh-100 shadow-md">
      {/* <Toaster position="top-right" /> */}
      <h1 className=" font-bold text-3xl mb-5 position-relative">
        Create New User
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="ml-3 flex gap-5 flex-col">
            <div>
              <label className="block font-medium">First Name</label>
              <Field
                type="text"
                name="firstName"
                className="w-full border p-2 rounded max-w-lg"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className="w-full border p-2 rounded max-w-lg"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full border p-2 rounded max-w-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("avatar", file);
                  setPreview(URL.createObjectURL(file));
                }}
                className="img w-lg h-52 p-2 rounded"
              />
              <ErrorMessage
                name="avatar"
                component="div"
                className="text-red-500 text-sm"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 rounded w-24 h-24 object-cover border"
                />
              )}
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full border p-2 rounded max-w-lg"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className=" text-white py-2 rounded  w-100  text-lg
              "
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;

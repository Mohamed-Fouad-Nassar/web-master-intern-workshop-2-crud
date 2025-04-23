import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { LogIn, fetchProfile } from "../../store/auth/authSlice";

export default function useLogin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    const res = await dispatch(LogIn(values))
      .unwrap()
      .then(() => toast.success("Logged in successfully!"))
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
    if (res) {
      dispatch(fetchProfile());
      navigate("/");
    }
  };

  return {
    error,
    isLoading,
    handleSubmit,
  };
}

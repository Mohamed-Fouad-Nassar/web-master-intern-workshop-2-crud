import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

import DetailsList from "../DetailsList";

export default function UserModal({ data }) {
  const { id, avatar, name, email, role, password } = data;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <img alt={name} src={avatar} className="rounded-full size-60" />

      <DetailsList>
        <DetailsList.Row title="ID" value={id} />
        <DetailsList.Row title="Name" value={name} />
        <DetailsList.Row title="Email" value={email} />
        <DetailsList.Row title="Role" value={role} />
        <DetailsList.Row
          title="Password"
          value={showPassword ? password : "********"}
        >
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-xl ml-auto text-primary-txt dark:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
          </button>
        </DetailsList.Row>
      </DetailsList>
    </div>
  );
}

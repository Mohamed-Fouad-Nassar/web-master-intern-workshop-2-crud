import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function UserModal({ data }) {
  const { id, avatar, name, email, role, password } = data;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-10 items-center w-full">
      <img src={avatar} alt={name} className="rounded-full size-60" />
      {/* user information */}
      <div className="space-y-3 modal-details w-full">
        <p>
          <span>id:</span>
          {id}
        </p>
        <p>
          <span>name:</span>
          {name}
        </p>
        <p>
          <span>email:</span>
          {email}
        </p>
        <p>
          <span>role:</span>
          {role}
        </p>
        <p className="flex w-full">
          <span>password:</span>
          {showPassword ? password : "********"}
          {/* show password */}
          <button
            className="cursor-pointer text-2xl ml-auto text-primary-txt dark:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </button>
        </p>
      </div>
    </div>
  );
}

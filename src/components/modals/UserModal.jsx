import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

import DetailsList from "../DetailsList";

export default function UserModal({ data }) {
  const { id, avatar, name, email, role, password } = data;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <img src={avatar} alt={name} className="rounded-full size-60" />

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

// import { useState } from "react";
// import { VscEye, VscEyeClosed } from "react-icons/vsc";

// export default function UserModal({ data }) {
//   const { id, avatar, name, email, role, password } = data;

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex gap-10 items-center w-full">
//       <img src={avatar} alt={name} className="rounded-full size-60" />
//       {/* user information */}
//       <div className="space-y-3 modal-details w-full">
//         <p>
//           <span>id:</span>
//           {id}
//         </p>
//         <p>
//           <span>name:</span>
//           {name}
//         </p>
//         <p>
//           <span>email:</span>
//           {email}
//         </p>
//         <p>
//           <span>role:</span>
//           {role}
//         </p>
//         <p className="flex w-full">
//           <span>password:</span>
//           {showPassword ? password : "********"}
//           {/* show password */}
//           <button
//             className="cursor-pointer text-2xl ml-auto text-primary-txt dark:text-white"
//             onClick={() => setShowPassword((prev) => !prev)}
//           >
//             {showPassword ? <VscEye /> : <VscEyeClosed />}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

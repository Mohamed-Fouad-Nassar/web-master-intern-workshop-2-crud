import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import UsersHeadingSec from "../features/users/usersHeadingSec";

const users = [
  {
    id: 1,
    lastName: "one",
    firstName: "user",
    email: "user1@gmail.com",
    avatar:
      "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/users/user-avatar-1.png",
    password: "$2a$10$MbNbATUFQjUZQPCVJEIeE.a3WF4GIbSdg.M6yDwZnokUCY9..6kLm",
  },
  {
    id: 2,
    lastName: "one",
    firstName: "user",
    email: "user1@gmail.com",
    avatar:
      "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/users/user-avatar-1.png",
    password: "$2a$10$MbNbATUFQjUZQPCVJEIeE.a3WF4GIbSdg.M6yDwZnokUCY9..6kLm",
  },
  {
    id: 3,
    lastName: "one",
    firstName: "user",
    email: "user1@gmail.com",
    avatar:
      "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/users/user-avatar-1.png",
    password: "$2a$10$MbNbATUFQjUZQPCVJEIeE.a3WF4GIbSdg.M6yDwZnokUCY9..6kLm",
  },
  {
    id: 4,
    lastName: "one",
    firstName: "user",
    email: "user1@gmail.com",
    avatar:
      "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/users/user-avatar-1.png",
    password: "$2a$10$MbNbATUFQjUZQPCVJEIeE.a3WF4GIbSdg.M6yDwZnokUCY9..6kLm",
  },
  {
    id: 5,
    lastName: "one",
    firstName: "user",
    email: "user1@gmail.com",
    avatar:
      "https://web-master-intern-workshop-1-ecommerce-backend.vercel.app/data/users/user-avatar-1.png",
    password: "$2a$10$MbNbATUFQjUZQPCVJEIeE.a3WF4GIbSdg.M6yDwZnokUCY9..6kLm",
  },
];

export default function Users() {
  return (
    <>
      <Breadcrumb cur="users" links={[{ title: "home", href: "/" }]} />
      <UsersHeadingSec />
      <UsersTable users={users} />
      {/* <div>Pagination</div> */}
    </>
  );
}

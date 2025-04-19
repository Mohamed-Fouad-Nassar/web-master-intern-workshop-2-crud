import { useEffect, useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import LoadMoreBtn from "../features/users/LoadMoreBtn";
import UsersHeadingSec from "../features/users/usersHeadingSec";

import { getUsers } from "../services/usersAPI";

export default function Users() {
  const [users, setUsers] = useState([]);

  // display users on first render
  useEffect(() => {
    async function getUsersData() {
      const apiUsers = await getUsers();
      setUsers(apiUsers);
    }
    getUsersData();
  }, []);

  return (
    <>
      <Breadcrumb cur="users" links={[{ title: "home", href: "/" }]} />
      <UsersHeadingSec />
      <UsersTable users={users} />
      <LoadMoreBtn {...{ setUsers, users }} />
    </>
  );
}

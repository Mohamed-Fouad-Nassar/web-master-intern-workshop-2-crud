import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import UsersHeadingSec from "../features/users/usersHeadingSec";
import { useEffect, useState } from "react";
import { getusers } from "../services/productsAPI";
import LoadMoreBtn from "../features/users/LoadMoreBtn";

export default function Users() {
  const [users, setUsers] = useState([]);

  // display users on first render
  useEffect(() => {
    async function getUsersData() {
      const apiUsers = await getusers();
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

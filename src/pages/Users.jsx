import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import UsersHeadingSec from "../features/users/usersHeadingSec";
import { useEffect, useState } from "react";
import LoadMoreBtn from "../features/users/LoadMoreBtn";
import { getusers } from "../services/usersAPI";

export default function Users() {
  const [users, setUsers] = useState([]);

  // display users on first render
  useEffect(() => {
    async function getUsersData() {
      // first render 
      const usersData = await getusers();
      setUsers(usersData);
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

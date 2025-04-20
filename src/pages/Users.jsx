import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import UsersHeadingSec from "../features/users/usersHeadingSec";
import { useContext, useEffect, useState } from "react";
import LoadMoreBtn from "../features/users/LoadMoreBtn";
import { getusers } from "../services/usersAPI";
import AppContext from "../context/AppContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { usersRole } = useContext(AppContext);

  // display users on first render
  useEffect(() => {
    async function getUsersData() {
      // first render
      const usersData = await getusers(10,usersRole);
      setUsers(usersData);
    }
    // filter the users to the usersRole
    // change the getUsers function in all compoenets

    getUsersData();
  }, [usersRole]);

  return (
    <>
      <Breadcrumb cur="users" links={[{ title: "home", href: "/" }]} />
      <UsersHeadingSec />
      <UsersTable users={users} />
      <LoadMoreBtn {...{ setUsers, users }} />
    </>
  );
}

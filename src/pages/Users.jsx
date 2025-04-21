import Breadcrumb from "../components/Breadcrumb";
import UsersTable from "../features/users/usersTable";
import UsersHeadingSec from "../features/users/usersHeadingSec";
import { useContext, useEffect, useState } from "react";
import LoadMoreBtn from "../features/users/LoadMoreBtn";
import { getusers, getusersCount } from "../services/usersAPI";
import AppContext from "../contexts/AppContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { usersRole } = useContext(AppContext);
  const [usersCounts, setUsersCounts] = useState(0);

  // display users on first render
  useEffect(() => {
    async function getUsersData() {
      // first render
      const usersData = await getusers(usersRole);
      const userslength = await getusersCount(usersRole);

      setUsers(usersData);
      setUsersCounts(userslength);
    }

    getUsersData();
  }, [usersRole]);

  return (
    <>
      <Breadcrumb cur="users" links={[{ title: "home", href: "/" }]} />
      <UsersHeadingSec />
      <UsersTable users={users} />
      <LoadMoreBtn {...{ setUsers, users, usersCounts }} />
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import { getusers } from "../../services/usersAPI";
import AppContext from "../../context/AppContext";

export default function LoadMoreBtn({ setUsers, users }) {
  const [loading, setLoading] = useState(false);
  const [usersCounts, setUsersCounts] = useState(0);
  const { usersRole } = useContext(AppContext);

  useEffect(() => {
    const fetchUsersCount = async () => {
      setUsersCounts(users.length);
    };

    fetchUsersCount();
  }, [users]);

  const updateUsersData = async (addedUsersCount) => {
    setLoading(true);
    try {
      const apiUsers = await getusers(addedUsersCount, usersRole);
      setUsers(apiUsers);
    } catch (error) {
      console.error("Failed to load more users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (usersCounts === users.length) return null;

  return (
    <div className="flex items-center justify-center w-full">
      <Button
        onClick={() => updateUsersData(users.length + 10)}
        disabled={loading}
        className={`${
          loading &&
          "!bg-primary-btn-bg/30 !cursor-not-allowed !border-primary-btn-bg/30"
        }`}
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

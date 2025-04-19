import { useEffect, useState } from "react";
import { getusers, getusersCount } from "../../services/productsAPI";
import Button from "../../components/Button";

export default function LoadMoreBtn({ setUsers, users }) {
  const [loading, setLoading] = useState(false);
  const [usersCounts, setUsersCounts] = useState(0);

  useEffect(() => {
    const fetchUsersCount = async () => {
      const count = await getusersCount();
      setUsersCounts(count);
    };

    fetchUsersCount();
  }, []);

  const updateUsersData = async (addedUsersCount) => {
    setLoading(true);
    try {
      const apiUsers = await getusers(addedUsersCount);
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
        className={`${loading && "!bg-primary-btn-bg/30 !cursor-not-allowed !border-primary-btn-bg/30"}`}
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

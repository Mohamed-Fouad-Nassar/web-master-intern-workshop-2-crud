import {
  MdApps,
  MdAccountCircle,
  MdOutlinePeopleAlt,
  MdAdminPanelSettings,
} from "react-icons/md";
import { Link } from "react-router";
import { createElement, useContext, useEffect, useState } from "react";

import Spinner from "../components/Spinner";

import { getusersCount } from "../services/usersAPI";
import { getProductsCount } from "../services/productsAPI";

import AppContext from "../contexts/AppContext";

const contentStyles = {
  icons: {
    svg: [MdApps, MdOutlinePeopleAlt, MdAccountCircle, MdAdminPanelSettings],
    colors: ["#8bccf0", "#141414", "#fdb50a", "#fdfdfd"],
  },
  bg: ["#f0f9ff", "#e1e1e1", "#fceeca", "#fdb50a"],
};

export default function Dashboard() {
  const [dataCounts, setDataCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { setUsersRole } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch total product count
        const products = await getProductsCount();

        // fetch all users by their roles
        const customer = await getusersCount("customer");
        const admin = await getusersCount("admin");

        // fetch total user count
        const users = await getusersCount();
        // update state with fetched data
        setDataCounts({ products, users, customer, admin });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-6 py-20">
      {Object.entries(dataCounts).map(([key, val], i) => (
        <Link
          to={key === "products" ? "/products" : "/users"}
          key={key}
          onClick={() => setUsersRole(key)}
          style={{ backgroundColor: contentStyles.bg[i] }}
          className="rounded-md p-4 space-y-10 transition-all hover:opacity-90"
        >
          <h2
            className="capitalize text-4xl flex flex-col"
            style={{ color: contentStyles.icons.colors[i] }}
          >
            {createElement(contentStyles.icons.svg[i])}
            <span className="text-base">{key}</span>
          </h2>
          <p className="text-end text-lg font-semibold">{val}</p>
        </Link>
      ))}
    </div>
  );
}

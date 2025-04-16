import { useLocation } from "react-router";
import { useState, useEffect } from "react";

const API = "https://api.escuelajs.co/api/v1";

const useGetData = (id) => {
  const { pathname } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    // if the id is null , set data to null and return
    if (id === null) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API}${pathname}/${id}`);
        if (!response.ok) {
          // if the response is not ok, set data to undefined and return
          setData(undefined);
          return;
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [id]);

  return { data };
};

export default useGetData;

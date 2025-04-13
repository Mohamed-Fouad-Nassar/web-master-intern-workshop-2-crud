import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const API = "https://web-master-intern-workshop-2-crud-backend.vercel.app";

const useGetData = (id) => {
  const { pathname } = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API}${pathname}/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
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

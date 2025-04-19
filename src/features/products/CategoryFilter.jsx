import { useEffect, useState } from "react";

export default function CategoryFilter({ categoryId, setCategoryId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <label htmlFor="category" className="text-sm">
        Category
      </label>
      <select
        id="category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="">All Categories</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

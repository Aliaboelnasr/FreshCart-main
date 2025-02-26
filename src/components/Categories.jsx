import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Hook للتنقل

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/categories/${category._id}`)} // التنقل عند النقر
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-contain rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">
                Explore {category.name} collection &gt;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;

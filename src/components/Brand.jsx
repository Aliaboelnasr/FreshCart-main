import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shop by Brand</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/brands/${brand._id}`)} // الانتقال عند النقر
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
            <p className="text-sm text-gray-600">View Products &gt;</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;

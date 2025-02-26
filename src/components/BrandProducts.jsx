import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BrandProducts = () => {
  const { id } = useParams(); // التقاط معرف العلامة التجارية من URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => console.error("Error fetching brand products:", error));
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products of Brand</h2>
      {products.length === 0 ? (
        <p>No products available for this brand.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandProducts;

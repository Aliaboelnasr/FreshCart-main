import { useContext, useEffect } from "react";
import useQueryWishlist, { getWishlist } from "../hooks/useQueryWishlist";
import useMutationWishlist, {
  removeFromWishlist,
} from "../hooks/useMutationWishlist";
import { wishlistContext } from "../context/WishlistContext";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../hooks/useMutationcart";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { setWishlistCount } = useContext(wishlistContext);
  const { data, isError, error, isLoading } = useQueryWishlist(getWishlist);
  const { mutate: removeFromWishlistMutation } =
    useMutationWishlist(removeFromWishlist);
  const { mutate: addToCartMutation } = useMutationCart(addToCart);

  useEffect(() => {
    if (data?.data?.count !== undefined) {
      setWishlistCount(data.data.count);
    }
  }, [data, setWishlistCount]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const wishlistItems = data?.data?.data || [];

  if (!wishlistItems.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <i className="fa-solid fa-heart text-9xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-600">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Add some products to your wishlist!
        </p>
        <Link
          to="/products"
          className="mt-4 bg-green-400 text-white px-6 py-3 rounded hover:bg-green-500"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link to={`/productdetails/${product._id}/${product.category._id}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <p className="text-green-color text-sm font-bold">
                {product.category.name}
              </p>
              <h3 className="font-semibold text-lg mb-2 truncate">
                {product.title}
              </h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold">{product.price} EGP</span>
                <div className="flex items-center">
                  <span className="text-sm">
                    {product.ratingsAverage}
                    <i className="fa-solid fa-star text-rating-color ml-1"></i>
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addToCartMutation(product._id);
                  toast.success("Added to cart!");
                }}
                className="flex-1 bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  removeFromWishlistMutation(product._id);
                  toast.success("Removed from wishlist!");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

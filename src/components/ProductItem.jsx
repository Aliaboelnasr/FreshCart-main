import { Link } from "react-router-dom";
import useMutationCart, { addToCart } from "../hooks/useMutationcart";
import useMutationWishlist, {
  addToWishlist,
} from "../hooks/useMutationWishlist";
import toast from "react-hot-toast";

export default function ProductItem({ prod }) {
  let {
    imageCover,
    id,
    title,
    price,
    category,
    ratingsAverage,
    priceAfterDiscount,
  } = prod;

  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart);
  let { mutate: addToWishlistMutation } = useMutationWishlist(addToWishlist);

  if (isSuccess) toast.success(data?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);

  return (
    <div className="product cursor-pointer lg:w-1/6 md:w-1/4 sm:1/6 w-full p-4">
      <Link to={`/productdetails/${id}/${category._id}`}>
        <img src={imageCover} className="w-full" alt="" />
        <p className="text-green-color text-sm font-bold">{category.name}</p>
        <p>{title}</p>
        <div className="flex justify-between my-3">
          <div>
            <p className={priceAfterDiscount ? "line-through" : ""}>
              {price} EGP
            </p>
            <p>{priceAfterDiscount ? priceAfterDiscount + "EGP" : ""}</p>
          </div>
          <div>
            <span>
              {ratingsAverage}
              <i className="fa-solid fa-star text-rating-color"></i>
            </span>
          </div>
        </div>
      </Link>
      <div className="flex gap-2">
        <button
          onClick={() => {
            mutate(id);
          }}
          className="btn bg-green-400 text-white px-5 py-3 rounded flex-1"
        >
          add to Cart
        </button>
        <button
          onClick={() => {
            addToWishlistMutation(id);
            toast.success("Added to wishlist!");
          }}
          className="btn bg-red-600 text-white px-4 py-3 rounded hover:bg-red-700"
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

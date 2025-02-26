import React, { useContext, useEffect, useState } from "react";
import useQueryCart, { getCarts } from "../hooks/useQueryCart";
import img from "../assets/images/Empty cart illustration.jpeg";
import useMutationCart, {
  clearCart,
  deleteItem,
  updateCount,
} from "../hooks/useMutationcart";
import Payment from "./Payment";
import { counterContext } from "../context/Countercontext";
import Loading from "./Loading";

export default function Cart() {
  const { setCartNums } = useContext(counterContext);
  const { data, isError, error, isLoading } = useQueryCart(getCarts);
  const { mutate: deleteItemMutation } = useMutationCart(deleteItem);
  const { mutate: clearCartMutation } = useMutationCart(clearCart);
  const { mutate: updateCountMutation } = useMutationCart(updateCount);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data?.data?.numOfCartItems) {
      setCartNums(data.data.numOfCartItems);
    }
  }, [data, setCartNums]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data?.data?.numOfCartItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={img} alt="Empty cart" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Quantity</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.data?.data?.products) &&
            data.data.data.products.map((prod, index) => (
              <tr key={`${prod.product._id}-${index}`} className="border-b">
                <td className="p-4">
                  <img
                    src={prod.product.imageCover}
                    alt={prod.product.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-4">{prod.product.title}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateCountMutation({
                          productId: prod.product._id,
                          count: Math.max(1, prod.count - 1),
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{prod.count}</span>
                    <button
                      onClick={() =>
                        updateCountMutation({
                          productId: prod.product._id,
                          count: prod.count + 1,
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-4">${prod.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteItemMutation(prod.product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCartMutation}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">
          Total: ${data?.data?.data?.totalCartPrice || 0}
        </div>
      </div>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="bg-green-color p-4 my-10 cursor-pointer"
      >
        Pay Online
      </button>
      {isOpen && <Payment cartId={data?.data?.cartId} />}
    </div>
  );
}

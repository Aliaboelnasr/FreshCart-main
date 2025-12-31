import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserToken";

//add to cart
export function addToCart(productId, token) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

//delete item from cart
export function deleteItem(productId, token) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
}

//clear item from cart
export const clearCart = (token) => {
  return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {
      'token': token
    }
  });
};

//update
export function updateCount({ productId, count }, token) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

export const removeFromCart = (productId, token) => {
  return axios.delete(`http://localhost:3000/cart/${productId}`, {
    headers: {
      'token': token
    }
  });
};

export default function useMutationCart(fn) {
  const queryClient = useQueryClient();
  const { token } = useContext(UserTokenContext);

  return useMutation({
    mutationFn: (data) => fn(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

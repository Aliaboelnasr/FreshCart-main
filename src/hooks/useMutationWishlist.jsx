import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserToken";

// Add to wishlist
export function addToWishlist(productId, token) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

// Remove from wishlist
export function removeFromWishlist(productId, token) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
}

export default function useMutationWishlist(fn) {
  const queryClient = useQueryClient();
  const { token } = useContext(UserTokenContext);

  return useMutation({
    mutationFn: (data) => fn(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

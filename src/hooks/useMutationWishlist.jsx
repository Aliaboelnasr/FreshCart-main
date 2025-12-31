import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Add to wishlist
export function addToWishlist(productId) {
  const token = localStorage.getItem("token");
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
export function removeFromWishlist(productId) {
  const token = localStorage.getItem("token");
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

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

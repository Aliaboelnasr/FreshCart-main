import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getWishlist() {
  const token = localStorage.getItem("token");
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token,
    },
  });
}

export default function useQueryWishlist(fn) {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fn,
    refetchOnWindowFocus: false,
  });
}

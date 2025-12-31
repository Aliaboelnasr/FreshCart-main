import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let token = localStorage.getItem("token");

export function getWishlist() {
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
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });
}

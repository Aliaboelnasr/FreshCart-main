import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserToken";

export function getWishlist(token) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token,
    },
  });
}

export default function useQueryWishlist(fn) {
  const { token } = useContext(UserTokenContext);
  
  return useQuery({
    queryKey: ["wishlist", token],
    queryFn: () => fn(token),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
}

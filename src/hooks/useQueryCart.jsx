import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserToken";

export function getCarts(token) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export default function useQueryCart(fn) {
  const { token } = useContext(UserTokenContext);
  
  return useQuery({
    queryKey: ["cart", token],
    queryFn: () => fn(token),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
}

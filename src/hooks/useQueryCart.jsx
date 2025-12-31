import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function getCarts() {
  const token = localStorage.getItem("token");
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export default function useQueryCart(fn) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fn,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });
}

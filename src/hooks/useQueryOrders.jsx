import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserToken";
import { getUserOrders } from "../Apis/orders";
import { jwtDecode } from "jwt-decode";

export default function useQueryOrders() {
  const { token } = useContext(UserTokenContext);
  
  // Decode token to get user ID
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId, token),
    enabled: !!token && !!userId,
    refetchOnWindowFocus: false,
  });
}

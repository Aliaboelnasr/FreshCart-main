import axios from "axios";

export function getUserOrders(userId, token) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
    headers: {
      token,
    },
  });
}

import axios from "axios";

export function paymentOnline({cartId, shippingAddress, token})
{
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{headers:{token}})
}
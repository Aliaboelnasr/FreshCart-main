import axios from "axios";

export function paymentOnline({cartId, shippingAddress, token})
{
   // Use environment variable for live demo URL, fallback to localhost for development
   const liveDemoURL = import.meta.env.VITE_LIVE_DEMO_URL || window.location.origin;
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${liveDemoURL}`,{shippingAddress},{headers:{token}})
}
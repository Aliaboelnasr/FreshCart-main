import axios from "axios";

export function paymentOnline({cartId, shippingAddress, token})
{
   // Use environment variable for live demo URL, fallback to window location origin for development
   const liveDemoURL = import.meta.env.VITE_LIVE_DEMO_URL || window.location.origin;
   // The URL parameter tells the payment gateway where to redirect after successful payment
   // The API will append 'allorders' or redirect to the specified URL
   return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${liveDemoURL}/allorders`,{shippingAddress},{headers:{token}})
}
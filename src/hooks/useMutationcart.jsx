import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

//add to cart
export function addToCart(productId) {
  const token = localStorage.getItem("token");
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

//delete item from cart
export function deleteItem(productId) {
  const token = localStorage.getItem("token");
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
}

//clear item from cart
export const clearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    }
  });
};

//update
export function updateCount({ productId, count }) {
  const token = localStorage.getItem("token");
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

export const removeFromCart = (productId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/cart/${productId}`, {
        headers: {
          token
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    }
  });
};

export default function useMutationCart(fn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

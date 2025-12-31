import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import { counterContext } from "../context/Countercontext";

export default function AllOrders() {
  const navigate = useNavigate();
  const { setCartNums } = useContext(counterContext);

  useEffect(() => {
    // Reset cart counter after successful payment
    setCartNums(0);
  }, [setCartNums]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    </motion.div>
  );
}

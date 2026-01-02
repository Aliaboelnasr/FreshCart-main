import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";
import { counterContext } from "../context/Countercontext";
import useQueryOrders from "../hooks/useQueryOrders";
import Loading from "./Loading";

export default function AllOrders() {
  const navigate = useNavigate();
  const { setCartNums } = useContext(counterContext);
  const { data, isError, error, isLoading } = useQueryOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    // Reset cart counter after successful payment
    setCartNums(0);
  }, [setCartNums]);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Orders</h1>
          <p className="text-gray-600 mb-8">
            {error?.response?.data?.message || error?.message || "Unable to fetch orders. Please try again later."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    );
  }

  // Extract orders from response
  const orders = data?.data || [];

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">
            You haven&apos;t placed any orders yet. Start shopping to see your orders here!
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

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {currentOrders.map((order) => (
          <div
            key={order.id || order._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Order #{order.id || order._id}
                </h2>
                <p className="text-sm text-gray-600">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              
              <div className="flex flex-col items-start md:items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    order.isPaid
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.isPaid ? 'Paid' : 'Pending Payment'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.isDelivered
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.isDelivered ? 'Delivered' : 'In Transit'}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-800">{order.paymentMethodType}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-medium text-gray-800">
                  {order.cartItems?.length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  ${order.totalOrderPrice}
                </span>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.details}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/products")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </motion.div>
  );
}

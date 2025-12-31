import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { paymentOnline } from "../Apis/payment";
import { useFormik } from "formik";
import * as motion from "motion/react-client";
import { UserTokenContext } from "../context/UserToken";
import { paymentSchema } from "../libs/paymentSchema";
import { formatCardNumber, formatExpirationDate, detectCardType } from "../libs/paymentValidation";

export default function Payment({ cartId }) {
  const { token } = useContext(UserTokenContext);
  const [cardType, setCardType] = useState("unknown");
  
  let { mutate, data, isPending } = useMutation({ 
    mutationFn: (shippingData) => paymentOnline({ ...shippingData, token }) 
  });

  function handlePayment(values) {
    // Extract only shipping address for API call
    const shippingAddress = {
      details: values.details,
      city: values.city,
      phone: values.phone,
    };
    mutate({ cartId, shippingAddress });
  }
  
  if (data?.data?.status === "success")
    window.location.href = data?.data?.session?.url;

  let formik = useFormik({
    initialValues: {
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      zipCode: "",
      details: "",
      city: "",
      phone: "",
    },
    validationSchema: paymentSchema,
    onSubmit: handlePayment,
  });

  // Handle card number formatting and card type detection
  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\s+/g, '').replace(/\D/g, '');
    
    // Limit to 19 digits
    if (cleaned.length <= 19) {
      formik.setFieldValue('cardNumber', cleaned);
      setCardType(detectCardType(cleaned));
    }
  };

  // Handle expiration date formatting
  const handleExpirationChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 4) {
      formik.setFieldValue('expirationDate', formatExpirationDate(cleaned));
    }
  };

  // Handle CVV input
  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    
    if (value.length <= maxLength) {
      formik.setFieldValue('cvv', value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="my-4 text-2xl font-bold">Payment Information</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Card Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Card Details</h3>
          
          {/* Cardholder Name */}
          <div className="mb-4">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formik.values.cardholderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John Doe"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.cardholderName && formik.errors.cardholderName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.cardholderName && formik.errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.cardholderName}</p>
            )}
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
              {cardType !== 'unknown' && (
                <span className="ml-2 text-xs text-green-600 capitalize">({cardType})</span>
              )}
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formatCardNumber(formik.values.cardNumber)}
              onChange={handleCardNumberChange}
              onBlur={formik.handleBlur}
              placeholder="1234 5678 9012 3456"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.cardNumber && formik.errors.cardNumber
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiration Date */}
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formik.values.expirationDate}
                onChange={handleExpirationChange}
                onBlur={formik.handleBlur}
                placeholder="MM/YY"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.expirationDate && formik.errors.expirationDate
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {formik.touched.expirationDate && formik.errors.expirationDate && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.expirationDate}</p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formik.values.cvv}
                onChange={handleCVVChange}
                onBlur={formik.handleBlur}
                placeholder={cardType === 'amex' ? '1234' : '123'}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  formik.touched.cvv && formik.errors.cvv
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {formik.touched.cvv && formik.errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.cvv}</p>
              )}
            </div>
          </div>

          {/* ZIP Code */}
          <div className="mt-4">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Billing ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="12345"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.zipCode && formik.errors.zipCode
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Shipping Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          
          {/* Address Details */}
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="123 Main St, Apt 4B"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.details && formik.errors.details
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
            )}
          </div>

          {/* City */}
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="New York"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.city && formik.errors.city
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+1 (555) 123-4567"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.touched.phone && formik.errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isPending || !formik.isValid}
          className={`w-full p-4 rounded-lg font-semibold transition-colors ${
            isPending || !formik.isValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPending ? 'Processing...' : 'Complete Payment'}
        </button>
      </form>
    </motion.div>
  );
}

Payment.propTypes = {
  cartId: PropTypes.string,
};

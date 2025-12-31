import * as Yup from 'yup';
import {
  validateCardNumber,
  validateExpirationDate,
  validateCVV,
  validateCardholderName,
  validateZipCode,
  detectCardType
} from './paymentValidation';

export const paymentSchema = Yup.object({
  // Cardholder Name
  cardholderName: Yup.string()
    .required('Cardholder name is required')
    .test('valid-name', 'Please enter a valid full name (first and last name)', function(value) {
      return value ? validateCardholderName(value) : false;
    }),

  // Card Number
  cardNumber: Yup.string()
    .required('Card number is required')
    .test('valid-card', 'Please enter a valid card number', function(value) {
      return value ? validateCardNumber(value) : false;
    }),

  // Expiration Date
  expirationDate: Yup.string()
    .required('Expiration date is required')
    .test('valid-expiry', 'Please enter a valid expiration date (MM/YY) that is not expired', function(value) {
      return value ? validateExpirationDate(value) : false;
    }),

  // CVV
  cvv: Yup.string()
    .required('CVV is required')
    .test('valid-cvv', 'Please enter a valid CVV code', function(value) {
      const cardNumber = this.parent.cardNumber;
      const cardType = cardNumber ? detectCardType(cardNumber) : 'unknown';
      return value ? validateCVV(value, cardType) : false;
    }),

  // Billing ZIP Code
  zipCode: Yup.string()
    .required('ZIP code is required')
    .test('valid-zip', 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)', function(value) {
      return value ? validateZipCode(value) : false;
    }),

  // Shipping Address Fields
  details: Yup.string()
    .required('Address details are required')
    .min(5, 'Address must be at least 5 characters'),

  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
});

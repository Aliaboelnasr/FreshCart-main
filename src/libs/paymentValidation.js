/**
 * Validates credit card number using Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateCardNumber(cardNumber) {
  // Remove spaces and non-digits
  const cleaned = cardNumber.replace(/\s+/g, '').replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Detects card type from card number
 * @param {string} cardNumber - The card number
 * @returns {string} - Card type (visa, mastercard, amex, discover, or unknown)
 */
export function detectCardType(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '').replace(/\D/g, '');
  
  if (/^4/.test(cleaned)) {
    return 'visa';
  } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return 'mastercard';
  } else if (/^3[47]/.test(cleaned)) {
    return 'amex';
  } else if (/^6(?:011|5)/.test(cleaned)) {
    return 'discover';
  }
  
  return 'unknown';
}

/**
 * Validates expiration date
 * @param {string} expDate - Expiration date in MM/YY or MM/YYYY format
 * @returns {boolean} - True if valid and not expired, false otherwise
 */
export function validateExpirationDate(expDate) {
  // Match MM/YY or MM/YYYY format
  const match = expDate.match(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
  
  if (!match) {
    return false;
  }

  const month = parseInt(match[1], 10);
  let year = parseInt(match[2], 10);

  // Convert 2-digit year to 4-digit
  if (year < 100) {
    year += 2000;
  }

  // Create date objects for comparison (month is 0-based in JS Date)
  const expiry = new Date(year, month - 1, 1);
  const today = new Date();
  today.setDate(1); // Set to first of month for accurate comparison

  return expiry >= today;
}

/**
 * Validates CVV based on card type
 * @param {string} cvv - The CVV code
 * @param {string} cardType - The card type (amex requires 4 digits, others 3)
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateCVV(cvv, cardType = 'unknown') {
  const cleaned = cvv.replace(/\D/g, '');
  
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleaned);
  }
  
  return /^\d{3}$/.test(cleaned);
}

/**
 * Validates cardholder name
 * @param {string} name - The cardholder name
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateCardholderName(name) {
  // Must contain at least first and last name, allowing apostrophes, hyphens, and periods
  return /^[a-zA-Z\-\'\.]+(\s+[a-zA-Z\-\'\.]+)+$/.test(name.trim());
}

/**
 * Validates ZIP code (supports US format)
 * @param {string} zip - The ZIP code
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateZipCode(zip) {
  // US ZIP code: 5 digits or 5+4 digits
  return /^\d{5}(-\d{4})?$/.test(zip);
}

/**
 * Formats card number with spaces for display
 * @param {string} cardNumber - The card number
 * @returns {string} - Formatted card number
 */
export function formatCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '').replace(/\D/g, '');
  const cardType = detectCardType(cleaned);
  
  // American Express: 4-6-5 format
  if (cardType === 'amex') {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 10) return cleaned.slice(0, 4) + ' ' + cleaned.slice(4);
    return cleaned.slice(0, 4) + ' ' + cleaned.slice(4, 10) + ' ' + cleaned.slice(10, 15);
  }
  
  // Other cards: 4-4-4-4 format
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
}

/**
 * Formats expiration date input
 * @param {string} input - The input string
 * @returns {string} - Formatted date (MM/YY)
 */
export function formatExpirationDate(input) {
  const cleaned = input.replace(/\D/g, '');
  
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  
  return cleaned;
}

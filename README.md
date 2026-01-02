# FreshCart E-commerce

A modern e-commerce web application built with React, Vite, and TailwindCSS.

## Features

- **Product Browsing**: Browse products by categories and brands
- **Shopping Cart**: Add products to cart, update quantities, and checkout
- **Wishlist System**: Save favorite products for later purchase
- **Order History**: View all your past orders with detailed information
- **User Authentication**: Secure login and registration
- **Responsive Design**: Mobile-friendly interface using TailwindCSS
- **Real-time Updates**: React Query for efficient data fetching and caching

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS, Flowbite
- **State Management**: Redux Toolkit, Context API
- **Data Fetching**: React Query (TanStack Query), Axios
- **Routing**: React Router DOM v7
- **Form Handling**: Formik with Yup validation
- **UI Components**: React Slick, React Hot Toast, React Loader Spinner

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aliaboelnasr/FreshCart-main.git
cd FreshCart-main
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Then edit `.env` and set `VITE_LIVE_DEMO_URL` to your deployed application URL (e.g., Vercel or GitHub Pages URL). For local development, you can keep the default `http://localhost:5173`.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment

When deploying to production (Vercel, Netlify, GitHub Pages, etc.):

1. Set the `VITE_LIVE_DEMO_URL` environment variable to your deployed application URL
2. The payment system will use this URL for post-payment redirects
3. After successful payment, users will be redirected to the `/allorders` page

**Example Environment Variables:**
- Vercel: `VITE_LIVE_DEMO_URL=https://your-app.vercel.app`
- GitHub Pages: `VITE_LIVE_DEMO_URL=https://username.github.io/FreshCart-main`
- Netlify: `VITE_LIVE_DEMO_URL=https://your-app.netlify.app`

## Project Structure

```
FreshCart-main/
├── src/
│   ├── Apis/              # API configuration
│   │   ├── payment.js
│   │   └── orders.js      # Orders API functions
│   ├── components/        # React components
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── AllOrders.jsx  # Orders history component
│   │   ├── ProductItem.jsx
│   │   ├── ProductDetails.jsx
│   │   └── ...
│   ├── context/           # Context providers
│   │   ├── UserToken.jsx
│   │   ├── Countercontext.jsx
│   │   └── WishlistContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useMutationcart.jsx
│   │   ├── useMutationWishlist.jsx
│   │   ├── useQueryCart.jsx
│   │   ├── useQueryWishlist.jsx
│   │   └── useQueryOrders.jsx  # Orders query hook
│   ├── assets/            # Static assets
│   └── App.jsx            # Main app component
├── public/                # Public static files
└── package.json
```

## Wishlist System

### Overview

The Wishlist System allows authenticated users to save products for later viewing and purchasing.

### Features

1. **Add to Wishlist**: Add products from product listing and detail pages
2. **View Wishlist**: Dedicated page displaying all wishlist items
3. **Remove from Wishlist**: Remove products from wishlist
4. **Add to Cart**: Quick add to cart from wishlist page
5. **Wishlist Counter**: Display wishlist item count in navigation bar

## All Orders System

### Overview

The All Orders component displays a comprehensive history of all orders placed by the authenticated user. This feature provides users with easy access to their purchase history and order tracking.

### Features

1. **Order List**: View all orders with key information displayed in card format
2. **Order Details**: Each order card shows:
   - Order ID and creation date
   - Payment status (Paid/Pending Payment)
   - Delivery status (Delivered/In Transit)
   - Payment method type
   - Total number of items
   - Total order amount
   - Shipping address details
3. **Pagination**: Orders are paginated (5 orders per page) for better performance and user experience
4. **Loading State**: Displays loading spinner while fetching orders
5. **Error Handling**: Shows user-friendly error messages if the API request fails
6. **Empty State**: Provides helpful messaging and navigation options when no orders exist
7. **Responsive Design**: Fully responsive layout that works on all device sizes

### API Endpoint

The component uses the following API endpoint:

```
GET https://ecommerce.routemisr.com/api/v1/orders/user/{userId}
Headers: { token: "user-token" }
```

### Usage

#### Accessing Your Orders

1. Complete a purchase through the payment flow
2. After successful payment, you'll be redirected to the All Orders page
3. Alternatively, navigate to `/allorders` if you're logged in
4. View your complete order history with all details

### Components

#### AllOrders.jsx
Main orders page component that:
- Fetches and displays all user orders
- Handles loading, error, and empty states
- Implements pagination for large order lists
- Shows detailed order information in an organized card layout

#### useQueryOrders.jsx
Custom React Query hook that:
- Decodes JWT token to extract user ID
- Fetches orders from the API
- Manages caching and refetching strategies
- Returns loading, error, and data states

#### orders.js (API)
API module that provides the `getUserOrders` function to fetch orders from the backend.

### Implementation Details

- **Authentication**: Uses JWT token from UserTokenContext
- **User ID Extraction**: Decodes JWT token using jwt-decode library to get user ID
- **Data Fetching**: Uses TanStack Query (React Query) for efficient data fetching and caching
- **Pagination**: Client-side pagination with configurable items per page
- **Date Formatting**: Displays dates in user-friendly format (e.g., "January 1, 2026, 10:30 PM")

### Technical Stack

- **React Query**: For data fetching and caching
- **jwt-decode**: For extracting user ID from JWT token
- **Axios**: For HTTP requests
- **Framer Motion**: For smooth animations
- **TailwindCSS**: For responsive styling

### API Endpoints

The application uses the following wishlist API endpoints:

#### Get Wishlist
```
GET https://ecommerce.routemisr.com/api/v1/wishlist
Headers: { token: "user-token" }
```

#### Add to Wishlist
```
POST https://ecommerce.routemisr.com/api/v1/wishlist
Headers: { token: "user-token" }
Body: { productId: "product-id" }
```

#### Remove from Wishlist
```
DELETE https://ecommerce.routemisr.com/api/v1/wishlist/{productId}
Headers: { token: "user-token" }
```

### Usage

#### Adding a Product to Wishlist

1. Navigate to the products page or product details page
2. Click the heart icon button on any product
3. Product will be added to your wishlist
4. A success toast notification will appear

#### Viewing Your Wishlist

1. Click the wishlist icon (heart) in the navigation bar
2. View all products in your wishlist
3. Wishlist counter shows the total number of items

#### Managing Wishlist Items

- **Add to Cart**: Click "Add to Cart" button on any wishlist item
- **Remove**: Click the trash icon to remove items from wishlist
- **View Details**: Click on product image or name to view details

### Components

#### Wishlist.jsx
Main wishlist page component that displays all wishlist items in a grid layout.

#### useMutationWishlist.jsx
Custom hook for wishlist mutations (add/remove operations).

#### useQueryWishlist.jsx
Custom hook for fetching wishlist data with React Query.

#### WishlistContext.jsx
Context provider for managing wishlist count state across the application.

## Authentication

User authentication is handled via JWT tokens stored in localStorage. Protected routes require authentication to access features like cart and wishlist.

### Forgot Password System

The application includes a comprehensive password recovery system with three stages. For detailed developer documentation, see [FORGOT_PASSWORD.md](./FORGOT_PASSWORD.md).

#### Quick Start Guide

#### Stage 1: Request Reset Code
1. Navigate to the login page
2. Click the "Forgot Password?" link below the login button
3. Enter your registered email address
4. Click "Send Reset Code"
5. A verification code will be sent to your email

#### Stage 2: Verify Code
1. After requesting a reset code, you'll be redirected to the verification page
2. Enter the 6-digit verification code received in your email
3. Click "Verify Code"
4. If the code is valid, you'll proceed to the password reset page

#### Stage 3: Reset Password
1. Enter your email address (pre-filled from previous step)
2. Enter your new password (must start with an uppercase letter and be 3-6 characters)
3. Confirm your new password
4. Click "Reset Password"
5. Upon successful reset, you'll be redirected to the login page

#### Key Features

- **Email Persistence**: Your email is saved across stages for convenience
- **Resend Code**: If your code expires, you can request a new one
- **Navigation Fallbacks**: Back links allow you to navigate between stages
- **Retry Logic**: Unlimited attempts to enter verification code
- **Error Handling**: Clear, actionable error messages at each step
- **Auto-redirect**: Smooth transitions between stages on success

#### API Endpoints

The Forgot Password system uses the following API endpoints:

**Forgot Password (Request Code)**
```
POST https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords
Body: { email: "user@example.com" }
```

**Verify Reset Code**
```
POST https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode
Body: { resetCode: "123456" }
```

**Reset Password**
```
PUT https://ecommerce.routemisr.com/api/v1/auth/resetPassword
Body: { email: "user@example.com", newPassword: "NewPass123" }
```

#### Components

- **ForgotPassword.jsx**: Email submission form for password reset
- **VerifyCode.jsx**: Verification code input form
- **ResetPassword.jsx**: New password submission form

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- API provided by [Route Academy](https://ecommerce.routemisr.com)
- UI components from [Flowbite](https://flowbite.com)
- Icons from [Font Awesome](https://fontawesome.com) 

# FreshCart E-commerce

A modern e-commerce web application built with React, Vite, and TailwindCSS.

## Features

- **Product Browsing**: Browse products by categories and brands
- **Shopping Cart**: Add products to cart, update quantities, and checkout
- **Wishlist System**: Save favorite products for later purchase
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

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
FreshCart-main/
├── src/
│   ├── Apis/              # API configuration
│   ├── components/        # React components
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
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
│   │   └── useQueryWishlist.jsx
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

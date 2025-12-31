import { createContext, useState } from "react";

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <wishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </wishlistContext.Provider>
  );
}

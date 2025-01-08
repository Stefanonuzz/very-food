import { createContext, useState, ReactNode } from "react";
import { Pizza } from "../components/PizzaList";

type ShopContextType = {
  shop: Pizza[];
  addToCart: (pizza: Pizza) => void;
};

const ShopContext = createContext();

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shop, setShop] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => {
    setShop([...shop, pizza]);
    console.log(shop);
  };
  return (
    <ShopContext.Provider value={{ shop, addToCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
export default ShopContext;

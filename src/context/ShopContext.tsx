import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Pizza } from "../types/Pizza";
import { ShopElement } from "../types/Shop";

export type ShopContextType = {
  shop: ShopElement[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart?: (pizza: Pizza) => void;
  moveToOrders?: (pizza: Pizza) => void;
};

const ShopContext = createContext<ShopContextType>({
  shop: [],
  addToCart: (pizza: Pizza) => {},
  removeFromCart: (pizza: Pizza) => {},
  moveToOrders: (pizza: Pizza) => {},
});

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shop, setShop] = useState<ShopElement[]>([]);
  const [user, setUser] = useState(null);
  const [pizzaOrders, setPizzaOrders] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/carrello");
      setShop(response.data);
    } catch (error) {
      console.error("Errore nel caricamento del carrello: ", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ordini");
      setPizzaOrders(response.data);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
    }
  };

  const addToCart = async (pizza: Pizza) => {
    await axios.post("http://localhost:8000/carrello", {
      pizza: pizza,
    });

    fetchCart();
  };

  const removeFromCart = (pizzaId: number) => {
    const cartItem = shop.find((item) => item.pizza.id === pizzaId);

    if (cartItem) {
      const cartId = cartItem.id;

      setShop(shop.filter((item) => item.id !== cartId));

      axios
        .delete(`http://localhost:8000/carrello/${cartId}`)
        .then((response) => {
          console.log("Pizza rimossa dal carrello", response);
        })
        .catch((error) => {
          console.error("Errore nella rimozione dal carrello", error);
        });
    }
  };

  const moveToOrders = async () => {
    const orders = shop.map((item) => item.pizza);

    try {
      await axios.post("http://localhost:8000/ordini", { pizze: orders });

      const deletePromises = shop.map((item) =>
        axios.delete(`http://localhost:8000/carrello/${item.id}`)
      );

      await Promise.all(deletePromises);
      setShop([]);
    } catch (error) {
      console.error("Errore nel trasferire le pizze agli ordini:", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        shop,
        addToCart,
        removeFromCart,
        moveToOrders,
        user,
        setUser,
        pizzaOrders,
        setPizzaOrders,
        fetchOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
export default ShopContext;

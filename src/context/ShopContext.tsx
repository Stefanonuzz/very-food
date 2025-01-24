import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Food } from "../types/Food";
import { ShopElement } from "../types/Shop";
import { Order } from "../types/Order";
import { User } from "../types/User";

export type ShopContextType = {
  shop: ShopElement[];
  addToCart: (food: Food) => void;
  removeFromCart: (foodId: number) => void;
  moveToOrders: () => void;
  fetchOrders?: () => void;
  foodOrders: Order[];
  setFoodOrders: Dispatch<SetStateAction<Order[]>>;
  user: User[];
};

const ShopContext = createContext<ShopContextType>({
  shop: [],
  addToCart: () => {},
  removeFromCart: () => {},
  moveToOrders: () => {},
  foodOrders: [],
  fetchOrders: () => {},
  setFoodOrders: () => {},
  user: [],
});

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shop, setShop] = useState<ShopElement[]>([]);
  const [user, setUser] = useState(null);
  const [foodOrders, setFoodOrders] = useState<Order[]>([]);

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
      setFoodOrders(response.data);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
    }
  };

  const addToCart = async (food: Food) => {
    await axios.post("http://localhost:8000/carrello", {
      food: food,
    });

    fetchCart();
  };

  const removeFromCart = (foodId: number) => {
    const cartItem = shop.find((item) => item.food.id === foodId);

    if (cartItem) {
      const cartId = cartItem.id;

      setShop(shop.filter((item) => item.id !== cartId));

      axios
        .delete(`http://localhost:8000/carrello/${cartId}`)
        .then((response) => {
          console.log("Elemento rimosso dal carrello", response);
        })
        .catch((error) => {
          console.error("Errore nella rimozione dal carrello", error);
        });
    }
  };

  const moveToOrders = async () => {
    const orders = shop.map((item) => item.food);

    try {
      await axios.post("http://localhost:8000/ordini", { food: orders });

      const deletePromises = shop.map((item) =>
        axios.delete(`http://localhost:8000/carrello/${item.id}`)
      );

      await Promise.all(deletePromises);
      setShop([]);
    } catch (error) {
      console.error("Errore nel trasferire il carrello agli ordini:", error);
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
        foodOrders,
        setFoodOrders,
        fetchOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
export default ShopContext;

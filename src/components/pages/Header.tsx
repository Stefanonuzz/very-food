import { useContext } from "react";
import ShopContext from "../../context/ShopContext";
import HomePage from "./HomePage";
import PizzaList from "./PizzaList";
import Footer from "./Footer";

export default function Header() {
  const { addToCart, removeFromCart } = useContext(ShopContext);

  return (
    <>
      <HomePage />
      <PizzaList addToCart={addToCart} removeFromCart={removeFromCart} />
      <Footer />
    </>
  );
}

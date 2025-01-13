import { useContext } from "react";
import ShopContext from "../../context/ShopContext";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import PizzaList from "./PizzaList";
import Footer from "./Footer";

export default function Header() {
  const { addToCart, removeFromCart, moveToOrders } = useContext(ShopContext);

  return (
    <>
      <NavBar />
      <HomePage />
      <PizzaList addToCart={addToCart} removeFromCart={removeFromCart} />
      <Footer />
    </>
  );
}

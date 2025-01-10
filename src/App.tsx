import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { useContext } from "react";
import ShopContext from "./context/ShopContext";
import PizzaList from "./components/PizzaList";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  const { addToCart, removeFromCart, moveToOrders } = useContext(ShopContext);

  return (
    <div className="text-black">
      <NavBar />
      <HomePage />
      <PizzaList addToCart={addToCart} removeFromCart={removeFromCart} />
      <Footer />
      <CheckoutPage moveToOrders={moveToOrders} />
    </div>
  );
}

export default App;

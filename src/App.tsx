import ApiCall from "./api/ApiCall";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { useState } from "react";
import { Pizza } from "./components/PizzaList";

function App() {
  const [shop, setShop] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => {
    setShop([...shop, pizza]);
    console.log(shop);
  };

  return (
    <div className="text-black">
      <NavBar shop={shop} />
      <HomePage />
      <ApiCall onClick={addToCart} />
      <Footer />
    </div>
  );
}

export default App;

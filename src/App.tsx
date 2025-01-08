import ApiCall from "./api/ApiCall";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { useContext } from "react";
import ShopContext from "./context/ShopContext";

function App() {
  const { shop, addToCart } = useContext(ShopContext);

  return (
    <div className="text-black">
      <NavBar />
      <HomePage />
      <ApiCall onClick={addToCart} />
      <Footer />
    </div>
  );
}

export default App;

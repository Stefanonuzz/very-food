import { motion } from "framer-motion";
import { useContext } from "react";
import ShopContext from "../../context/ShopContext";
import HomePage from "./HomePage";
import FoodList from "./FoodList";
import Footer from "./Footer";

export default function Header() {
  const { addToCart, removeFromCart } = useContext(ShopContext);

  return (
    <>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <HomePage />
      </motion.div>

      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <FoodList addToCart={addToCart} removeFromCart={removeFromCart} />
      </motion.div>

      <Footer />
    </>
  );
}

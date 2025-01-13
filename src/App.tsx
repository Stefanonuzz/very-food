import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Header from "./components/pages/Header";
import CheckoutPage from "./components/pages/CheckoutPage";
import PizzaioloPage from "./components/pages/PizzaioloPage";

function App() {
  return (
    <Router>
      <div className="text-black">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/pizzaiolo-page" element={<PizzaioloPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import ApiCall from "./api/ApiCall";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <NavBar />
      <HomePage />
      <ApiCall />
      <Footer />
    </div>
  );
}

export default App;

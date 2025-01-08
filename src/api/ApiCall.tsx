// pages/ApiCall.tsx
import { useState } from "react";
import FetchPizzas from "./FetchPizzas";
import PizzaList from "../components/PizzaList";

interface ApiProps {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
}

export default function ApiCall({ onClick }) {
  const [pizzas, setPizzas] = useState<ApiProps[]>([]);

  return (
    <>
      <FetchPizzas onFetch={setPizzas} />
      <PizzaList pizzas={pizzas} onClick={onClick} />
    </>
  );
}

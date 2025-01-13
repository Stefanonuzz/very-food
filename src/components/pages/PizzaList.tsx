import { useEffect, useState } from "react";
import { Pizza } from "../../types/Pizza";
import Card from "../Card";
import axios from "axios";

export interface PizzaListProps {
  addToCart: (pizza: Pizza) => void;
}

export default function PizzaList({ addToCart }: PizzaListProps) {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const handleClick = (pizza: Pizza) => {
    addToCart(pizza);
  };

  useEffect(() => {
    axios
      .get<Pizza[]>("http://localhost:8000/pizze")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 container mx-auto mt-8">
      <h2 className="text-3xl font-bold col-span-3 flex justify-center mb-6">
        Seleziona il prodotto
      </h2>
      {pizzas.map((pizza) => (
        <Card
          key={pizza.id}
          name={pizza.name}
          image={pizza.image}
          price={pizza.price}
          ingredients={pizza.ingredients}
          onClick={() => handleClick(pizza)}
        />
      ))}
    </div>
  );
}

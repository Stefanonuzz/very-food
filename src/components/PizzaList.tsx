import { useState } from "react";
import Card from "./Card";

export interface PizzaListProps {
  pizzas: {
    id: number;
    name: string;
    price: number;
    ingredients: string[];
    image: string;
  }[];
}

export default function PizzaList({ pizzas }: PizzaListProps) {
  const [shop, setShop] = useState<PizzaListProps[]>([]);

  const addToCart = (pizza: PizzaListProps) => {
    setShop([...shop, pizza]);
    console.log(shop);
  };

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
          onClick={() => addToCart(pizza)}
        />
      ))}
    </div>
  );
}

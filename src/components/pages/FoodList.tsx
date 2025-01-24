import { useEffect, useState } from "react";
import { Food } from "../../types/Food";
import FoodCard from "../FoodCard";
import axios from "axios";

export interface FoodListProps {
  addToCart: (food: Food) => void;
}

export default function FoodList({ addToCart }: FoodListProps) {
  const [allFood, setAllFood] = useState<Food[]>([]);
  const handleClick = (food: Food) => {
    addToCart(food);
  };

  useEffect(() => {
    axios
      .get<Food[]>("http://localhost:8000/food")
      .then((response) => {
        setAllFood(response.data);
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
      {allFood.map((item) => (
        <FoodCard
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          description={item.description}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
}

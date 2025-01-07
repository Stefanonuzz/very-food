import { useState } from "react";
import { PizzaListProps } from "./PizzaList";

export default function Cart({ shop }: { shop: PizzaListProps[] }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="grid grid-cols-3 container mx-auto mt-8">
      <h2 className="text-3xl font-bold col-span-3 flex justify-center mb-6">
        Carrello
      </h2>
      {!isCartOpen ? (
        <div>Il carrello è vuoto</div>
      ) : (
        shop.map((pizza) => (
          <Card
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            onClick={openCart}
          />
        ))
      )}
    </div>
  );
}

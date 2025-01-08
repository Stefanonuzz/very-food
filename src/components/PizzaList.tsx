import Card from "./Card";

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
}

export interface PizzaListProps {
  pizzas: Pizza[];
  onClick: (pizza: Pizza) => void;
  shop: string[];
}

export default function PizzaList({ pizzas, onClick }: PizzaListProps) {
  const handleClick = (pizza: Pizza) => {
    onClick(pizza);
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
          onClick={() => handleClick(pizza)}
        />
      ))}
    </div>
  );
}

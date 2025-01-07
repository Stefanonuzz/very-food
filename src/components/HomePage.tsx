export default function HomePage() {
  return (
    <div className="h-screen grid grid-cols-2 text-5xl items-center font-bold">
      <div>
        <img
          className="w-full"
          src="photos/pizzasfondo.jpg"
          alt="pizza margherita"
        />
      </div>
      <div className="mr-10">
        <h1>
          La pizza più <span className="text-red-600">Awesome </span>
          direttamente a casa tua
        </h1>
        <p className="text-2xl mt-8 font-normal">
          Scegli tra le nostre migliori proposte contemporanee!
        </p>
      </div>
    </div>
  );
}

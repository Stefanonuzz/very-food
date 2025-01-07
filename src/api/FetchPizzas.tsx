import { useEffect } from "react";
import axios from "axios";

interface ApiProps {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
}

interface FetchPizzasProps {
  onFetch: (data: ApiProps[]) => void;
}

export default function FetchPizzas({ onFetch }: FetchPizzasProps) {
  useEffect(() => {
    axios
      .get<ApiProps[]>("http://localhost:8000/pizze")
      .then((response) => {
        onFetch(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [onFetch]);

  return null;
}

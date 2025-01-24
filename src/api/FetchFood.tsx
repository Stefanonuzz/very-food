import { useEffect } from "react";
import axios from "axios";

interface ApiProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface FetchFoodProps {
  onFetch: (data: ApiProps[]) => void;
}

export default function FetchFood({ onFetch }: FetchFoodProps) {
  useEffect(() => {
    axios
      .get<ApiProps[]>("http://localhost:8000/food")
      .then((response) => {
        onFetch(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [onFetch]);

  return null;
}

import { Food } from "./Food";

export interface Order {
  id: number;
  food: Food[];
  state: string;
}

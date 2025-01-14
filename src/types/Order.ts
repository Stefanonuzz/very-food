import { Pizza } from "./Pizza";

export interface Order {
  id: number;
  pizze: Pizza[];
  state: string;
}

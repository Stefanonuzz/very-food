interface Item {
  [key: string]: any; // Oggetto generico
}

interface CountResult {
  item: Item; // Oggetto intero
  count: number; // Numero di occorrenze
}

export function countByProperty<T extends Item>(
  arr: T[],
  param: keyof T
): CountResult[] {
  const count: Map<string, { item: T; count: number }> = new Map(); // Mappa per raggruppare per valore della proprietà

  arr.forEach((item) => {
    const value = item[param]; // Ottieni il valore della proprietà su cui raggruppare
    if (count.has(value)) {
      count.get(value)!.count += 1; // Incrementa il conteggio
    } else {
      count.set(value, { item, count: 1 }); // Aggiungi un nuovo gruppo
    }
  });

  // Converte la mappa in un array di oggetti con il conteggio
  return Array.from(count.values());
}

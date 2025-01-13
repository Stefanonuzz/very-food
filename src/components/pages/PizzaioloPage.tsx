import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";

export default function PizzaioloPage() {
  const [pizzaOrders, setPizzaOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ordini");
      setPizzaOrders(response.data);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const updatedOrders = pizzaOrders.map((order) =>
        order.id === orderId ? { ...order, state: newStatus } : order
      );
      setPizzaOrders(updatedOrders);

      await axios.patch(`http://localhost:8000/ordini/${orderId}`, {
        state: newStatus,
      });
      console.log(`Stato dell'ordine ${orderId} aggiornato a ${newStatus}`);
    } catch (error) {
      console.error("Errore nell'aggiornamento dello stato:", error);
    }
  };

  const removeFromOrders = async (orderId) => {
    try {
      setPizzaOrders(pizzaOrders.filter((order) => order.id !== orderId));

      await axios.delete(`http://localhost:8000/ordini/${orderId}`);
      console.log(`Ordine rimosso`);
    } catch (error) {
      console.error("Errore nella rimozione dell'ordine:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 12,
        textAlign: "center",
      }}
    >
      {pizzaOrders.map((order) => (
        <Box key={order.id} mb={2}>
          <Typography variant="h6" gutterBottom>
            Ordine {order.id} - Stato: {order.state || "Ordine ricevuto"}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* Grande card con le pizze */}
            <Grid item xs={8}>
              {order.pizze.map((pizza, index) => (
                <Card
                  key={`pizza-${pizza.id}-${index}`}
                  variant="outlined"
                  sx={{ mb: 1 }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <img
                          src={pizza.image}
                          alt={pizza.name}
                          style={{ width: 80, height: "auto" }}
                        />
                      </Grid>

                      <Grid item xs>
                        <Typography variant="h6">{pizza.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Prezzo: €{pizza.price}
                        </Typography>
                        <Typography variant="body2">
                          Ingredienti: {pizza.ingredients.join(", ")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Nuova card accanto alla grande card */}
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ height: "240px" }}>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Stato</InputLabel>
                    <Select
                      value={order.state || "Ordine ricevuto"}
                      label="Stato"
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                    >
                      <MenuItem value="Ordine ricevuto">
                        Ordine ricevuto
                      </MenuItem>
                      <MenuItem value="In preparazione">
                        In preparazione
                      </MenuItem>
                      <MenuItem value="Completato">Completato</MenuItem>
                    </Select>
                  </FormControl>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeFromOrders(order.id)}
                    >
                      Evadi l'ordine
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Divider />
        </Box>
      ))}
    </Box>
  );
}

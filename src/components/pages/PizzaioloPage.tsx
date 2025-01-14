import { useContext, useEffect } from "react";
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
import ShopContext from "../../context/ShopContext";

export default function PizzaioloPage() {
  const { pizzaOrders, setPizzaOrders, fetchOrders } = useContext(ShopContext);

  useEffect(() => {
    if (fetchOrders) fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
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

  const removeFromOrders = async (orderId: number) => {
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
      <Typography variant="h4" gutterBottom>
        Area Pizzaiolo
      </Typography>
      {pizzaOrders.length === 0 ? (
        <Typography variant="body1" component="div" textAlign="center">
          Non ci sono ordini
        </Typography>
      ) : (
        pizzaOrders.map((order) => (
          <Box key={order.id} mb={2}>
            <Typography
              variant="h6"
              style={{ textAlign: "start", marginBottom: "30px" }}
              gutterBottom
            >
              Ordine {order.id} - Stato: {order.state || "Ordine ricevuto"}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
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
        ))
      )}
    </Box>
  );
}

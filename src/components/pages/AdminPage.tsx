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

export default function AdminPage() {
  const { foodOrders, setFoodOrders, fetchOrders } = useContext(ShopContext);

  useEffect(() => {
    if (fetchOrders) fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const updatedOrders = foodOrders.map((order) =>
        order.id === orderId ? { ...order, state: newStatus } : order
      );
      setFoodOrders(updatedOrders);

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
      setFoodOrders(foodOrders.filter((order) => order.id !== orderId));

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
        Area Admin
      </Typography>
      {foodOrders.length === 0 ? (
        <Typography variant="body1" component="div" textAlign="center">
          Non ci sono ordini
        </Typography>
      ) : (
        foodOrders.map((order) => (
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
                {order.food.map((item, index) => (
                  <Card
                    key={`item-${item.id}-${index}`}
                    variant="outlined"
                    sx={{ mb: 1 }}
                  >
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: 80, height: "auto" }}
                          />
                        </Grid>

                        <Grid item xs>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Prezzo: €{item.price}
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
                        color="warning"
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

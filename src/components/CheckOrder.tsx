import { Box, Drawer, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";

interface CheckOrderProps {
  isDrawerOpen: boolean;
  onClose: () => void;
}

export default function CheckOrder({ isDrawerOpen, onClose }: CheckOrderProps) {
  const { pizzaOrders, fetchOrders } = useContext(ShopContext);

  useEffect(() => {
    if (fetchOrders) fetchOrders();
  }, [fetchOrders]);

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={onClose}>
      <Box p={2} width="350px" role="presentation">
        <Typography
          variant="h6"
          component="div"
          textAlign="center"
          mb={2}
          sx={{ fontWeight: "bold" }}
        >
          Ordini
        </Typography>
        {pizzaOrders.length === 0 ? (
          <Typography variant="body1" component="div" textAlign="center">
            Non ci sono ordini
          </Typography>
        ) : (
          pizzaOrders.map((order) => (
            <Box key={order.id} mb={2}>
              <Typography variant="h6" component="div">
                Ordine {order.id}
              </Typography>
              <Typography variant="body1" component="div">
                Stato: {order.state ?? "Ordine inviato"}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  );
}

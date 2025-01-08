import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
} from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Pizza } from "./PizzaList";

interface BasketProps {
  shop: Pizza[];
}

export const Basket = ({ shop }: BasketProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
      >
        <Badge badgeContent={shop.length} color="warning" showZero={false}>
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="300px" role="presentation">
          <Typography variant="h6" component="div" textAlign="center">
            Carrello
          </Typography>
          <List>
            {shop.length > 0 ? (
              shop.map((pizza, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={pizza.name}
                    secondary={`Prezzo: €${pizza.price.toFixed(2)}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" textAlign="center">
                Il carrello è vuoto
              </Typography>
            )}
          </List>
          {shop.length > 0 && (
            <Button variant="contained" color="error">
              Procedi all'ordine
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

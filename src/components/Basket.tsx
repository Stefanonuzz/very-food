import { useContext, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Grid,
  Button,
  Badge,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShopContext, { ShopContextType } from "../context/ShopContext";
import { countByProperty } from "../utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export const Basket = () => {
  const { shop, removeFromCart } = useContext<ShopContextType>(ShopContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pizzasFromShop = shop.map((item) => item.food);
  const groupedShop = countByProperty(pizzasFromShop, "id");
  const navigate = useNavigate();

  const goToCheckout = () => {
    setIsDrawerOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
      >
        <Badge badgeContent={shop.length} color="secondary" showZero={false}>
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="420px" role="presentation">
          <Typography variant="h6" component="div" textAlign="center" mb={2}>
            Carrello
          </Typography>
          <List>
            {groupedShop.length > 0 ? (
              groupedShop.map((element, index) => (
                <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <img
                        src={element.item.image}
                        alt={element.item.name}
                        style={{ width: "60px", height: "50px" }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1">
                        {element.item?.name || "Sconosciuto"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Prezzo: €{element.item?.price}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantità: {element.count}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => removeFromCart(element.item.id)}
                        sx={{ minWidth: "40px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" textAlign="center">
                Il carrello è vuoto
              </Typography>
            )}
          </List>
          {shop.length > 0 && (
            <Box mt={2}>
              <Button
                onClick={goToCheckout}
                variant="contained"
                color="warning"
                fullWidth
              >
                Procedi all'ordine
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

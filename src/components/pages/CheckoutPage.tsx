import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import ShopContext from "../../context/ShopContext";

export default function CheckoutPage() {
  const { moveToOrders } = useContext<ShopContextType>(ShopContext);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value="Stefano"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value="Nuzzone"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value="Via delle automobili, 23"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value="Lecce"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value="73100"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value="Italia"
                required
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={moveToOrders}
          >
            Ordina ora!
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

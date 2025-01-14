import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

interface CardProps {
  name: string;
  price: number;
  ingredients: string[];
  image: string;
  onClick: () => void;
}

export default function PizzaCard({
  name,
  price,
  ingredients,
  image,
  onClick,
}: CardProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
    onClick();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <MuiCard sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ borderRadius: "4px 4px 0 0" }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {ingredients.join(", ")}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
            Price: €{price.toFixed(2)}
          </Typography>
          <Box textAlign="start">
            <Button onClick={handleClick} variant="contained" color="error">
              Acquista
            </Button>
          </Box>
        </CardContent>
      </MuiCard>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="mt-12">
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Prodotto inserito nel carrello!
          </Alert>
        </div>
      </Snackbar>
    </>
  );
}

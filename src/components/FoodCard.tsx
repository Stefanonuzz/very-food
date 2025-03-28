import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import Banner from "./SnackBar";

interface CardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onClick: () => void;
}

export default function AdminCard({
  name,
  price,
  description,
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
      <MuiCard sx={{ maxWidth: 350, m: 2, boxShadow: 3 }}>
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
            {description}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
            Price: €{price.toFixed(2)}
          </Typography>
          <Box textAlign="start">
            <Button onClick={handleClick} variant="contained" color="warning">
              Acquista
            </Button>
          </Box>
        </CardContent>
        <Banner
          open={openSnackbar}
          severity="success"
          message="Prodotto inserito nel carrello!"
          onClose={handleCloseSnackbar}
        />
      </MuiCard>
    </>
  );
}

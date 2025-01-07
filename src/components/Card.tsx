import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface CardProps {
  name: string;
  price: number;
  ingredients: string[];
  image: string;
}

function Card({ name, price, ingredients, image, onClick }: CardProps) {
  return (
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
          <Button onClick={onClick} variant="contained" color="error">
            Acquista
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
}

export default Card;

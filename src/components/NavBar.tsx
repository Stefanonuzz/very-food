import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { colors } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: colors.red[800] }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Pizza
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Prodotti</Button>
          <Button color="inherit">Area Pizzaiolo</Button>
          <Button color="inherit">
            <AddShoppingCartIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { colors } from "@mui/material";
import { Basket } from "./Basket";

export default function NavBar({ shop }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: colors.red[900] }} position="fixed">
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
          <div className="ml-4">
            <Basket shop={shop} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  colors,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/ShopContext";
import { Basket } from "../Basket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  const { shop, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: colors.red[900] }} position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome Pizza
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Prodotti</Button>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                {user.name}
              </Typography>
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          ) : (
            <Button onClick={goToLogin} color="inherit">
              Area Utenti
            </Button>
          )}
          <div className="ml-4">
            <Basket shop={shop} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

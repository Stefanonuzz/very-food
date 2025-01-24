import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  colors,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/ShopContext";
import { Basket } from "../Basket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckOrder from "../CheckOrder";

export default function NavBar() {
  const { shop, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: colors.yellow[900] }} position="fixed">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              flexGrow: 1,
            }}
            onClick={goToHome}
          >
            <img
              src="photos/mini-logo-vf.png"
              alt="Logo"
              style={{
                width: 90,
                height: 40,
              }}
            />
          </Box>
          <Button onClick={goToHome} color="inherit">
            Home
          </Button>
          <Button color="inherit" onClick={handleDrawerOpen}>
            Area Utente
          </Button>
          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                {user.name}
              </Typography>
              <IconButton color="inherit" onClick={handleDrawerOpen}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          ) : (
            <Button onClick={goToLogin} color="inherit">
              Area ordini
            </Button>
          )}
          <div className="ml-4">
            <Basket shop={shop} />
          </div>
        </Toolbar>
      </AppBar>
      <CheckOrder isDrawerOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
}

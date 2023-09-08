import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../../../router/navigation";
import { logout } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";

const drawerWidth = 200;

function Navbar(props) {
  const { user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (page) => {
    setMobileOpen(false);
    navigate(page); // Navega a la página seleccionada
  };

  const handleLogout = () => {
    logout(); // Función logout para cerrar sesión
    navigate("/login"); // Navegar a la página de inicio de sesión
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map(({ id, path, title, Icon }) => (
          <ListItem disablePadding key={id}>
            <ListItemButton onClick={() => handlePageChange(path)}>
              <ListItemIcon>
                <Icon sx={{ color: "whitesmoke" }} />
              </ListItemIcon>
              <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
            </ListItemButton>
          </ListItem>
        ))}
        {user.rol === rolAdmin && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => handlePageChange("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "whitesmoke" }} />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ color: "whitesmoke" }} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary={"Cerrar sesión"} sx={{ color: "whitesmoke" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar sx={{ gap: "20px", display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ color: "whitesmoke" }}>
            Bazar y decoración
          </Link>
          <IconButton
            color="secondary.primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon color="secondary.primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor={"right"}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          width: "100%",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;

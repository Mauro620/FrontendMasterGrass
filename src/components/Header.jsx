import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchFilter from './FilterBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ElegantHeader({ onFiltersChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { authToken, logout } = useContext(AuthContext); // Asegúrate de que `user` contenga el nombre del usuario.
  const [perfil, setPerfil] = useState(null);
  const [loadingPerfil, setLoadingPerfil] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login");
      return;
    }

    fetch('http://localhost:8070/usuario/perfil', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setPerfil(data[0]);
      setLoadingPerfil(false);
    })
    .catch((error) => {
      console.error('Error al obtener el perfil del usuario:', error);
      setLoadingPerfil(false);
    });
  }, [navigate]);



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    if (authToken) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #15B392, #D2FF72)', pl: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          MasterGrass
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/')} size="large">
            Inicio
          </Button>
          <Button color="inherit" onClick={() => navigate('/add_terreno')} size="large">
            Publicar Terreno
          </Button>
        </Box>

        {authToken ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 1 }}>{perfil?.nombreUsuario}</Typography> {/* Muestra el nombre del usuario */}
            <IconButton onClick={handleProfileMenuOpen} color="inherit" size="large">
              <AccountCircle />
            </IconButton>
          </Box>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar Sesión
            </Button>
            <Button color="inherit" onClick={() => navigate('/login#')}>
              Registrarse
            </Button>
          </>
        )}

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
          {authToken ? (
            <>
              <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
              <MenuItem onClick={() => navigate('/add_ganado')}>Agregar Ganado</MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </>
          ) : null}
        </Menu>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <SearchFilter onSearch={(filters) => onFiltersChange(filters)} />

      {/* Menú Móvil */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => navigate('/add_terreno')}>
              <ListItemText primary="Publicar Terreno" />
            </ListItem>
          </List>
          <Divider />
          {authToken ? (
            <List>
              <ListItem button onClick={handleProfileClick}>
                <AccountCircle sx={{ marginRight: 1 }} />
                <ListItemText primary="Perfil" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button onClick={() => navigate('/login')}>
                <ListItemText primary="Iniciar Sesión" />
              </ListItem>
              <ListItem button onClick={() => navigate('/login')}>
                <ListItemText primary="Registrarse" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}

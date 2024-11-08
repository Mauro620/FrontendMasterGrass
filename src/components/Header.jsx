import React, { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography, Button, Box, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
// import { Link } from "react-router-dom";

const StyledButton = styled(Button)({
  backgroundColor: '#4f46e5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#4338ca',
  },
});

export default function ElegantHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

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

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #4f46e5, #5b21b6)', pl: 2 }}>
      <Toolbar sx={{ width: '100%' }}>
        
        {/* Logo y Nombre - Completamente a la Izquierda */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          AlquilaTerrenos
        </Typography>

        {/* Contenedor de Navegación y Usuario - Centrados */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', flexGrow: 1 }}>
          
          {/* Filtro */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <StyledButton
              variant="contained"
              startIcon={<FilterAltIcon />}
              onClick={handleOpenMenu}
            >
              Filtros
            </StyledButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>Ubicación</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Rango de Precio</MenuItem>
            </Menu>
          </Box>

          {/* Navegación */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit">Inicio</Button>
            <Button color="inherit">Terrenos</Button>
            <Button color="inherit">Contacto</Button>
            <Button color="inherit">Publicar Terreno</Button>
          </Box>
          
          {/* Menú de Usuario */}
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            sx={{ mt: '40px' }}
          >
            <MenuItem onClick={handleProfileMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>

        {/* Menú Móvil */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer para Menú Móvil */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Terrenos" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Contacto" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Publicar Terreno" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleProfileMenuOpen}>
              <AccountCircle sx={{ marginRight: 1 }} />
              <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button onClick={handleProfileMenuClose}>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
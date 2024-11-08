// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación

const Login = () => {
  const { login } = useContext(AuthContext); // Obtén la función login del contexto
  const navigate = useNavigate(); // Hook para redirigir al Home después del login
  const [formData, setFormData] = useState({
    email: '',
    contrasena: '' // Cambiar de password a contrasena
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simula el proceso de login
      const response = await fetch('http://127.0.0.1:8070/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          contrasena: formData.contrasena 
        })
      });

      const data = await response.json();
      if (response.ok && data.access_token) { 
        login(data.access_token); 
        navigate('/'); 
      } else {
        console.error('Error al iniciar sesión:', data.detail);
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Container maxWidth="xs" className="mt-10">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: 1, boxShadow: 3 }} className="bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="mb-4">Inicio de sesión</Typography>
        <form onSubmit={handleSubmit} className="w-full">
          <TextField label="Correo electrónico" name="email" type="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
          <TextField label="Contraseña" name="contrasena" type="password" fullWidth margin="normal" value={formData.contrasena} onChange={handleChange} /> {/* Corregir aquí */}
          <Box className="mt-4 flex justify-between">
            <Button variant="contained" type="submit" color="primary" fullWidth>Ingresar</Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

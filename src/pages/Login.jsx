import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Importa el contexto
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegación


const Login = () => {
  const { login } = useContext(AuthContext); // Obtén la función login del contexto
  const navigate = useNavigate(); // Hook para redirigir al Home después del login

  const [formData, setFormData] = useState({
    email: '',
    contrasena: '',
    nombreUsuario: '',
    telefono: ''
  });

  const [isRegistering, setIsRegistering] = useState(false); // Controla si está en modo registro o login

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Registro de usuario
      try {
        const response = await fetch('http://127.0.0.1:8070/usuario/ingresar_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            IdUsuario: formData.IdUsuario,
            nombreUsuario: formData.nombreUsuario,
            email: formData.email,
            contrasena: formData.contrasena,
            telefono: formData.telefono,
            ganado: [], // Inicialmente vacío
            terreno: [], // Inicialmente vacío
            historialAlquileres: [] // Inicialmente vacío
          })
        });

        if (response.ok) {
          alert('Usuario registrado exitosamente');
          setIsRegistering(false); // Cambiar al formulario de login después de registrar
        } else {
          const data = await response.json();
          console.error('Error al registrar usuario:', data.detail);
          alert('Hubo un error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    } else {
      // Inicio de sesión
      try {
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
          login(data.access_token); // Guarda el token en el contexto
          navigate('/'); // Redirige al Home
        } else {
          console.error('Error al iniciar sesión:', data.detail);
          alert('Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <Container maxWidth="xs" className="mt-6 justify-center">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: 1, boxShadow: 3 }} className="bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="mb-4">{isRegistering ? 'Registro' : 'Inicio de sesión'}</Typography>
        <form onSubmit={handleSubmit} className="w-full">
          {isRegistering && (
            <>
            <TextField
                label="Numero de documento"
                className="field input"
                name="IdUsuario"
                fullWidth
                margin="normal"
                value={formData.IdUsuario}
                onChange={handleChange}
              />
              <TextField
                label="Nombre de usuario"
                className="field input"
                name="nombreUsuario"
                fullWidth
                margin="normal"
                value={formData.nombreUsuario}
                onChange={handleChange}
              />
              <TextField
                label="Teléfono"
                className="field input"
                name="telefono"
                fullWidth
                margin="normal"
                value={formData.telefono}
                onChange={handleChange}
              />
            </>
          )}
          <TextField
            label="Correo electrónico"
            className="field input"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            className="field input-field"
            name="contrasena"
            type="password"
            fullWidth
            margin="normal"
            value={formData.contrasena}
            onChange={handleChange}
          />
          <Box className="mt-4 flex justify-between">
            <Button variant="contained" type="submit" color="primary" fullWidth>
              {isRegistering ? 'Registrarse' : 'Ingresar'}
            </Button>
          </Box>
        </form>
        <Box className="mt-4">
          <Typography variant="body2">
            {isRegistering ? (
              <>
                ¿Ya tienes una cuenta?{' '}
                <Link href="#" onClick={() => setIsRegistering(false)}>
                  Iniciar sesión
                </Link>
              </>
            ) : (
              <>
                ¿No tienes cuenta?{' '}
                <Link href="#" onClick={() => setIsRegistering(true)}>
                  Registrarme
                </Link>
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

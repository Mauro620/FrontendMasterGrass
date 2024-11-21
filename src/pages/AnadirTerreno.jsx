import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const AñadirTerreno = () => {
    const [perfil, setPerfil] = useState(null);
    const [loadingPerfil, setLoadingPerfil] = useState(true);
    const [terreno, setTerreno] = useState({
        idTerreno: "",
        ubicacion: {
            pais: "",
            departamento: "",
            ciudad: "",
            direccion: ""
        },
        tamano: "",
        tipoPasto: "",
        precio: "",
        historialAlquileres: [],
        imagenes: []
    });
    const [loading, setLoading] = useState(false); // Estado de carga para la solicitud
    const navigate = useNavigate(); // Hook para la navegación

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
    }, [navigate] );

    const handleChangeTerreno = (e) => {
        const { name, value } = e.target;

        if (name.includes("ubicacion")) {
            const field = name.split(".")[1];
            setTerreno((prevTerreno) => ({
                ...prevTerreno,
                ubicacion: {
                    ...prevTerreno.ubicacion,
                    [field]: value
                }
            }));
        } else {
            setTerreno({
                ...terreno,
                [name]: value
            });
        }
    };

    const handleAnadirTerreno = () => {
        if (!perfil) {
            alert("No se pudo obtener el perfil del usuario.");
            return;
        }

        const authToken = localStorage.getItem("authToken");

        const nuevoTerreno = {
            ...terreno,
            emailUsuario: perfil.email
        };

        setLoading(true); // Activar el estado de carga

        fetch('http://localhost:8070/terreno/ingresar_terreno', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoTerreno)
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false); // Desactivar el estado de carga
            Swal.fire({
                icon: 'success',
                title: 'Terreno añadido exitosamente',
                text: 'El terreno se ha añadido correctamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Redirigir a la página de carga de imágenes, pasando el idTerreno
                navigate(`/terreno/imagenes/${terreno.idTerreno}`);
            });
        })
        .catch(error => {
            setLoading(false); // Desactivar el estado de carga
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al añadir el terreno.',
                confirmButtonText: 'Aceptar'
            });
        });
    };

    return (
        <div className="flex justify-center items-center h-screen p-4">
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    maxWidth: '500px',
                    width: '100%',
                    backgroundColor: 'white',
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h5" component="div" gutterBottom align="center">
                    Añadir Terreno
                </Typography>

                {loadingPerfil ? (
                    <div className="flex justify-center">
                        <CircularProgress />
                    </div>
                ) : perfil ? (
                    <>
                        <Typography variant="body1" gutterBottom>
                            Usuario: {perfil.email}
                        </Typography>

                        <TextField
                            required
                            className="input"
                            label="ID del Terreno"
                            name="idTerreno"
                            value={terreno.idTerreno}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="País"
                            name="ubicacion.pais"
                            value={terreno.ubicacion.pais}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Departamento"
                            name="ubicacion.departamento"
                            value={terreno.ubicacion.departamento}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Ciudad"
                            name="ubicacion.ciudad"
                            value={terreno.ubicacion.ciudad}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Dirección"
                            name="ubicacion.direccion"
                            value={terreno.ubicacion.direccion}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Tamaño"
                            name="tamano"
                            value={terreno.tamano}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Tipo de Pasto"
                            name="tipoPasto"
                            value={terreno.tipoPasto}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />
                        <TextField
                            required
                            className="input"
                            label="Precio"
                            name="precio"
                            value={terreno.precio}
                            onChange={handleChangeTerreno}
                            fullWidth
                        />

                        <div className="flex justify-between mt-4">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAnadirTerreno}
                                disabled={loading}
                                fullWidth
                                sx={{ marginRight: '8px' }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Añadir Terreno'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate("/")}
                                fullWidth
                                sx={{ marginLeft: '8px' }}
                            >
                                Volver
                            </Button>
                        </div>
                    </>
                ) : (
                    <Typography variant="body1" color="error" align="center">
                        Error al cargar el perfil del usuario.
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default AñadirTerreno;

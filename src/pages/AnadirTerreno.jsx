import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Swal from 'sweetalert2'; // Importar SweetAlert2

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

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            alert("Por favor, inicia sesión primero.");
            setLoadingPerfil(false);
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
    }, []);

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

    const handleAñadirTerreno = () => {
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
        <div className="flex justify-center items-center h-screen">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
                className="shadow-lg p-10 bg-white rounded-lg"
                noValidate
                autoComplete="off"
            >
                <Typography variant="h5" component="div" gutterBottom>
                    Añadir Terreno
                </Typography>

                {loadingPerfil ? (
                    <CircularProgress />
                ) : perfil ? (
                    <>
                        <Typography variant="body1" gutterBottom>
                            Usuario: {perfil.email}
                        </Typography>

                        <TextField
                            required
                            label="ID del Terreno"
                            name="idTerreno"
                            value={terreno.idTerreno}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="País"
                            name="ubicacion.pais"
                            value={terreno.ubicacion.pais}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Departamento"
                            name="ubicacion.departamento"
                            value={terreno.ubicacion.departamento}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Ciudad"
                            name="ubicacion.ciudad"
                            value={terreno.ubicacion.ciudad}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Dirección"
                            name="ubicacion.direccion"
                            value={terreno.ubicacion.direccion}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Tamaño"
                            name="tamano"
                            value={terreno.tamano}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Tipo de Pasto"
                            name="tipoPasto"
                            value={terreno.tipoPasto}
                            onChange={handleChangeTerreno}
                        />
                        <TextField
                            required
                            label="Precio"
                            name="precio"
                            value={terreno.precio}
                            onChange={handleChangeTerreno}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className="mt-4"
                            onClick={handleAñadirTerreno}
                            disabled={loading} // Deshabilitar botón mientras se procesa la solicitud
                        >
                            {loading ? <CircularProgress size={24} /> : 'Añadir Terreno'}
                        </Button>
                    </>
                ) : (
                    <Typography variant="body1" color="error">
                        Error al cargar el perfil del usuario.
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default AñadirTerreno;

import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";  // Importar el hook de navegación de React Router

const CrearTerreno = () => {
    const navigate = useNavigate(); // Hook para navegación
    const [formData, setFormData] = useState({
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
        imagenes: []
    });

    // Verificación del authToken al cargar la página
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Please log in first");
            navigate("/login");  // Redirigir a la página de inicio de sesión
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Please log in first");
            return;
        }

        const response = await fetch('http://localhost:8070/terreno/ingresar_terreno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` 
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log("Terreno ingresado correctamente");
        } else {
            console.log("Error al ingresar terreno");
        }
    };

    return (
        <Container maxWidth="sm" className="mt-8">
            <Box className="bg-white p-8 rounded-lg shadow-lg">
                <Typography variant="h5" className="text-center mb-6">
                    Ingresar Terreno
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="ID Terreno"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="idTerreno"
                        value={formData.idTerreno}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Pais"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="ubicacion.pais"
                        value={formData.ubicacion.pais}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Departamento"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="ubicacion.departamento"
                        value={formData.ubicacion.departamento}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Ciudad"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="ubicacion.ciudad"
                        value={formData.ubicacion.ciudad}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Dirección"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="ubicacion.direccion"
                        value={formData.ubicacion.direccion}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Tamaño"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tamano"
                        value={formData.tamano}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Tipo de Pasto"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tipoPasto"
                        value={formData.tipoPasto}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Precio"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        className="mt-6"
                    >
                        Ingresar Terreno
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CrearTerreno;

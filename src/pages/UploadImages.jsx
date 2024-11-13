import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CargarImagenes = () => {
    const { idTerreno } = useParams(); // Obtener el idTerreno de la URL
    const [imagenes, setImagenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const authToken = localStorage.getItem("authToken");

                const formData = new FormData();
                formData.append("file", file);

                setLoading(true); // Activar el estado de carga

                const response = await fetch(`http://localhost:8070/imagenes/upload/${idTerreno}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    setImagenes((prevImagenes) => [...prevImagenes, data.file_url]);
                    Swal.fire({
                        icon: "success",
                        title: "Imagen subida exitosamente",
                        text: "La imagen ha sido cargada y asociada al terreno.",
                        confirmButtonText: "Aceptar",
                    });
                } else {
                    throw new Error(data.detail || "Error al subir la imagen");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message,
                    confirmButtonText: "Aceptar",
                });
            } finally {
                setLoading(false); // Desactivar el estado de carga
            }
        }
    };

    const handleFinalizar = () => {
        Swal.fire({
            icon: "success",
            title: "Proceso completado",
            text: "Las imágenes se han cargado correctamente.",
            confirmButtonText: "Finalizar",
        }).then(() => {
            navigate("/"); // Redirigir a la página principal
        });
    };

    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="shadow-lg p-10 bg-white rounded-lg max-w-5xl w-full">
                <Typography variant="h5" gutterBottom align="center">
                    Cargar Imágenes
                </Typography>

                {/* Campo de carga de imágenes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    <div className="col-span-1 md:col-span-3">
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            disabled={loading}
                            className="block w-full text-lg border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                        {loading && (
                            <div className="flex justify-center mt-4">
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                </div>

                {/* Imágenes cargadas */}
                {imagenes.length > 0 && (
                    <div className="my-6">
                        <Typography variant="body1" align="center" gutterBottom>
                            Imágenes cargadas:
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {imagenes.map((img, index) => (
                                <div key={index} className="w-full h-64 overflow-hidden rounded-lg">
                                    <img
                                        src={img}
                                        alt={`Imagen ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botón Finalizar */}
                <div className="flex justify-center mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFinalizar}
                        disabled={loading}
                        size="large"
                    >
                        Finalizar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CargarImagenes;

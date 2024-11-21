import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { FavoriteBorder, Share } from '@mui/icons-material';


export default function ImgCard({terreno}) {
  const [selectedTerreno, setSelectedTerreno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8070/terreno/consultar_terreno_id?id=${terreno.idTerreno}`);
      const data = await response.json();
      setSelectedTerreno(data[0]);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTerreno(null);
  };

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

return (
  <>
    <Card sx={{ width: 345, marginBottom: 2 }}>
      <CardActionArea onClick={handleOpenModal}>
        <CardMedia
          component="img"
          alt="Terreno"
          sx={{ height: 200, width: 345, objectFit: "cover" }}
          image={
            terreno?.imagenesTerreno?.length > 0
              ? terreno.imagenesTerreno[0]
              : "https://via.placeholder.com/140"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Terreno en ${terreno?.ubicacion?.ciudad || 'Ciudad desconocida'}, ${
              terreno?.ubicacion?.departamento || 'Estado desconocido'
            }`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Tamaño: ${terreno?.tamano || 'N/A'} hectáreas`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Tipo de pasto: ${terreno?.tipoPasto || 'N/A'}`}
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            {`Precio: $${terreno?.precio || 'N/A'} Mensual`}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Modal para mostrar los detalles del terreno */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Detalles del Terreno</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : selectedTerreno ? (
            <Box sx={{ p: 3, maxWidth: 900, margin: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{`Terreno en ${selectedTerreno?.ubicacion?.ciudad}`}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </Box>
              </Box>

              {/* Imagen y galería */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
                <img
                  src={
                    selectedTerreno?.imagenesTerreno?.[0] || "https://via.placeholder.com/400x300"
                  }
                  alt="Principal"
                  style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedTerreno?.imagenesTerreno?.slice(1)?.length ? (
                    selectedTerreno.imagenesTerreno.slice(1).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8 }}
                      />
                    ))
                  ) : (
                    <Typography>No hay imágenes adicionales.</Typography>
                  )}
                </Box>
              </Box>

              {/* Detalles */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">{`Tamaño: ${selectedTerreno?.tamano} hectáreas`}</Typography>
                <Typography variant="body1">{`Tipo de pasto: ${selectedTerreno?.tipoPasto}`}</Typography>
                <Typography variant="h6" color="primary">{`Precio: $${selectedTerreno?.precio?.toLocaleString()} Mensual`}</Typography>
              </Box>

              {/* Botones de acción */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" color="primary">
                  Reservar
                </Button>
                <Button variant="outlined" color="primary">
                  Contactar al propietario
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>Cargando detalles...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  </>
);

}

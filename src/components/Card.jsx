import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import { scopedCssBaselineClasses } from '@mui/material';

const API_URL = "http://127.0.0.1:8070";

// Función para obtener los datos desde el endpoint "terrenos"
async function fetchTerreno() {
  const response = await fetch(`${API_URL}/terreno/consultar_terrenos`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

// function NestedList({ historial }) {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List
//       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
//           Historial de Alquileres
//         </ListSubheader>
//       }
//     >
//       {historial?.map((alquiler) => (
//         <div key={alquiler.idAlquiler}>
//           <ListItemButton onClick={handleClick}>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             <ListItemText primary={`Alquiler de ${alquiler.usuario?.nombreUsuario || 'N/A'}`} />
//             {open ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <StarBorder />
//                 </ListItemIcon>
//                 <ListItemText primary={`Inicio: ${alquiler.periodo?.fechaInicio || 'N/A'}`} />
//               </ListItemButton>
//               <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <StarBorder />
//                 </ListItemIcon>
//                 <ListItemText primary={`Fin: ${alquiler.periodo?.fechaFin || 'N/A'}`} />
//               </ListItemButton>
//             </List>
//           </Collapse>
//         </div>
//       ))}
//     </List>
//   );
// }

export default function ImgCard() {
  const [terrenos, setTerrenos] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetchTerreno()
      .then(data => setTerrenos(data)) // Aquí se espera un array de terrenos
      .catch(err => setError(err.message));
  }, []);



  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (!terrenos.length) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      {terrenos.map((terreno) => (
        <Card key={terreno._id} sx={{ width: 345, marginBottom: 2 }}>
          <CardMedia
            component="img"
            alt="Terreno"
            sx={{ 
              height: 200,  // Altura fija para todas las imágenes
              width: 345,   // Ancho fijo para todas las imágenes
              objectFit: "cover"  // La imagen cubrirá completamente el área, ajustándose sin distorsión
            }}
            image={terreno.imagenesTerreno && terreno.imagenesTerreno.length > 0
            ? `${terreno.imagenesTerreno[0]}`  
            : "https://via.placeholder.com/140"}  
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Terreno en ${terreno.ubicacion?.ciudad || 'Ciudad desconocida'}, ${terreno.ubicacion?.departamento || 'Estado desconocido'}`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`Tamaño: ${terreno.tamano || 'N/A'} hectáreas`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`Tipo de pasto: ${terreno.tipoPasto || 'N/A'}`}
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', font: '' }}>
              {`Precio: $${terreno.precio || 'N/A'} Mensual`}
            </Typography>
            {/* <NestedList historial={terreno.historialAlquileres || []} /> */}
          </CardContent>
          {/* <CardActions>
            <Button size="small">Compartir</Button>
            <Button size="small">Más información</Button>
          </CardActions> */}
        </Card>
      ))}
    </>
  );
}

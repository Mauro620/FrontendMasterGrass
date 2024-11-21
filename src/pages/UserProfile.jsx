import React, { useEffect, useState } from "react";
import { Button, Card, Typography, Avatar, Divider, List, ListItem, ListItemText, Modal, Box, TextField } from "@mui/material";
import { Edit, Home, Grass, Delete,  Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const UserProfile = () => {
  const [perfil, setPerfil] = useState(null);
  const [terrenos, setTerrenos] = useState([]);
  const [loadingPerfil, setLoadingPerfil] = useState(true);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [nuevoGanado, setNuevoGanado] = useState({
    especie: "",
    raza: "",
    cantidad: "",
    registrarCuidadoEspecial: [],
  });

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
      // Cargar terrenos del usuario
      if (data[0].terreno) {
       Promise.all(
        data[0].terreno.map((t) =>
        fetch(`http://localhost:8070/terreno/consultar_terreno_id?id=${t.idTerreno}`, {
          method: 'GET'
            })
            .then((res) => res.json())
            .then((terrenoData) => {
              return terrenoData[0];
            })
          )
        ).then((terrenosData) => {setTerrenos(terrenosData)});
      }
      setLoadingPerfil(false);
    })
    .catch((error) => {
      console.error('Error al obtener el perfil del usuario:', error);
      setLoadingPerfil(false);
    });
  }, [navigate]);

  if (loadingPerfil) {
    return <div class="flex items-center justify-center h-screen">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>;
  }

  if (!perfil) {
    return <div>No se pudo cargar el perfil del usuario.</div>;
  }

  const handleEditTerreno = (idTerreno) => {
    // Lógica para editar el terreno (puedes navegar a una nueva vista de edición)
    alert(`Editar terreno con ID: ${idTerreno}`);
  };

  const handleDeleteTerreno = (idTerreno) => {
    // Lógica para eliminar el terreno
    fetch(`http://localhost:8070/terreno/eliminar_terreno?id=${idTerreno}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      alert(`Terreno con ID: ${idTerreno} eliminado`);
      setTerrenos(terrenos.filter((t) => t.idTerreno !== idTerreno));
    })
    .catch((error) => {
      console.error('Error al eliminar el terreno:', error);
    });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoGanado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const authToken = localStorage.getItem("authToken");
    fetch(`http://localhost:8070/usuario/anadirganadoausuario?idUsuario=${perfil.idUsuario}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoGanado),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data[0]); // Mostrar mensaje de éxito o error
        setNuevoGanado({ especie: "", raza: "", cantidad: "", registrarCuidadoEspecial: [] });
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error al añadir ganado:", error);
      });
  };

  return (
    <div>
      <Header />
      
      <div className="p-8 max-w-6xl mx-auto bg-blue-50 max-h-screen flex space-x-8 text-blue-800">
        {/* Sidebar */}
        <div className="w-1/4 space-y-4">
          <Card className="shadow-md p-4 text-center bg-blue-200">
            <Avatar sx={{ width: 100, height: 100, margin: "auto" }} src={perfil.avatar} alt={perfil.nombreUsuario} />
            <Typography variant="h5" className="mt-4 font-semibold">
              {perfil.nombreUsuario}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {perfil.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => handleEditTerreno("perfil")}
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Editar Perfil
            </Button>
          </Card>

          {/* Opciones de navegación */}
          <Card className="shadow-md bg-blue-200">
            <List component="nav" aria-label="user profile navigation">
              <ListItem>
                <Home className="mr-3 text-blue-700" />
                <ListItemText primary="Información Básica" />
              </ListItem>
              <Divider />
              <ListItem>
                <Grass className="mr-3 text-blue-700" />
                <ListItemText primary="Terrenos Propios" />
              </ListItem>
              <Divider />
              <ListItem>
                <Grass className="mr-3 text-blue-700" />
                <ListItemText primary="Ganado" />
              </ListItem>
            </List>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-3/4 space-y-6">
          {/* Información Básica */}
          <Card className="shadow-md p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold text-blue-800">
                Información Básica
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={() => handleEditTerreno("información básica")}
              >
                Editar
              </Button>
            </div>
            <Typography className="text-gray-700">Nombre: {perfil.nombreUsuario}</Typography>
            <Typography className="text-gray-700">Email: {perfil.email}</Typography>
            <Typography className="text-gray-700">Teléfono: {perfil.telefono || 'No registrado'}</Typography>
          </Card>

          {/* Terrenos del Usuario */}
          <Card className="shadow-md p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold text-blue-800">
                Terrenos Propios
              </Typography>
            </div>
            {terrenos.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th>ID Terreno</th>
                    <th>Ciudad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {terrenos.map((t) => (
                    <tr key={t.idTerreno} className="border-b">
                      <td>{t.idTerreno}</td>
                      <td>{t.ubicacion?.ciudad || 'Ciudad no disponible'}</td>
                      <td>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<Edit />}
                          onClick={() => handleEditTerreno(t.idTerreno)}
                        >
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="secondary"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteTerreno(t.idTerreno)}
                          className="ml-2"
                        >
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography className="text-gray-500">No se han registrado terrenos aún.</Typography>
            )}
          </Card>

          {/* Ganados del Usuario */}
          <Card className="shadow-md p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold text-blue-800">
                Ganados Registrados
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpenModal()}
              >
                Agregar
              </Button>
            </div>
            {perfil.ganado.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th>ID Ganado</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {perfil.ganado.map((t) => (
                    <tr key={t.idGanado} className="border-b">
                      <td>{t.idGanado}</td>
                      <td>{t.cantidad || ''}</td>
                      <td>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          startIcon={<Edit />}
                          onClick={() => handleEditTerreno(t.idTerreno)}
                        >
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="secondary"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteTerreno(t.idTerreno)}
                          className="ml-2"
                        >
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Typography className="text-gray-500">No se han registrado terrenos aún.</Typography>
            )}
          </Card>
        </div>
      </div>
      {/* Modal para añadir ganado */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2">
            Agregar Ganado
          </Typography>
          <TextField
            fullWidth
            label="IdGanado"
            name="idGanado"
            value={nuevoGanado.idGanado}
            onChange={handleInputChange}
            className="my-2"
          />
          <TextField
            fullWidth
            label="Especie"
            name="especie"
            value={nuevoGanado.especie}
            onChange={handleInputChange}
            className="my-2"
          />
          <TextField
            fullWidth
            label="Raza"
            name="raza"
            value={nuevoGanado.raza}
            onChange={handleInputChange}
            className="my-2"
          />
          <TextField
            fullWidth
            label="Cantidad"
            name="cantidad"
            value={nuevoGanado.cantidad}
            onChange={handleInputChange}
            className="my-2"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="mt-4"
          >
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
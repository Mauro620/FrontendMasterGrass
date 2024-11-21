import React, { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  backgroundColor: "#15B392",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#54C392",
  },
});

const FilterBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(2, 3),
  padding: theme.spacing(1),
  borderRadius: "50px",
  backgroundColor: "#f3f4f6",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: '#fff',
    '& fieldset': {
      border: 'none',
    },
  },
});

const API_URL = "http://127.0.0.1:8070";

export default function SearchFilter({ onSearch }) {
  const [ubicacion, setUbicacion] = useState("");
  const [ubicacionesOpciones, setUbicacionesOpciones] = useState([]);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [tamanoMin, setTamanoMin] = useState("");
  const [tamanoMax, setTamanoMax] = useState("");

  // Fetch ubicaciones
  useEffect(() => {
    async function fetchUbicaciones() {
      try {
        const response = await fetch(`${API_URL}/terreno/consultar_terrenos`);
        const data = await response.json();
        setUbicacionesOpciones(
          data.map((item) =>({ 
            label: `${item.ubicacion.ciudad}, ${item.ubicacion.departamento}`,
            id: item.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching ubicaciones:", error);
      }
    }
    fetchUbicaciones();
  }, []);

  const handleSearch = () => {
    onSearch({
      ubicacion,
      precio_min: precioMin ,
      precio_max: precioMax ,
      tamano_min: tamanoMin ,
      tamano_max: tamanoMax ,
    });
  };

  return (
    <FilterBar>
      <Autocomplete
        freeSolo
        options={ubicacionesOpciones}
        onInputChange={(event, newValue) => setUbicacion(newValue)}
        renderInput={(params) => (
          <StyledTextField {...params} placeholder="Ubicación" fullWidth />
        )}
        sx={{ flex: 2, marginRight: 2 }}
      />
      <StyledTextField
        placeholder="Precio Min"
        fullWidth
        sx={{ flex: 1, marginRight: 2 }}
        value={precioMin}
        onChange={(e) =>  setPrecioMin(e.target.value)}
      />
      <StyledTextField
        placeholder="Precio Max"
        fullWidth
        sx={{ flex: 1, marginRight: 2 }}
        value={precioMax}
        onChange={(e) => setPrecioMax(e.target.value)}
      />
      <StyledTextField
        placeholder="Tamaño Min"
        fullWidth
        sx={{ flex: 1, marginRight: 2 }}
        value={tamanoMin}
        onChange={(e) => setTamanoMin(e.target.value)}
      />
      <StyledTextField
        placeholder="Tamaño Max"
        fullWidth
        sx={{ flex: 1, marginRight: 2 }}
        value={tamanoMax}
        onChange={(e) => setTamanoMax(e.target.value)}
      />
      <StyledButton
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{ borderRadius: "50px" }}
      >
        Buscar
      </StyledButton>
    </FilterBar>
  );
}

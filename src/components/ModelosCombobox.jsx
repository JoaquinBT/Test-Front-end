import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ModelosCombobox = ({ onSelectModelo, selectedBodega, selectedMarca, selectedModelo }) => {
  const [modelos, setModelos] = useState([]);

  //logica para obtener los modelos por bodega y marca
  useEffect(() => {
    if (!selectedBodega) {
      // No hay bodega seleccionada, no realizamos la solicitud
      return;
    }
    if (!selectedMarca) {
      // No hay marca seleccionada, no realizamos la solicitud
      return;
    }
    const requestPromise = fetch(`http://127.0.0.1:8000/api/modelo/bodegaymarca/nombre/${selectedBodega}/${selectedMarca}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json();
      });

      // Establecer un tiempo de espera antes de manejar errores
      const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Tiempo de espera agotado'));
      }, 5000); // Esperar 5 segundos
      });

      // Promise.race para manejar la repuesta esperda
      Promise.race([requestPromise, timeoutPromise])
      .then(data => {
        //console.log(data);
        setModelos(data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }, [selectedMarca]);

  return (
    <FormControl sx={{m: 1, minWidth: 220 }} size="small">
      <InputLabel id="demo-simple-select-label-modelo">Seleccione un Modelo: </InputLabel>
      <Select
        labelId="demo-simple-select-label-modelo"
        id='demo-simple-select-modelo' 
        value={selectedModelo}
        label="Seleccione una Modelo:" 
        onChange={(e) => {
          const selectedValue = e.target.value;
          selectedModelo=(selectedValue); // Establecer el valor seleccionado
          onSelectModelo(selectedValue); // Llamar a la función pasada desde props
        }}>

        <MenuItem value="">Seleccione un modelo</MenuItem>
        {modelos.map((modelo) => (
          <MenuItem key={modelo.id} value={modelo.nombre_modelo}>
            {modelo.nombre_modelo}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModelosCombobox;

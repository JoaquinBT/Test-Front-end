import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MarcasCombobox = ({ onSelectMarca, selectedBodega, selectedMarca }) => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    if (!selectedBodega) {
      // No hay bodega seleccionada, no realizamos la solicitud
      //console.log("bodega no seleccionada");
      return;
    }
    //console.log("bodega seleccionada en select marca:"+selectedBodega);
    const requestPromise = fetch(`http://127.0.0.1:8000/api/marcas/bodega/${selectedBodega}`)
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
        setMarcas(data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }, [selectedBodega]);

  return (
    <FormControl sx={{m: 1, minWidth: 220 }} size="small">
      <InputLabel id="demo-simple-select-label-marca">Seleccione una Marca: </InputLabel>
      <Select
        labelId="demo-simple-select-label-marca"
        id='demo-simple-select-marca' 
        value={selectedMarca} 
        label="Seleccione una Marca:"
        onChange={(e) => {
          const selectedValue = e.target.value;
          selectedMarca=(selectedValue); // Establecer el valor seleccionado
          onSelectMarca(selectedValue); // Llamar a la función pasada desde props
        }}>

        <MenuItem value="">Seleccione una marca</MenuItem>
        {Array.isArray(marcas) && marcas.map((marca) => (
          <MenuItem key={marca.id} value={marca.nombre_marca}>
            {marca.nombre_marca}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MarcasCombobox;

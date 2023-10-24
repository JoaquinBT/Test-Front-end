import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

function BodegasCombobox({onSelectBodega}){
  
  const [bodegas, setBodegas] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState('');

  useEffect(() => {
    // Realiza una solicitud a la API de Laravel para obtener la lista de bodegas.
    const requestPromise = fetch('http://127.0.0.1:8000/api/bodegas')
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
        setBodegas(data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }, []);

  return (
    <FormControl sx={{m: 1, minWidth: 220 }} size="small">
      <InputLabel id="demo-simple-select-label-bodega">Seleccione una Bodega: </InputLabel>
      <Select 
        labelId="demo-simple-select-label-bodega"
        id='demo-simple-select-bodega' 
        value={selectedBodega} 
        label="Seleccione una Bodega:"
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedBodega(selectedValue); // Establecer el valor seleccionado
          onSelectBodega(selectedValue); // Llamar a la función pasada desde props
        }}>

        <MenuItem value="">Seleccione una bodega</MenuItem>
        {bodegas.map((bodega) => (
          <MenuItem key={bodega.id} value={bodega.nombre_bodega}>
            {bodega.nombre_bodega}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default BodegasCombobox;
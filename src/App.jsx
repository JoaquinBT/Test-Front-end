import React, { useEffect, useState } from 'react';
import BodegasCombobox from './components/BodegasCombobox';
import MarcasCombobox from './components/MarcasCombobox';
import ModelosCombobox from './components/ModelosCombobox';
import DispositivosGrilla from './components/DispositivosGrilla';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Container, Grid, Typography } from '@mui/material';
import AgregarDispositivo from './components/AgregarDispositivo';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

const App = () => {
  const [selectedBodega, setSelectedBodega] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [dispositivosGrilla, setDispositivosGrilla] = useState([]);
  const [nuevoDispositivo, setNuevoDispositivo] = useState(false);

  
  


  const handleBodegaChange = (nombre_bodega) => {
    // Lógica para manejar el cambio de bodega y limpieza de combobox marca y modelo
    setSelectedBodega(nombre_bodega);
    setSelectedMarca('');
    setSelectedModelo('');
    //console.log("que veo: "+selectedMarca);
  };

  const handleMarcaChange = (nombre_marca) => {
    // Lógica para manejar el cambio de marca y limpieza de combobox modelo
    setSelectedMarca(nombre_marca);
    setSelectedModelo('');
  };

  const handleModeloChange = (nombre_modelo) => {
    // Lógica para manejar el cambio de modelo
    setSelectedModelo(nombre_modelo);
  };

//logica botones agregar nuevo dispositivo
  const handleOpenDialog = () => {
    setNuevoDispositivo(true);
  };

  const handleCloseDialog = () => {
    setNuevoDispositivo(false);
  };

  //listamos dispositivos por nombre de bodega
  useEffect(() => {
    if(selectedBodega.trim() === '' || !selectedBodega)
    {
      setSelectedMarca('');
      return;
    }
    if (selectedBodega) {      
      // Realizar la solicitud con un tiempo de espera
      const requestPromise = fetch(`http://127.0.0.1:8000/api/dispositivo/bodega/nombre/${selectedBodega}`)
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
        setDispositivosGrilla(data);
        setSelectedMarca('');
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    }
  }, [selectedBodega]);

  
  useEffect(() => {
    if (!selectedBodega) {
      // No hay bodega seleccionada, no realizamos la solicitud
      //console.log("bodega no seleccionada");
      return;
    }
    //listamos dispositivos por nombre solo de bodega y la marca
    if (selectedMarca) {
      const requestPromise = fetch(`http://127.0.0.1:8000/api/dispositivo/bodega/marca/nombre/${selectedBodega}/${selectedMarca}`)
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
        setDispositivosGrilla(data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    }
  }, [selectedMarca]);

 
  useEffect(() => {
    if (!selectedBodega) {
      // No hay bodega seleccionada, no realizamos la solicitud
      //console.log("bodega no seleccionada");
      return;
    }
    if (!selectedMarca) {
      // No hay marca seleccionada, no realizamos la solicitud
      //console.log("marca no seleccionada");
      return;
    }   
    //listamos dispositivos por bodega,marca y modelo
    if (selectedModelo) {
      const requestPromise = fetch(`http://127.0.0.1:8000/api/dispositivo/bodega/marca/modelo/nombre/${selectedBodega}/${selectedMarca}/${selectedModelo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json(); 
      });

      const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Tiempo de espera agotado'));
      }, 5000); // Esperar 5 segundos
      });

      // Promise.race para manejar la repuesta esperada
      Promise.race([requestPromise, timeoutPromise])
      .then(data => {
        //console.log(data);
        setDispositivosGrilla(data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
    }
  }, [selectedModelo]);

  //listamos todos los dispositivos de la bd
  useEffect(() => {
    const requestPromise = fetch('http://127.0.0.1:8000/api/dispositivosConNombres')
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
    }, 5000); // Esperar 5 segundos  para verificar error
    });

    // Promise.race para manejar la repuesta esperda
    Promise.race([requestPromise, timeoutPromise])
    .then(data => {
      //console.log(data);
      setDispositivosGrilla(data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
  }, []);

  return (
    <Container position="fixed" sx={{ height: '92vh', marginTop: '8px'}}>      
      <Grid container spacing={5}>     
        <Grid item>
          <Typography variant="h9" gutterBottom>
            Filtro:
          </Typography>
        </Grid>
        <Grid item>
          <BodegasCombobox onSelectBodega={handleBodegaChange}/>
        </Grid>
        <Grid item>
          <MarcasCombobox onSelectMarca={handleMarcaChange} selectedBodega={selectedBodega} selectedMarca={selectedMarca} />
        </Grid>
        <Grid item>
          <ModelosCombobox onSelectModelo={handleModeloChange} selectedBodega={selectedBodega} selectedMarca={selectedMarca} selectedModelo={selectedModelo}/>
        </Grid>
        <Grid item>
          <Button variant="outlined" sx={{m: 1, minWidth: 220}} startIcon={<AddToQueueIcon />} onClick={handleOpenDialog}>Agregar Dispositivo</Button>
          <AgregarDispositivo open={nuevoDispositivo} onClose={handleCloseDialog} />
        </Grid>
      </Grid>
      <DispositivosGrilla dispositivos={dispositivosGrilla} />
    </Container>    
  );

};

export default App;

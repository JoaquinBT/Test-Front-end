import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useSnackbar } from "notistack";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function AgregarDispositivo(props) {
    const { open, onClose} = props;
    const [bodegas, setBodegas] = useState([]);
    const [selectedBodega, setSelectedBodega] = useState('');
    const [modelos, setModelos] = useState([]);
    const [selectedModelo, setSelectedModelo] = useState('');
    const [nombreDispositivo, setNombreDispositivo] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const [alerta, setAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('success');

    //logica para implementar las alertas
    const mensajeFuncion = (mensajeAlerta, tipoAlerta, alerta) => {
        if(!alerta){
            return;
        }
        enqueueSnackbar(mensajeAlerta, {
            variant: tipoAlerta,
            anchorOrigin: {
                vertical: "top",
                horizontal: "left",
            },
        });  
    };
  
    function guardarDispositivo(){
        // Crear un objeto con los datos del nuevo dispositivo
        const nuevoDispositivo = {
            nombre_dispositivo:nombreDispositivo,
            bodega_id: selectedBodega,
            modelo_id: selectedModelo,
        };

        //console.log("nuevo dispositivo,nombre: "+nuevoDispositivo.nombre_dispositivo);
        //console.log("nuevo dispositivo,bodega: "+nuevoDispositivo.bodega_id);
        //console.log("nuevo dispositivo,modelo: "+nuevoDispositivo.modelo_id);

        // Realizar una solicitud POST para guardar el nuevo dispositivo
        fetch('http://127.0.0.1:8000/api/post/dispositivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoDispositivo),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de red');
                }
                return response.json();
            })
            .then(data => {
            console.log('Dispositivo guardado:', data);
            setMensajeAlerta('Dispositivo agregado con éxito.');
            setTipoAlerta('success');
            mensajeFuncion('Dispositivo agregado con éxito.', 'success', 'true');

            //refrescamos la ventana para recargar la grilla con el nuevo dispositivo
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            })
            .catch(error => {
                setMensajeAlerta('Dispositivo no agregado, completé todos los campos.');
                setTipoAlerta('error');

                mensajeFuncion('Dispositivo no agregado, completé todos los campos.', 'error', 'true');
                //console.error('Error al guardar dispositivo:', error);
            });
    }

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

      useEffect(() => {
        // Realiza una solicitud a la API de Laravel para obtener la lista de modelos.   
        const requestPromise = fetch('http://127.0.0.1:8000/api/modelos')
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
      }, []);

  return (
    <Dialog open={open} onClose={onClose}  maxWidth={'lg'}>
      <DialogTitle>Agregar nuevo dispositivo:</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
            <Grid item>
                <TextField 
                    required 
                    id="filled-basic" 
                    label="Nombre dispositivo" 
                    variant="filled" 
                    sx={{m: 1, minWidth: 220 }} 
                    size="small" 
                    value={nombreDispositivo}
                    onChange={(e) => setNombreDispositivo(e.target.value)}
                />
            </Grid>
            <Grid item>
                <FormControl required sx={{m: 1, minWidth: 220 }} size="small"> 
                    <InputLabel id="demo-simple-select-label-bodega-dispositivo">Bodegas disponibles: </InputLabel>
                        <Select 
                            labelId="demo-simple-select-label-bodega-dispositivo"
                            id='demo-simple-select-bodega-dispositivo' 
                            value={selectedBodega} 
                            label="Bodegas disponibles:"
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setSelectedBodega(selectedValue); // Establecer el valor seleccionado
                                //console.log("bodega seleccionada: "+selectedValue);
                            }}>

                            <MenuItem value="">Seleccione una bodega</MenuItem>
                        {bodegas.map((bodega) => (
                            <MenuItem key={bodega.id} value={bodega.id}>
                                {bodega.nombre_bodega}
                            </MenuItem>
                        ))}
                        </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl required sx={{m: 1, minWidth: 220 }} size="small"> 
                    <InputLabel id="demo-simple-select-label-modelo-dispositivo">Modelos disponibles: </InputLabel>
                        <Select 
                            labelId="demo-simple-select-label-modelo-dispositivo"
                            id='demo-simple-select-modelo-dispositivo' 
                            value={selectedModelo} 
                            label="Modelos disponibles:"
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setSelectedModelo(selectedValue); // Establecer el valor seleccionado
                                //console.log("Modelo seleccionado: "+selectedValue);
                            }}>

                            <MenuItem value="">Seleccione un Modelo</MenuItem>
                        {modelos.map((modelo) => (
                            <MenuItem key={modelo.id} value={modelo.id}>
                                {modelo.nombre_modelo}
                            </MenuItem>
                        ))}
                        </Select>
                </FormControl>
            </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" startIcon={<CancelIcon />} >Cancelar</Button>
        <Button onClick={guardarDispositivo} color="success" startIcon={<CheckCircleIcon/>} >Guardar y agregar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AgregarDispositivo;

import React from 'react';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography} from "@mui/material"

const DispositivosGrilla = ({ dispositivos }) => {
  return (
    <TableContainer component={Paper} sx={{maxHeight:'500px', minHeight:'500px'}}>
      <Typography
          sx={{ flex: '1 1 100%', marginLeft: '20px', marginRight: '20px' }}
          variant="h6"
          id="tableTitle"
          component="div"
          
      >
        Lista de Dispositivos
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Bodega</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dispositivos.map((dispositivo) => (
            <TableRow
            key={dispositivo.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{dispositivo.id}</TableCell>
              <TableCell >{dispositivo.nombre_dispositivo}</TableCell>
              <TableCell >{dispositivo.nombre_marca}</TableCell>
              <TableCell >{dispositivo.nombre_modelo}</TableCell>
              <TableCell >{dispositivo.nombre_bodega}</TableCell>                    
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default DispositivosGrilla;

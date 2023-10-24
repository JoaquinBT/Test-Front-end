import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={4000}
    >
      <AppBar position="static" sx={{ backgroundColor: '#016488' }}>
        <Toolbar>
          <Typography gutterBottom align='center' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Test de programador inicial: Joaquín Alonso Bustos Torres
          </Typography>
          <Avatar sx={{ width: 86, height: 86 }} alt="Joaquin Bustos" src="/perfil.jpg" />
        </Toolbar>
      </AppBar>

      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

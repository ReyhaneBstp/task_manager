import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material';
import Login from './pages/login/Login';
import Signup from './pages/sign up/Signup';
import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Signup />
    </ThemeProvider>
  )
}

export default App
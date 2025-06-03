import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import EntryGate from './pages/EntryGate';
import ExitGate from './pages/ExitGate';
import Dashboard from './pages/Dashboard';
import ParkingSlots from './pages/ParkingSlots';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/entry" element={<EntryGate />} />
            <Route path="/exit" element={<ExitGate />} />
            <Route path="/slots" element={<ParkingSlots />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
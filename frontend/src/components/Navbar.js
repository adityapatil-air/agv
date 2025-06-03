import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalParkingIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Smart Parking System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DirectionsCarIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/entry"
            startIcon={<DirectionsCarIcon />}
          >
            Entry Gate
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/exit"
            startIcon={<DirectionsCarIcon />}
          >
            Exit Gate
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/slots"
            startIcon={<LocalParkingIcon />}
          >
            Parking Slots
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
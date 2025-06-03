import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import sharedState from './sharedState';

const ParkingSlots = () => {
  const [slotState, setSlotState] = useState([...sharedState.slots]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlotState([...sharedState.slots]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Parking Slots Status
      </Typography>
      <Grid container spacing={3}>
        {slotState.map((slot, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: slot ? '#ffebee' : '#e8f5e9',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {slot ? (
                  <DirectionsCarIcon sx={{ fontSize: 40, color: '#d32f2f', mr: 1 }} />
                ) : (
                  <LocalParkingIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 1 }} />
                )}
                <Typography variant="h5">Slot {i + 1}</Typography>
              </Box>
              <Chip
                label={slot ? 'Occupied' : 'Available'}
                color={slot ? 'error' : 'success'}
                sx={{ mb: 2 }}
              />
              {slot && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1">
                    Car: XXXX{slot.carNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Entry: {new Date(slot.entryTime).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ParkingSlots; 
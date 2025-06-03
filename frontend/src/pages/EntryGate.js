import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import sharedState from './sharedState';

const EntryGate = () => {
  const [carNumber, setCarNumber] = useState('');
  const [availableSlot, setAvailableSlot] = useState(null);
  const [slotState, setSlotState] = useState([...sharedState.slots]);

  const handlePark = (e) => {
    e.preventDefault();
    if (!carNumber) {
      toast.error('Please enter the last 4 digits of your car number');
      return;
    }
    // Find first available slot
    const slotIndex = sharedState.slots.findIndex((slot) => slot === null);
    if (slotIndex === -1) {
      toast.error('No slots available!');
      return;
    }
    // Record entry
    const entryTime = new Date();
    sharedState.slots[slotIndex] = {
      carNumber,
      entryTime,
    };
    setAvailableSlot(slotIndex + 1);
    toast.success(`Vehicle parked in slot ${slotIndex + 1}`);
    setCarNumber('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlotState([...sharedState.slots]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Count available slots
  const totalSlots = sharedState.slots.length;
  const occupiedSlots = sharedState.slots.filter((slot) => slot !== null).length;
  const availableSlots = totalSlots - occupiedSlots;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Entry Gate
        </Typography>
        <Typography variant="h6" align="center" color="primary" sx={{ mb: 2 }}>
          Available Slots: {availableSlots}
        </Typography>
        <Box component="form" onSubmit={handlePark}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last 4 digits of Car Number"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
                inputProps={{ maxLength: 4 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Park
              </Button>
            </Grid>
          </Grid>
        </Box>
        {availableSlot && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              Vehicle parked in slot {availableSlot}.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EntryGate; 
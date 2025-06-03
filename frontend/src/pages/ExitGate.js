import React, { useState } from 'react';
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

const ExitGate = () => {
  const [carNumber, setCarNumber] = useState('');
  const [slip, setSlip] = useState(null);
  const [showSlip, setShowSlip] = useState(false);

  const handleRetrieve = (e) => {
    e.preventDefault();
    if (!carNumber) {
      toast.error('Please enter the last 4 digits of your car number');
      return;
    }
    // Find the slot with this car number
    const slotIndex = sharedState.slots.findIndex(
      (slot) => slot && slot.carNumber === carNumber
    );
    if (slotIndex === -1) {
      toast.error('Vehicle not found in any slot!');
      return;
    }
    const entryTime = new Date(sharedState.slots[slotIndex].entryTime);
    const exitTime = new Date();
    const durationMs = exitTime - entryTime;
    const durationMin = Math.ceil(durationMs / 60000);
    // Pricing logic
    let price = 100;
    let hr = 1;
    let grace = 70; // 1hr 10min = 70min
    while (durationMin > grace) {
      hr++;
      price += 100;
      grace += 60;
    }
    setSlip({
      slot: slotIndex + 1,
      entryTime: entryTime.toLocaleString(),
      exitTime: exitTime.toLocaleString(),
      duration: durationMin,
      price,
    });
    setShowSlip(true);
    // Vacate slot
    sharedState.slots[slotIndex] = null;
    // Add to revenue
    sharedState.totalRevenue += price;
    setCarNumber('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Exit Gate
        </Typography>
        {!showSlip ? (
          <Box component="form" onSubmit={handleRetrieve}>
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
                  Retrieve Vehicle
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Parking Slip
            </Typography>
            <Typography>Slot: {slip.slot}</Typography>
            <Typography>Entry Time: {slip.entryTime}</Typography>
            <Typography>Exit Time: {slip.exitTime}</Typography>
            <Typography>Duration: {slip.duration} min</Typography>
            <Typography variant="h5" color="secondary" sx={{ mt: 2 }}>
              Amount to Pay: ₹{slip.price}
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={() => setShowSlip(false)}
            >
              Done
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ExitGate; 
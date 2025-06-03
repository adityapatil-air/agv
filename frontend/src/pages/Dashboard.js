import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import sharedState from './sharedState';

const Dashboard = () => {
  const [slotState, setSlotState] = useState([...sharedState.slots]);
  const [revenue, setRevenue] = useState(sharedState.totalRevenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlotState([...sharedState.slots]);
      setRevenue(sharedState.totalRevenue);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const totalSlots = slotState.length;
  const occupiedSlots = slotState.filter((slot) => slot !== null).length;
  const availableSlots = totalSlots - occupiedSlots;
  const totalRevenue = revenue;
  const averageParkingTime = 0;

  const StatCard = ({ title, value, icon, color }) => (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        System Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Slots"
            value={totalSlots}
            icon={<LocalParkingIcon sx={{ fontSize: 30, color: '#1976d2' }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Available Slots"
            value={availableSlots}
            icon={<DirectionsCarIcon sx={{ fontSize: 30, color: '#2e7d32' }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue}`}
            icon={<PaymentIcon sx={{ fontSize: 30, color: '#ed6c02' }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg. Parking Time"
            value={`${averageParkingTime} min`}
            icon={<AccessTimeIcon sx={{ fontSize: 30, color: '#9c27b0' }} />}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parking Capacity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                {occupiedSlots} / {totalSlots} slots occupied ({Math.round((occupiedSlots / totalSlots) * 100)}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(occupiedSlots / totalSlots) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 
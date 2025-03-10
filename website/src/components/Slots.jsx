import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

function Slots() {
  const [locations] = useState([
    { name: 'Vazhakulam', coordinates: [9.946804, 76.636203] },
    { name: 'Muvatupuzha', coordinates: [9.989502, 76.579012] },
    { name: 'Thodupuzha', coordinates: [9.895894, 76.717952] }
  ]);

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    day: '',
    timeSlot: '',
    startTime: '',
    endTime: '',
    maxCollections: 5,
    isActive: true
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timeSlots = [
    'Morning', 'Afternoon', 'Evening'
  ];

  // Predefined time ranges for simplicity
  const timeRanges = {
    'Morning': { start: '06:00', end: '12:00' },
    'Afternoon': { start: '12:00', end: '17:00' },
    'Evening': { start: '17:00', end: '22:00' }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/slots');
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setSlots(response.data);
      } else {
        console.error('API did not return an array:', response.data);
        setSlots([]);
        setError('Invalid data format received from server');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError('Failed to fetch slots');
      setSlots([]);
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
    setEditMode(false);
    setFormData({
      location: '',
      day: '',
      timeSlot: '',
      startTime: '',
      endTime: '',
      maxCollections: 5,
      isActive: true
    });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'timeSlot' && timeRanges[value]) {
      // Auto-set start and end times based on selected time slot
      setFormData({
        ...formData,
        [name]: value,
        startTime: timeRanges[value].start,
        endTime: timeRanges[value].end
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Find the selected location coordinates
    const selectedLocation = locations.find(loc => loc.name === formData.location);
    if (!selectedLocation) {
      setError('Please select a valid location');
      setLoading(false);
      return;
    }

    // Convert time strings to Date objects for backend
    const startDate = new Date();
    const [startHours, startMinutes] = formData.startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes, 0);

    const endDate = new Date();
    const [endHours, endMinutes] = formData.endTime.split(':').map(Number);
    endDate.setHours(endHours, endMinutes, 0);

    const slotData = {
      ...formData,
      coordinates: selectedLocation.coordinates,
      radius: 5, // 5km radius as specified
      startTime: startDate,
      endTime: endDate
    };

    try {
      if (editMode && currentSlotId) {
        await axios.put(`http://localhost:3001/api/slots/${currentSlotId}`, slotData);
        setSuccess('Slot updated successfully');
      } else {
        await axios.post('http://localhost:3001/api/slots', slotData);
        setSuccess('Slot created successfully');
      }
      
      fetchSlots();
      handleCloseForm();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  const handleEdit = (slot) => {
    setEditMode(true);
    setCurrentSlotId(slot._id);
    
    // Find the location name from coordinates
    const locationName = locations.find(
      loc => loc.coordinates[0] === slot.coordinates[0] && 
             loc.coordinates[1] === slot.coordinates[1]
    )?.name || '';

    // Format times for input fields
    const startTime = new Date(slot.startTime);
    const formattedStartTime = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;

    const endTime = new Date(slot.endTime);
    const formattedEndTime = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;

    setFormData({
      location: locationName,
      day: slot.day,
      timeSlot: slot.timeSlot,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      maxCollections: slot.maxCollections,
      isActive: slot.isActive
    });
    
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      setLoading(true);
      try {
        await axios.delete(`/api/slots/${id}`);
        fetchSlots();
        setSuccess('Slot deleted successfully');
        setLoading(false);
      } catch (err) {
        setError('Failed to delete slot');
        setLoading(false);
      }
    }
  };

  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  // Helper function to format time from date string
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={2} sx={{ padding: 3, marginBottom: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h5" component="h1">
            Waste Collection Slots Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleOpenForm}
          >
            Add New Slot
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          Manage collection slots within 5km radius of Vazhakulam, Muvatupuzha, and Thodupuzha
        </Typography>

        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>}

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Time Range</TableCell>
                <TableCell>Max Collections</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Array.isArray(slots) || slots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">No slots available</TableCell>
                </TableRow>
              ) : (
                slots.map((slot) => {
                  if (!slot) return null;
                  
                  // Find location name
                  const locationName = locations.find(
                    loc => loc.coordinates && slot.coordinates && 
                           loc.coordinates[0] === slot.coordinates[0] && 
                           loc.coordinates[1] === slot.coordinates[1]
                  )?.name || 'Unknown';

                  return (
                    <TableRow key={slot._id || Math.random()}>
                      <TableCell>{locationName}</TableCell>
                      <TableCell>{slot.day || 'N/A'}</TableCell>
                      <TableCell>{slot.timeSlot || 'N/A'}</TableCell>
                      <TableCell>
                        {slot.startTime ? formatTime(slot.startTime) : 'N/A'} - 
                        {slot.endTime ? formatTime(slot.endTime) : 'N/A'}
                      </TableCell>
                      <TableCell>{slot.maxCollections || 0}</TableCell>
                      <TableCell>{slot.isActive ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(slot)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(slot._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Slot Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Slot' : 'Add New Slot'}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    label="Location"
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc.name} value={loc.name}>
                        {loc.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select a location for 5km radius coverage</FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Day</InputLabel>
                  <Select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    label="Day"
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Time Slot</InputLabel>
                  <Select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    label="Time Slot"
                  >
                    {timeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Selecting a time slot will set default start/end times</FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max Collections"
                  name="maxCollections"
                  type="number"
                  value={formData.maxCollections}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }} // 5 min steps
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }} // 5 min steps
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="isActive"
                      value={formData.isActive}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : (editMode ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerts */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Slots;
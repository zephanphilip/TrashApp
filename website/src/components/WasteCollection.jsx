import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Chip, 
  CircularProgress, 
  Alert, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Snackbar,
  IconButton,
  InputBase,
  Collapse,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Refresh as RefreshIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

function WasteCollection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, orderId: null });
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/orders/pending');
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message || 'Failed to fetch pending orders');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsAccepted = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}/process`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state to remove the collected order
        setOrders(orders.filter(order => order._id !== orderId));
        setNotification({
          open: true,
          message: 'Order accepted successfully',
          type: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: data.message || 'Failed to update order',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Network error. Please try again later.',
        type: 'error'
      });
      console.error('Error updating order:', error);
    } finally {
      setConfirmDialog({ open: false, orderId: null });
    }
  };

  const handleMarkAsCollected = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${orderId}/collect`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state to remove the collected order
        setOrders(orders.filter(order => order._id !== orderId));
        setNotification({
          open: true,
          message: 'Order marked as collected successfully',
          type: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: data.message || 'Failed to update order',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Network error. Please try again later.',
        type: 'error'
      });
      console.error('Error updating order:', error);
    } finally {
      setConfirmDialog({ open: false, orderId: null });
    }
  };

  const openConfirmDialog = (orderId) => {
    setConfirmDialog({ open: true, orderId });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ open: false, orderId: null });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const toggleExpandOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => 
    order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.pickupLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Pending Waste Collection
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<RefreshIcon />} 
          onClick={fetchPendingOrders}
        >
          Refresh
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search orders by ID, user ID, or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>
        
        <Chip 
          label={`${orders.length} pending orders`} 
          color="primary" 
          variant="outlined" 
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : filteredOrders.length === 0 ? (
        <Alert severity="info">No pending waste collection orders found.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}></TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pickup Location</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pickup Slot</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        onClick={() => toggleExpandOrder(order._id)}
                      >
                        {expandedOrderId === order._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{order._id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                        {order.userId}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                        {order.pickupLocation || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TimeIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                        {order.pickupSlot || 'N/A'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MoneyIcon sx={{ mr: 1, color: 'success.main' }} fontSize="small" />
                        ${order.totalAmount.toFixed(2)}
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        size="small"
                        color={
                          order.status === 'pending' ? 'warning' :
                          order.status === 'processing' ? 'info' :
                          order.status === 'completed' ? 'success' :
                          'error'
                        }
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => openConfirmDialog(order._id)}
                        sx={{ borderRadius: 2 }}
                      >
                        Mark Collected
                      </Button>
                      {order.status !== 'processing' && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleMarkAsAccepted(order._id)}
                          sx={{ borderRadius: 2, mt: 2 }}
                        >
                          Mark Accepted
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                      <Collapse in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CartIcon sx={{ mr: 1 }} />
                              Order Items
                            </Box>
                          </Typography>
                          <Divider sx={{ mb: 2 }} />
                          <Grid container spacing={2}>
                            {order.items.map((item, index) => (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      {item.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Category: {item.category}
                                    </Typography>
                                    <Typography variant="body2">
                                      Quantity: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2">
                                      Price: ${item.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2">
                                      Item Total: ${(item.quantity * item.price).toFixed(2)}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2">
                              Coordinates: {order.coordinates?.latitude}, {order.coordinates?.longitude}
                            </Typography>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              sx={{ mt: 1 }}
                              href={`https://maps.google.com/?q=${order.coordinates?.latitude},${order.coordinates?.longitude}`}
                              target="_blank"
                            >
                              View on Map
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
      >
        <DialogTitle>Confirm Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this waste collection order as collected? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => handleMarkAsCollected(confirmDialog.orderId)} 
            color="success" 
            variant="contained"
            startIcon={<CheckCircleIcon />}
          >
            Confirm Collection
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WasteCollection;
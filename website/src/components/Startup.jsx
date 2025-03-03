import React from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Container, 
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Divider
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// Create a custom theme for admin panel
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e8e3e', // Green color for waste management theme
    },
    secondary: {
      main: '#ffa000', // Amber accent
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 16px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function Startup() {
    const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        {/* App Bar */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <DashboardIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Trash - Waste Management System
            </Typography>
            <IconButton color="inherit" aria-label="logout">

             <SignedOut>
              <SignInButton mode='modal'>
                <Button 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#FFE5E5',
                    fontFamily: 'Oswald,sans-serif',
                  }}
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button>
                <UserButton />
              </Button>
            </SignedIn>
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Container sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: 4, 
          flex: 1 
        }} maxWidth="md">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              mb: 4, 
              textAlign: 'center',
              color: 'text.primary'
            }}>
            Admin Dashboard
          </Typography>
          
          <Card sx={{ width: '100%', mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<LocationOnIcon />}
                  onClick={() => navigate('/slots')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    bgcolor: '#2196f3',
                    '&:hover': {
                      bgcolor: '#1976d2',
                    }
                  }}
                >
                  Set Location Slots
                </Button>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<RateReviewIcon />}
                  onClick={() => navigate('/reviews')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    bgcolor: '#ff9800',
                    '&:hover': {
                      bgcolor: '#f57c00',
                    }
                  }}
                >
                  View User Reviews
                </Button>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<DeleteIcon />}
                  onClick={() => navigate('/wastecollection')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    bgcolor: '#f44336',
                    '&:hover': {
                      bgcolor: '#d32f2f',
                    }
                  }}
                >
                  Pending Waste Collection
                </Button>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<SupportAgentIcon />}
                  onClick={() => navigate('/chatsupport')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    bgcolor: '#4caf50',
                    '&:hover': {
                      bgcolor: '#388e3c',
                    }
                  }}
                >
                  Customer Support
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mt: 2, textAlign: 'center' }}
          >
            © 2025 Trash A Waste Management Initiative. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Startup;


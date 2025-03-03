import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  CircularProgress, 
  Grid,
  Box,
  Rating,
  Avatar,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  ThumbUp, 
  ThumbDown, 
  Favorite, 
  SentimentSatisfied, 
  SentimentDissatisfied, 
  Analytics, 
  Close,
  AccessTime
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
  },
  position: 'relative',
  overflow: 'visible'
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  border: `4px solid ${theme.palette.background.paper}`,
  marginBottom: 8,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Helper function to get sentiment color based on rating
const getSentimentColor = (rating) => {
  if (rating >= 4) return 'success.main';
  if (rating >= 3) return 'warning.main';
  return 'error.main';
};

// Helper to generate random sentiment analysis
const generateAnalysis = (review) => {
  const sentiments = ['Positive', 'Negative', 'Neutral'];
  const keywords = ['quality', 'service', 'price', 'experience', 'recommendation', 'satisfaction'];
  const selectedKeywords = [];
  
  // Randomly select 2-4 keywords
  const numKeywords = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numKeywords; i++) {
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    if (!selectedKeywords.includes(keyword)) {
      selectedKeywords.push(keyword);
    }
  }
  
  // Generate random sentiment scores
  const sentimentScores = sentiments.map(sentiment => ({
    sentiment,
    score: Math.round(Math.random() * 100)
  })).sort((a, b) => b.score - a.score);
  
  return {
    keywords: selectedKeywords,
    sentiments: sentimentScores,
    summary: `This review primarily expresses ${sentimentScores[0].sentiment.toLowerCase()} sentiment, focusing on ${selectedKeywords.join(', ')}.`
  };
};

// Get initial of a name
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reviews?page=1&limit=10');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleAnalyze = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading reviews...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
        borderRadius: 2,
        color: 'white',
        p: 3,
        boxShadow: 3
      }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Customer Insights
        </Typography>
        <Typography variant="h6">
          Explore what our customers are saying about us
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} key={review._id}>
            <StyledCard>
              <CardContent sx={{ position: 'relative', pb: 7 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                    <UserAvatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {getInitials(review.userName)}
                    </UserAvatar>
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {review.userName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(review.timestamp)}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                      {review.rating >= 4 ? (
                        <Chip 
                          icon={<SentimentSatisfied />} 
                          label="Positive" 
                          size="small" 
                          color="success"
                          variant="outlined"
                        />
                      ) : review.rating <= 2 ? (
                        <Chip 
                          icon={<SentimentDissatisfied />} 
                          label="Negative" 
                          size="small" 
                          color="error"
                          variant="outlined"
                        />
                      ) : (
                        <Chip 
                          label="Neutral" 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="body1" paragraph sx={{ 
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  borderLeft: `4px solid ${getSentimentColor(review.rating)}`,
                  fontStyle: 'italic'
                }}>
                  "{review.review}"
                </Typography>
                
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  left: 16, 
                  right: 16,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Tooltip title="Helpful">
                      <IconButton size="small" color="primary">
                        <ThumbUp fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Not Helpful">
                      <IconButton size="small" color="error">
                        <ThumbDown fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <AnimatedButton 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Analytics />}
                    onClick={() => handleAnalyze(review._id)}
                    sx={{ 
                      borderRadius: 4,
                      boxShadow: 2,
                      px: 3
                    }}
                  >
                    {expandedReviews[review._id] ? 'Hide Analysis' : 'Analyze'}
                  </AnimatedButton>
                </Box>
              </CardContent>
              
              <Collapse in={expandedReviews[review._id]} timeout="auto" unmountOnExit>
                <Divider />
                <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.02)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      Sentiment Analysis
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleAnalyze(review._id)}
                      sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  {(() => {
                    const analysis = generateAnalysis(review);
                    return (
                      <>
                        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Summary
                          </Typography>
                          <Typography variant="body1">
                            {analysis.summary}
                          </Typography>
                        </Paper>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: 'background.paper' }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Key Topics
                              </Typography>
                              <Box>
                                {analysis.keywords.map((keyword, idx) => (
                                  <StyledChip 
                                    key={idx} 
                                    label={keyword} 
                                    color="primary" 
                                    variant="outlined"
                                    size="small"
                                  />
                                ))}
                              </Box>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: 'background.paper' }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Sentiment Breakdown
                              </Typography>
                              {analysis.sentiments.map((sentiment, idx) => (
                                <Box key={idx} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="body2" sx={{ minWidth: 70 }}>
                                    {sentiment.sentiment}:
                                  </Typography>
                                  <Box sx={{ 
                                    flexGrow: 1, 
                                    bgcolor: 'rgba(0,0,0,0.09)', 
                                    borderRadius: 5,
                                    mx: 1,
                                    height: 8,
                                    overflow: 'hidden'
                                  }}>
                                    <Box sx={{ 
                                      width: `${sentiment.score}%`, 
                                      bgcolor: sentiment.sentiment === 'Positive' ? 'success.main' : 
                                              sentiment.sentiment === 'Negative' ? 'error.main' : 'warning.main',
                                      height: '100%'
                                    }} />
                                  </Box>
                                  <Typography variant="body2" fontWeight="bold">
                                    {sentiment.score}%
                                  </Typography>
                                </Box>
                              ))}
                            </Paper>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })()}
                </Box>
              </Collapse>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Reviews;
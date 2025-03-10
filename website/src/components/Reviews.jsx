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
  SentimentSatisfied, 
  SentimentDissatisfied, 
  Analytics, 
  Close,
  AccessTime
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

// Get initial of a name
const getInitials = (name) => {
  if (!name) return "?";
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Format date
const formatDate = (date) => {
  if (!date) return "Unknown date";
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return "Invalid date";
  }
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviewId, setExpandedReviewId] = useState(null); // Track only one expanded review
  const [analysisData, setAnalysisData] = useState({});
  const [analyzingReviewIds, setAnalyzingReviewIds] = useState([]);
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

  const handleAnalyze = async (reviewId, reviewText) => {
    // If this review is already expanded, close it
    if (expandedReviewId === reviewId) {
      setExpandedReviewId(null);
      return;
    }
    
    // If we already have the analysis data, just show it
    if (analysisData[reviewId]) {
      setExpandedReviewId(reviewId);
      return;
    }
    
    // Otherwise, fetch the analysis from the API
    setAnalyzingReviewIds(prev => [...prev, reviewId]);
    
    try {
      const response = await axios.post('http://localhost:3001/api/ai/analysereview', {
        review: reviewText
      });
      
      // Parse the AI response and store it
      const aiAnalysis = response.data.sentianalysis;
      setAnalysisData(prev => ({
        ...prev,
        [reviewId]: parseAnalysisResponse(aiAnalysis)
      }));
      
      // Expand the review to show the analysis
      setExpandedReviewId(reviewId);
    } catch (error) {
      console.error('Error analyzing review:', error);
      // Show a fallback analysis on error
      setAnalysisData(prev => ({
        ...prev,
        [reviewId]: {
          summary: "We couldn't analyze this review. Please try again later.",
          keywords: ["error"],
          sentiments: [
            { sentiment: "Error", score: 100 }
          ]
        }
      }));
      
      setExpandedReviewId(reviewId);
    } finally {
      setAnalyzingReviewIds(prev => prev.filter(id => id !== reviewId));
    }
  };

  // Helper function to parse the AI response
  const parseAnalysisResponse = (aiResponse) => {
    try {
      // Default structure for analysis
      const analysis = {
        summary: "",
        keywords: [],
        sentiments: []
      };
      
      // Try to extract summary
      const summaryMatch = aiResponse.match(/(?:Summary|Overall):\s*(.*?)(?:\n\n|\n|$)/i);
      if (summaryMatch && summaryMatch[1]) {
        analysis.summary = summaryMatch[1].trim();
      } else {
        // Fallback: Use the first paragraph as summary
        const firstParagraph = aiResponse.split('\n')[0];
        analysis.summary = firstParagraph || "Analysis completed successfully.";
      }
      
      // Try to extract keywords/topics
      const keywordsMatch = aiResponse.match(/(?:Key Topics|Keywords|Key Themes|Main Points):\s*(.*?)(?:\n\n|\n|$)/i);
      if (keywordsMatch && keywordsMatch[1]) {
        // Split by commas, dashes, or bullet points
        const keywordString = keywordsMatch[1].trim();
        analysis.keywords = keywordString
          .split(/,|\s-\s|\n-\s|•/)
          .map(k => k.trim())
          .filter(k => k.length > 0);
      } else {
        // Extract potential keywords based on capitalized words or quoted terms
        const potentialKeywords = aiResponse.match(/[A-Z][a-z]+|"([^"]+)"/g);
        if (potentialKeywords) {
          analysis.keywords = potentialKeywords
            .slice(0, 5)
            .map(k => k.replace(/"/g, '').trim());
        } else {
          analysis.keywords = ["Customer Experience"];
        }
      }
      
      // Try to extract sentiment scores
      const positiveMatch = aiResponse.match(/Positive:?\s*(\d+)%/i);
      const negativeMatch = aiResponse.match(/Negative:?\s*(\d+)%/i);
      const neutralMatch = aiResponse.match(/Neutral:?\s*(\d+)%/i);
      
      if (positiveMatch) {
        analysis.sentiments.push({
          sentiment: "Positive",
          score: parseInt(positiveMatch[1])
        });
      }
      
      if (negativeMatch) {
        analysis.sentiments.push({
          sentiment: "Negative",
          score: parseInt(negativeMatch[1])
        });
      }
      
      if (neutralMatch) {
        analysis.sentiments.push({
          sentiment: "Neutral",
          score: parseInt(neutralMatch[1])
        });
      }
      
      // If no sentiment scores were found, generate some based on positive/negative words
      if (analysis.sentiments.length === 0) {
        const positiveWords = ["excellent", "good", "great", "satisfied", "happy", "recommend"];
        const negativeWords = ["poor", "bad", "terrible", "dissatisfied", "unhappy", "disappointed"];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
          if (aiResponse.toLowerCase().includes(word)) positiveCount++;
        });
        
        negativeWords.forEach(word => {
          if (aiResponse.toLowerCase().includes(word)) negativeCount++;
        });
        
        const total = positiveCount + negativeCount;
        if (total > 0) {
          const positiveScore = Math.round((positiveCount / total) * 100);
          const negativeScore = 100 - positiveScore;
          
          analysis.sentiments = [
            { sentiment: "Positive", score: positiveScore },
            { sentiment: "Negative", score: negativeScore }
          ];
        } else {
          // Default fallback
          analysis.sentiments = [
            { sentiment: "Positive", score: 50 },
            { sentiment: "Negative", score: 30 },
            { sentiment: "Neutral", score: 20 }
          ];
        }
      }
      
      // Sort sentiments by score (highest first)
      analysis.sentiments.sort((a, b) => b.score - a.score);
      
      return analysis;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return {
        summary: aiResponse.substring(0, 100) + "...",
        keywords: ["Customer", "Service", "Experience"],
        sentiments: [
          { sentiment: "Positive", score: 60 },
          { sentiment: "Negative", score: 20 },
          { sentiment: "Neutral", score: 20 }
        ]
      };
    }
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
          Explore what our customers are saying about us using AI analysis
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} key={review._id}>
            <StyledCard 
              sx={{ 
                height: 'auto',
                display: 'flex', 
                flexDirection: 'column'
              }}
            >
              <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
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
                  <Box sx={{ flexGrow: 1 }}>
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
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2
                }}>
                  <AnimatedButton 
                    variant="contained" 
                    color="primary" 
                    startIcon={analyzingReviewIds.includes(review._id) ? <CircularProgress size={16} color="inherit" /> : <Analytics />}
                    onClick={() => handleAnalyze(review._id, review.review)}
                    disabled={analyzingReviewIds.includes(review._id)}
                    sx={{ 
                      borderRadius: 4,
                      boxShadow: 2,
                      px: 3
                    }}
                  >
                    {analyzingReviewIds.includes(review._id) 
                      ? 'Analyzing...' 
                      : expandedReviewId === review._id 
                        ? 'Hide Analysis' 
                        : 'AI Analysis'}
                  </AnimatedButton>
                </Box>
              </CardContent>
              
              <Collapse in={expandedReviewId === review._id} timeout="auto" unmountOnExit>
                <Divider />
                <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.02)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      AI Sentiment Analysis
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setExpandedReviewId(null)}
                      sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  {analysisData[review._id] && (
                    <>
                      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Summary
                        </Typography>
                        <Typography variant="body1">
                          {analysisData[review._id].summary}
                        </Typography>
                      </Paper>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Paper elevation={0} sx={{ p: 2, height: '100%', bgcolor: 'background.paper' }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Key Topics
                            </Typography>
                            <Box>
                              {analysisData[review._id].keywords.map((keyword, idx) => (
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
                            {analysisData[review._id].sentiments.map((sentiment, idx) => (
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
                  )}
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
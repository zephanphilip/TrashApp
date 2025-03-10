// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// console.log("ai controller used");
// // Function to remove * and # from the AI response
// const sanitizeResponse = (response) => {
//     return response.replace(/[*#]/g, '');
// };




// //Recipe Generation Function
// const generateAnalysis = async (review) => {
//   console.log("ai used");
//     try {
        
//       if (!review) return "Please provide a valid review.";
  
//       const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
//       const result = await model.generateContent(["Sentimental analysis the review", review]);
  
//       let aiResponse = await result.response.text();

//       aiResponse = sanitizeResponse(aiResponse);
//         console.log(aiResponse);
//       return aiResponse;
//     } catch (error) {
//       if (error.status === 429) {
//         console.warn("Rate limit exceeded. Retrying...");
//         // Retry after a delay (e.g., 1 minute)
//         await new Promise((resolve) => setTimeout(resolve, 60000));
//         return generateAnalysis(review);
//       }
//       console.error('Error in AI completion:', error);
//       throw error;
//     }
//   };

  
//   // API Endpoint for sentimentalanalysis
// const AnalyseReview = async (req, res) => {
//   console.log("ai used");
//     const { review } = req.body;
//     if (!review || review.trim() === "") {
//       return res.status(400).json({ message: "review is required." });
//     }
  
//     try {
//       console.log(review);
//       const sentianalysis = await generateAnalysis(review); 
//       res.status(200).json({ sentianalysis }); 
//     } catch (error) {
//       console.error("Error generating sentimentalanalysis:", error);
//       res.status(500).json({ message: "Error generating sentimentalanalysis." });
//     }
//   };
  


//   module.exports = {AnalyseReview};

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

console.log("ai controller loaded");

// Function to remove * and # from the AI response
const sanitizeResponse = (response) => {
  return response.replace(/[*#]/g, '');
};

/**
 * Generate sentiment analysis for a review using Gemini AI
 * @param {string} review - The review text to analyze
 * @returns {string} - The formatted analysis response
 */
const generateAnalysis = async (review) => {
  console.log("Generating AI analysis for review");
  
  try {
    if (!review) return "Please provide a valid review.";
    
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a more structured prompt for better results
    const prompt = `
      Perform a detailed sentiment analysis on the following customer review:
      
      "${review}"
      
      Please provide:
      1. Summary: A brief overall sentiment analysis (1-2 sentences)
      2. Key Topics: 3-5 main topics/themes mentioned in the review
      3. Sentiment Breakdown: Percentage breakdown of positive, negative, and neutral sentiment (e.g., Positive: 70%, Negative: 20%, Neutral: 10%)
      
      Format your response in a clean, easy-to-read format.
    `;
    
    const result = await model.generateContent([prompt]);
    let aiResponse = await result.response.text();
    
    // Clean up the response
    aiResponse = sanitizeResponse(aiResponse);
    
    console.log("Analysis generated successfully");
    return aiResponse;
  } catch (error) {
    if (error.status === 429) {
      console.warn("Rate limit exceeded. Retrying after delay...");
      // Retry after a delay (e.g., 1 minute)
      await new Promise((resolve) => setTimeout(resolve, 60000));
      return generateAnalysis(review);
    }
    
    console.error('Error in AI completion:', error);
    throw error;
  }
};

/**
 * API Endpoint for sentiment analysis
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const AnalyseReview = async (req, res) => {
  console.log("Review analysis endpoint called");
  
  const { review } = req.body;
  
  if (!review || review.trim() === "") {
    return res.status(400).json({ message: "Review text is required." });
  }
  
  try {
    console.log(`Analyzing review: "${review.substring(0, 50)}..."`);
    
    const sentianalysis = await generateAnalysis(review);
    
    // Return the analysis in the response
    res.status(200).json({ sentianalysis });
  } catch (error) {
    console.error("Error generating sentiment analysis:", error);
    
    // Provide more detailed error information when possible
    const errorMessage = error.message || "Error generating sentiment analysis.";
    const statusCode = error.status || 500;
    
    res.status(statusCode).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};




/**
 * Generate chatbot response using Gemini AI
 * @param {string} message - The user's message
 * @returns {string} - The AI-generated response
 */
const generateChatResponse = async (message) => {
  console.log("Generating chatbot response");
  
  try {
    if (!message) return "Please ask a question or provide a message.";
    
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create system context and prompt for the chatbot
    const prompt = `
      You are a helpful eco-assistant for a waste management and recycling app called "TrashApp". 
      Your role is to provide information about the app's features and environmental tips.
      
      About TrashApp:
      - Users can sell their waste to the service for recycling
      - The app has a pickup service where users can schedule collection of their waste
      - There are specific collection slots based on location (within 5km radius of service centers)
      - Users earn rewards for recycling that can be redeemed or donated
      - The app shows statistics about user contributions to environmental protection
      
      Here are some guidelines for your responses:
      - Be friendly, helpful, and concise
      - Focus on practical advice for waste management and recycling
      - Provide educational content about environmental impact when relevant
      - If asked about specific app functionality, explain how to use that feature
      - If you don't know specific details about the app, provide general guidance
      - Keep responses to 2-3 short paragraphs maximum
      
      User's message: "${message}"
    `;
    
    const result = await model.generateContent([prompt]);
    let aiResponse = await result.response.text();
    
    // Clean up the response
    aiResponse = sanitizeResponse(aiResponse);
    
    console.log("Chatbot response generated successfully");
    return aiResponse;
  } catch (error) {
    if (error.status === 429) {
      console.warn("Rate limit exceeded. Retrying after delay...");
      // Retry after a delay (e.g., 1 minute)
      await new Promise((resolve) => setTimeout(resolve, 60000));
      return generateChatResponse(message);
    }
    
    console.error('Error in AI completion:', error);
    throw error;
  }
};



/**
 * API Endpoint for chatbot
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const ChatbotResponse = async (req, res) => {
  console.log("Chatbot endpoint called");
  
  const { message } = req.body;
  
  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Message text is required." });
  }
  
  try {
    console.log(`Processing message: "${message.substring(0, 50)}..."`);
    
    const response = await generateChatResponse(message);
    
    // Return the chatbot response
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    
    // Provide more detailed error information when possible
    const errorMessage = error.message || "Error generating chatbot response.";
    const statusCode = error.status || 500;
    
    res.status(statusCode).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};

module.exports = { AnalyseReview , ChatbotResponse};
require('dotenv').config()


const http = require('http');
const { Server } = require('socket.io');


const bodyParser = require("body-parser");
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');

const orderRoutes = require('./routes/orderRouter');
const aiRoutes = require('./routes/aiRouter');
const reviewRoutes = require('./routes/reviewRouter');
const userRoutes = require('./routes/userRoutes');

const slotRoutes = require('./routes/slotRoutes');


// Import routes
const chatSessionRoutes = require('./routes/chatSessionRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Import socket handler
const setupSocketHandlers = require('./socket/socketHandlers');



const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'exp://172.30.29.4:8081'], // React admin and React Native app
    methods: ['GET', 'POST']
  }
});



// Enable CORS
app.use(cors());



//middleware
app.use(express.json())

//routes
app.use('/api/orders',orderRoutes);
app.use('/api/reviews',reviewRoutes);
app.use('/api/ai',aiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/slots', slotRoutes);

// Routes
app.use('/api/chatsessions', chatSessionRoutes);
app.use('/api/messages', messageRoutes);

// Setup Socket.IO handlers
setupSocketHandlers(io);



//db connect
mongoose.connect(process.env.MONG_URI).then(()=>{
    //listen on port
    server.listen(process.env.PORT,()=>{  // Use the existing HTTP server
      console.log('connected to db and listening on port',process.env.PORT);
  });
}).catch((error)=>{
    console.log(error)
});

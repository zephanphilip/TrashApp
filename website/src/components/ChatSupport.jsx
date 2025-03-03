
// import React, { useState, useEffect, useRef } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   TextField,
//   Button,
//   IconButton,
//   Chip,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Container,
//   Grid
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import SendIcon from '@mui/icons-material/Send';
// import MessageIcon from '@mui/icons-material/Message';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


// const API_URL = 'http://localhost:3001';

// const ChatSupport = () => {
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const [activeSessions, setActiveSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const socket = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Initialize socket connection
//   useEffect(() => {
//     if (!isUserLoaded || !user) return;

//     // Set up socket connection
//     const setupSocket = () => {
//       socket.current = io(API_URL);
     
//       socket.current.on('connect', () => {
//         console.log('Connected to socket server');
//         // Only join room if user is available
//         if (user && user.id) {
//           socket.current.emit('join', user.id);
//         }
//       });
     
//       socket.current.on('connect_error', (err) => {
//         console.error('Socket connection error:', err);
//         setError('Failed to connect to chat server. Please check your network connection.');
//       });
     
//       socket.current.on('message', (message) => {
//         console.log('Received message:', message);
       
//         // Add message to current conversation if it's from the selected user
//         if (selectedSession &&
//             (message.senderId === selectedSession.userId ||
//              message.receiverId === selectedSession.userId)) {
//           setMessages(prevMessages => {
//             // Check if message already exists to avoid duplication
//             const messageExists = prevMessages.some(m =>
//               m._id === message._id ||
//               (m.timestamp === message.timestamp && m.message === message.message)
//             );
           
//             return messageExists ? prevMessages : [...prevMessages, message];
//           });
//         }
       
//         // Refresh the sessions list to update unread count
//         fetchSessions();
//       });
//     };

//     setupSocket();
   
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, [isUserLoaded, user, selectedSession]); // Added selectedSession as dependency

//   // Fetch active chat sessions
//   const fetchSessions = async () => {
//     if (!isUserLoaded || !user) return;
   
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_URL}/api/chatsessions?status=active`);
//       setActiveSessions(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching chat sessions:', err);
//       setError('Failed to load active chat sessions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load sessions on component mount
//   useEffect(() => {
//     if (isUserLoaded && user) {
//       fetchSessions();
//       const interval = setInterval(fetchSessions, 30000); // Refresh every 30 seconds
//       return () => clearInterval(interval);
//     }
//   }, [isUserLoaded, user]);

//   // Fetch messages when a session is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedSession || !isUserLoaded || !user) return;
     
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/chatsessions/${selectedSession._id}/messages`
//         );
//         setMessages(response.data);
       
//         // If this admin is not assigned to this session, assign them
//         if (!selectedSession.adminId && user.id) {
//           await axios.patch(`${API_URL}/api/chatsessions/${selectedSession._id}`, {
//             adminId: user.id
//           });
         
//           // Update the local state
//           setSelectedSession(prev => ({
//             ...prev,
//             adminId: user.id
//           }));
//         }
       
//         scrollToBottom();
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching messages:', err);
//         setError('Failed to load chat messages');
//       }
//     };
   
//     fetchMessages();
//   }, [selectedSession, isUserLoaded, user]);

//   // Auto scroll to bottom when messages update
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async () => {
//     // Guard against null references
//     if (!inputMessage.trim() || !selectedSession || !isUserLoaded || !user || !user.id) {
//       console.warn('Cannot send message: Missing user or session information');
//       if (!user || !user.id) {
//         setError('Cannot send message: User not authenticated');
//       }
//       return;
//     }
   
//     const messageData = {
//       senderId: user.id,
//       receiverId: selectedSession.userId,
//       message: inputMessage,
//       senderType: 'admin',
//       sessionId: selectedSession._id
//     };
   
//     try {
//       let sentMessage;
     
//       // Send through socket if available
//       if (socket.current && socket.current.connected) {
//         socket.current.emit('chat message', messageData);
//       } else {
//         // Fallback to HTTP if socket isn't connected
//         const response = await axios.post(`${API_URL}/api/messages`, messageData);
//         sentMessage = response.data;
//       }
     
//       // Optimistically add to UI
//       setMessages(prevMessages => [...prevMessages, {
//         ...messageData,
//         _id: sentMessage?._id || Date.now().toString(),
//         timestamp: sentMessage?.timestamp || new Date().toISOString(),
//         isRead: false
//       }]);
     
//       setInputMessage(''); // Clear input field
//       setError(null);
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setError('Failed to send message');
//     }
//   };

//   const closeSession = async () => {
//     if (!selectedSession) return;
   
//     try {
//       await axios.patch(`${API_URL}/api/chatsessions/${selectedSession._id}`, {
//         status: 'closed'
//       });
     
//       // Remove from active sessions and clear selection
//       setActiveSessions(prev => prev.filter(s => s._id !== selectedSession._id));
//       setSelectedSession(null);
//       setMessages([]);
//       setError(null);
//     } catch (err) {
//       console.error('Error closing session:', err);
//       setError('Failed to close chat session');
//     }
//   };

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleTyping = () => {
//     if (socket.current && socket.current.connected && selectedSession && user && user.id) {
//       socket.current.emit('typing', {
//         senderId: user.id,
//         receiverId: selectedSession.userId
//       });
//     }
//   };

//   // Styled components using MUI
//   const SidebarHeader = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     backgroundColor: theme.palette.background.paper
//   }));

//   const SessionItem = styled(ListItem)(({ theme, selected }) => ({
//     cursor: 'pointer',
//     backgroundColor: selected ? theme.palette.action.selected : 'transparent',
//     '&:hover': {
//       backgroundColor: theme.palette.action.hover
//     },
//     transition: 'background-color 0.3s'
//   }));

//   const ChatMessageContainer = styled(Box)(({ theme, isAdmin }) => ({
//     maxWidth: '80%',
//     marginBottom: theme.spacing(2),
//     marginLeft: isAdmin ? 'auto' : 0,
//     marginRight: isAdmin ? 0 : 'auto',
//     display: 'flex',
//     flexDirection: 'column'
//   }));

//   const ChatBubble = styled(Paper)(({ theme, isAdmin }) => ({
//     padding: theme.spacing(1.5),
//     borderRadius: theme.spacing(1),
//     backgroundColor: isAdmin ? theme.palette.primary.main : theme.palette.background.paper,
//     color: isAdmin ? theme.palette.primary.contrastText : theme.palette.text.primary,
//     boxShadow: theme.shadows[1]
//   }));

//   const MessageTimestamp = styled(Typography)(({ theme, isAdmin }) => ({
//     fontSize: '0.75rem',
//     color: theme.palette.text.secondary,
//     marginTop: theme.spacing(0.5),
//     textAlign: isAdmin ? 'right' : 'left'
//   }));

//   const ChatHeader = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   }));

//   const ChatInputArea = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: `1px solid ${theme.palette.divider}`,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex'
//   }));

//   const EmptyStateContainer = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     padding: theme.spacing(3),
//     textAlign: 'center'
//   }));

//   // Check if user is still loading
//   if (!isUserLoaded) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//         <Typography variant="body1" ml={2}>Loading user information...</Typography>
//       </Box>
//     );
//   }

//   // Check if user is authenticated
//   if (isUserLoaded && !user) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <Paper elevation={3} sx={{ p: 4, maxWidth: 500, backgroundColor: '#FEF2F2' }}>
//           <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
//             Authentication Required
//           </Typography>
//           <Typography variant="body1">
//             You need to be logged in to access the chat support system.
//           </Typography>
//         </Paper>
//       </Box>
//     );
//   }

//   if (loading && activeSessions.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//         <Typography variant="body1" ml={2}>Loading active chats...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
//       {/* Error notification */}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           severity="error"
//           variant="filled"
//           onClose={() => setError(null)}
//           sx={{ width: '100%' }}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
     
//       {/* Chat sessions sidebar */}
//       <Paper
//         elevation={4}
//         sx={{
//           width: 300,
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}
//       >
//         <SidebarHeader>
//           <Typography variant="h6" fontWeight="medium">Active Support Chats</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {activeSessions.length} {activeSessions.length === 1 ? 'conversation' : 'conversations'} active
//           </Typography>
//         </SidebarHeader>
       
//         {activeSessions.length === 0 ? (
//           <EmptyStateContainer>
//             <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//             <Typography variant="subtitle1" color="text.primary" fontWeight="medium">
//               No active support requests
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mt={1}>
//               When customers start new conversations, they'll appear here
//             </Typography>
//           </EmptyStateContainer>
//         ) : (
//           <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
//             {activeSessions.map(session => (
//               <React.Fragment key={session._id}>
//                 <SessionItem
//                   selected={selectedSession?._id === session._id}
//                   onClick={() => setSelectedSession(session)}
//                 >
//                   <ListItemText
//                     primary={
//                       <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Typography variant="subtitle2">User: {session.userId}</Typography>
//                         {!session.adminId && (
//                           <Chip
//                             label="New"
//                             size="small"
//                             color="warning"
//                             sx={{ height: 20 }}
//                           />
//                         )}
//                       </Box>
//                     }
//                     secondary={
//                       <Typography variant="caption" color="text.secondary">
//                         {new Date(session.startedAt).toLocaleString()}
//                       </Typography>
//                     }
//                   />
//                 </SessionItem>
//                 <Divider component="li" />
//               </React.Fragment>
//             ))}
//           </List>
//         )}
       
//         <Box p={2} borderTop={1} borderColor="divider">
//           <Button
//             onClick={fetchSessions}
//             variant="outlined"
//             startIcon={<RefreshIcon />}
//             fullWidth
//           >
//             Refresh Sessions
//           </Button>
//         </Box>
//       </Paper>
     
//       {/* Chat area */}
//       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
//         {selectedSession ? (
//           <>
//             {/* Chat header */}
//             <ChatHeader>
//               <Box>
//                 <Typography variant="h6">Chat with User {selectedSession.userId}</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Started {new Date(selectedSession.startedAt).toLocaleString()}
//                 </Typography>
//               </Box>
//               <Button
//                 onClick={closeSession}
//                 variant="contained"
//                 color="error"
//                 startIcon={<CloseIcon />}
//               >
//                 Close Chat
//               </Button>
//             </ChatHeader>
           
//             {/* Messages */}
//             <Box sx={{
//               flex: 1,
//               overflow: 'auto',
//               p: 3,
//               bgcolor: '#F5F7FA',
//               display: 'flex',
//               flexDirection: 'column'
//             }}>
//               {messages.length === 0 ? (
//                 <EmptyStateContainer>
//                   <MessageIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                   <Typography variant="subtitle1" color="text.secondary">
//                     No messages yet
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" mt={1}>
//                     Send a message to start the conversation
//                   </Typography>
//                 </EmptyStateContainer>
//               ) : (
//                 messages.map(msg => (
//                   <ChatMessageContainer
//                     key={msg._id || Math.random().toString()}
//                     isAdmin={msg.senderType === 'admin'}
//                   >
//                     <ChatBubble isAdmin={msg.senderType === 'admin'}>
//                       <Typography variant="body1">{msg.message}</Typography>
//                     </ChatBubble>
//                     <MessageTimestamp
//                       variant="caption"
//                       isAdmin={msg.senderType === 'admin'}
//                     >
//                       {new Date(msg.timestamp).toLocaleTimeString([], {
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </MessageTimestamp>
//                   </ChatMessageContainer>
//                 ))
//               )}
//               <div ref={messagesEndRef}></div>
//             </Box>
           
//             {/* Input area */}
//             <ChatInputArea>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Type your message..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyUp={handleTyping}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault();
//                     sendMessage();
//                   }
//                 }}
//                 size="small"
//                 sx={{ mr: 1 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 endIcon={<SendIcon />}
//                 onClick={sendMessage}
//                 disabled={!inputMessage.trim() || !user}
//               >
//                 Send
//               </Button>
//             </ChatInputArea>
//           </>
//         ) : (
//           <EmptyStateContainer>
//             <MessageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
//             <Typography variant="h5" color="text.primary" gutterBottom>
//               No chat selected
//             </Typography>
//             <Typography variant="body1" color="text.secondary" paragraph>
//               Select a conversation from the sidebar to view and respond to customer messages.
//             </Typography>
//             {activeSessions.length === 0 && (
//               <Typography variant="body2" color="text.disabled" mt={2}>
//                 When customers start new conversations, they'll appear in the sidebar.
//               </Typography>
//             )}
//           </EmptyStateContainer>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ChatSupport;
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import io from 'socket.io-client';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Container,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const API_URL = 'http://localhost:3001';

// Custom styled input that doesn't use Material-UI TextField
const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '10px 14px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  transition: 'border-color 0.2s',
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`
  }
}));

const ChatSupport = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    if (!isUserLoaded || !user) return;

    // Set up socket connection
    const setupSocket = () => {
      socket.current = io(API_URL);
     
      socket.current.on('connect', () => {
        console.log('Connected to socket server');
        // Only join room if user is available
        if (user && user.id) {
          socket.current.emit('join', user.id);
        }
      });
     
      socket.current.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setError('Failed to connect to chat server. Please check your network connection.');
      });
     
      socket.current.on('message', (message) => {
        console.log('Received message:', message);
       
        // Add message to current conversation if it's from the selected user
        if (selectedSession &&
            (message.senderId === selectedSession.userId ||
             message.receiverId === selectedSession.userId)) {
          setMessages(prevMessages => {
            // Check if message already exists to avoid duplication
            const messageExists = prevMessages.some(m =>
              m._id === message._id ||
              (m.timestamp === message.timestamp && m.message === message.message)
            );
           
            return messageExists ? prevMessages : [...prevMessages, message];
          });
        }
       
        // Refresh the sessions list to update unread count
        fetchSessions();
      });
    };

    setupSocket();
   
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [isUserLoaded, user, selectedSession]);

  // Fetch active chat sessions
  const fetchSessions = async () => {
    if (!isUserLoaded || !user) return;
   
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/chatsessions?status=active`);
      setActiveSessions(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching chat sessions:', err);
      setError('Failed to load active chat sessions');
    } finally {
      setLoading(false);
    }
  };

  // Load sessions on component mount
  useEffect(() => {
    if (isUserLoaded && user) {
      fetchSessions();
      const interval = setInterval(fetchSessions, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isUserLoaded, user]);

  // Fetch messages when a session is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedSession || !isUserLoaded || !user) return;
     
      try {
        const response = await axios.get(
          `${API_URL}/api/chatsessions/${selectedSession._id}/messages`
        );
        setMessages(response.data);
       
        // If this admin is not assigned to this session, assign them
        if (!selectedSession.adminId && user.id) {
          await axios.patch(`${API_URL}/api/chatsessions/${selectedSession._id}`, {
            adminId: user.id
          });
         
          // Update the local state
          setSelectedSession(prev => ({
            ...prev,
            adminId: user.id
          }));
        }
       
        scrollToBottom();
        setError(null);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load chat messages');
      }
    };
   
    fetchMessages();
  }, [selectedSession, isUserLoaded, user]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus the input when a session is selected
  useEffect(() => {
    if (selectedSession && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [selectedSession]);

  const sendMessage = async () => {
    // Guard against null references
    if (!inputMessage.trim() || !selectedSession || !isUserLoaded || !user || !user.id) {
      console.warn('Cannot send message: Missing user or session information');
      if (!user || !user.id) {
        setError('Cannot send message: User not authenticated');
      }
      return;
    }
   
    const messageData = {
      senderId: user.id,
      receiverId: selectedSession.userId,
      message: inputMessage,
      senderType: 'admin',
      sessionId: selectedSession._id
    };
   
    try {
      let sentMessage;
     
      // Send through socket if available
      if (socket.current && socket.current.connected) {
        socket.current.emit('chat message', messageData);
      } else {
        // Fallback to HTTP if socket isn't connected
        const response = await axios.post(`${API_URL}/api/messages`, messageData);
        sentMessage = response.data;
      }
     
      // Optimistically add to UI
      setMessages(prevMessages => [...prevMessages, {
        ...messageData,
        _id: sentMessage?._id || Date.now().toString(),
        timestamp: sentMessage?.timestamp || new Date().toISOString(),
        isRead: false
      }]);
     
      setInputMessage(''); // Clear input field
      
      // Focus the input field after sending a message
      if (inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 0);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  const closeSession = async () => {
    if (!selectedSession) return;
   
    try {
      await axios.patch(`${API_URL}/api/chatsessions/${selectedSession._id}`, {
        status: 'closed'
      });
     
      // Remove from active sessions and clear selection
      setActiveSessions(prev => prev.filter(s => s._id !== selectedSession._id));
      setSelectedSession(null);
      setMessages([]);
      setError(null);
    } catch (err) {
      console.error('Error closing session:', err);
      setError('Failed to close chat session');
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Styled components using MUI
  const SidebarHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
  }));

  const SessionItem = styled(ListItem)(({ theme, selected }) => ({
    cursor: 'pointer',
    backgroundColor: selected ? theme.palette.action.selected : 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    transition: 'background-color 0.3s'
  }));

  const ChatMessageContainer = styled(Box)(({ theme, isAdmin }) => ({
    maxWidth: '80%',
    marginBottom: theme.spacing(2),
    marginLeft: isAdmin ? 'auto' : 0,
    marginRight: isAdmin ? 0 : 'auto',
    display: 'flex',
    flexDirection: 'column'
  }));

  const ChatBubble = styled(Paper)(({ theme, isAdmin }) => ({
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: isAdmin ? theme.palette.primary.main : theme.palette.background.paper,
    color: isAdmin ? theme.palette.primary.contrastText : theme.palette.text.primary,
    boxShadow: theme.shadows[1]
  }));

  const MessageTimestamp = styled(Typography)(({ theme, isAdmin }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    textAlign: isAdmin ? 'right' : 'left'
  }));

  const ChatHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }));

  const ChatInputArea = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  }));

  const EmptyStateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(3),
    textAlign: 'center'
  }));

  // Check if user is still loading
  if (!isUserLoaded) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading user information...</Typography>
      </Box>
    );
  }

  // Check if user is authenticated
  if (isUserLoaded && !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, backgroundColor: '#FEF2F2' }}>
          <Typography variant="h5" color="error" gutterBottom fontWeight="bold">
            Authentication Required
          </Typography>
          <Typography variant="body1">
            You need to be logged in to access the chat support system.
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (loading && activeSessions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading active chats...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Error notification */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError(null)}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
     
      {/* Chat sessions sidebar */}
      <Paper
        elevation={4}
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <SidebarHeader>
          <Typography variant="h6" fontWeight="medium">Active Support Chats</Typography>
          <Typography variant="body2" color="text.secondary">
            {activeSessions.length} {activeSessions.length === 1 ? 'conversation' : 'conversations'} active
          </Typography>
        </SidebarHeader>
       
        {activeSessions.length === 0 ? (
          <EmptyStateContainer>
            <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="subtitle1" color="text.primary" fontWeight="medium">
              No active support requests
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              When customers start new conversations, they'll appear here
            </Typography>
          </EmptyStateContainer>
        ) : (
          <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
            {activeSessions.map(session => (
              <React.Fragment key={session._id}>
                <SessionItem
                  selected={selectedSession?._id === session._id}
                  onClick={() => setSelectedSession(session)}
                >
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2">User: {session.userId}</Typography>
                        {!session.adminId && (
                          <Chip
                            label="New"
                            size="small"
                            color="warning"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {new Date(session.startedAt).toLocaleString()}
                      </Typography>
                    }
                  />
                </SessionItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
       
        <Box p={2} borderTop={1} borderColor="divider">
          <Button
            onClick={fetchSessions}
            variant="outlined"
            startIcon={<RefreshIcon />}
            fullWidth
          >
            Refresh Sessions
          </Button>
        </Box>
      </Paper>
     
      {/* Chat area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {selectedSession ? (
          <>
            {/* Chat header */}
            <ChatHeader>
              <Box>
                <Typography variant="h6">Chat with User {selectedSession.userId}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Started {new Date(selectedSession.startedAt).toLocaleString()}
                </Typography>
              </Box>
              <Button
                onClick={closeSession}
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
              >
                Close Chat
              </Button>
            </ChatHeader>
           
            {/* Messages */}
            <Box sx={{
              flex: 1,
              overflow: 'auto',
              p: 3,
              bgcolor: '#F5F7FA',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {messages.length === 0 ? (
                <EmptyStateContainer>
                  <MessageIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="subtitle1" color="text.secondary">
                    No messages yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Send a message to start the conversation
                  </Typography>
                </EmptyStateContainer>
              ) : (
                messages.map(msg => (
                  <ChatMessageContainer
                    key={msg._id || Math.random().toString()}
                    isAdmin={msg.senderType === 'admin'}
                  >
                    <ChatBubble isAdmin={msg.senderType === 'admin'}>
                      <Typography variant="body1">{msg.message}</Typography>
                    </ChatBubble>
                    <MessageTimestamp
                      variant="caption"
                      isAdmin={msg.senderType === 'admin'}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </MessageTimestamp>
                  </ChatMessageContainer>
                ))
              )}
              <div ref={messagesEndRef}></div>
            </Box>
           
            {/* Input area with custom input element instead of TextField */}
            <ChatInputArea>
              <StyledInput
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ marginRight: '8px' }}
                autoFocus={true}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={sendMessage}
                disabled={!inputMessage.trim() || !user}
              >
                Send
              </Button>
            </ChatInputArea>
          </>
        ) : (
          <EmptyStateContainer>
            <MessageIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
            <Typography variant="h5" color="text.primary" gutterBottom>
              No chat selected
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Select a conversation from the sidebar to view and respond to customer messages.
            </Typography>
            {activeSessions.length === 0 && (
              <Typography variant="body2" color="text.disabled" mt={2}>
                When customers start new conversations, they'll appear in the sidebar.
              </Typography>
            )}
          </EmptyStateContainer>
        )}
      </Box>
    </Box>
  );
};

export default ChatSupport;
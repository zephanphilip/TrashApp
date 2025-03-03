

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   FlatList, 
//   StyleSheet, 
//   TouchableOpacity, 
//   KeyboardAvoidingView, 
//   Platform, 
//   ActivityIndicator, 
//   StatusBar,
//   SafeAreaView,
//   Keyboard
// } from 'react-native';
// import { useUser } from '@clerk/clerk-expo';
// import { Ionicons } from '@expo/vector-icons';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { General } from '../constants';

// const API_URL = 'http://192.168.74.229:3001'; // Replace with your actual backend URL

// const ChatWithAgent = () => {
//   const { user } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [typing, setTyping] = useState(false);
//   const [chatSession, setChatSession] = useState(null);
//   const socket = useRef(null);
//   const flatListRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     // Initialize chat session
//     const initChat = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post(`${API_URL}/api/chatsessions`, {
//           userId: user.id
//         });
        
//         setChatSession(response.data);
        
//         // Get previous messages if any
//         if (response.data._id) {
//           const messagesRes = await axios.get(
//             `${API_URL}/api/chatsessions/${response.data._id}/messages`
//           );
//           setMessages(messagesRes.data);
//         }
        
//         // Connect to socket
//         socket.current = io(API_URL);
        
//         socket.current.on('connect', () => {
//           socket.current.emit('join', user.id);
//         });
        
//         socket.current.on('message', (message) => {
//           setMessages(prevMessages => [...prevMessages, message]);
//           setTyping(false);
//         });
        
//         socket.current.on('typing', () => {
//           setTyping(true);
//           // Clear typing indicator after 3 seconds of inactivity
//           setTimeout(() => setTyping(false), 3000);
//         });
        
//       } catch (error) {
//         console.error('Error initializing chat:', error);
//         alert('Failed to connect to customer service. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (user) {
//       initChat();
//     }
    
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, [user]);

//   const sendMessage = () => {
//     if (!inputMessage.trim() || !chatSession) return;
    
//     const messageData = {
//       senderId: user.id,
//       receiverId: chatSession.adminId || 'admin', // Use a generic admin ID if none assigned
//       message: inputMessage,
//       senderType: 'user',
//       sessionId: chatSession._id
//     };
    
//     // Send through socket
//     socket.current.emit('chat message', messageData);
    
//     // Optimistically add to UI
//     setMessages(prevMessages => [...prevMessages, {
//       ...messageData,
//       _id: Date.now().toString(),
//       timestamp: new Date().toISOString(),
//       isRead: false
//     }]);
    
//     // Clear input message AFTER sending
//     setInputMessage('');
    
//     // Keep focus on the input
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleTyping = () => {
//     if (socket.current) {
//       socket.current.emit('typing', {
//         senderId: user.id,
//         receiverId: chatSession?.adminId || 'admin'
//       });
//     }
//   };

//   const renderMessage = ({ item }) => {
//     const isUser = item.senderType === 'user';
    
//     return (
//       <View style={[
//         styles.messageBubbleContainer,
//         isUser ? styles.userMessageContainer : styles.adminMessageContainer
//       ]}>
//         {!isUser && (
//           <View style={styles.avatarContainer}>
//             <Ionicons name="person-circle" size={28} color="#0066cc" />
//           </View>
//         )}
        
//         <View style={[
//           styles.messageBubble,
//           isUser ? styles.userMessage : styles.adminMessage
//         ]}>
//           <Text style={[
//             styles.messageText,
//             isUser ? styles.userMessageText : styles.adminMessageText
//           ]}>
//             {item.message}
//           </Text>
//           <Text style={[
//             styles.timestamp,
//             isUser ? styles.userTimestamp : styles.adminTimestamp
//           ]}>
//             {new Date(item.timestamp).toLocaleTimeString([], { 
//               hour: '2-digit', 
//               minute: '2-digit' 
//             })}
//           </Text>
//         </View>
        
//         {isUser && (
//           <View style={styles.readStatus}>
//             {item.isRead ? (
//               <Ionicons name="checkmark-done" size={16} color="#0066cc" />
//             ) : (
//               <Ionicons name="checkmark" size={16} color="#0066cc" />
//             )}
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0066cc" />
//         <Text style={styles.loadingText}>Connecting to customer service...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor="#0066cc" />
      
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity style={styles.backButton}>
//             <Ionicons name="chevron-back" size={24} color="white" />
//           </TouchableOpacity>
          
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.headerTitle}>Customer Support</Text>
//             <Text style={styles.subHeader}>
//               {chatSession?.adminId ? 
//                 '● Agent is online' : 
//                 'Waiting for an agent...'}
//             </Text>
//           </View>
//         </View>
//       </View>
      
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//       >
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           keyExtractor={(item) => item._id || Math.random().toString()}
//           style={styles.messageList}
//           contentContainerStyle={styles.messageListContent}
//           onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//           renderItem={renderMessage}
//           ListHeaderComponent={
//             <View style={styles.chatInfo}>
//               <View style={styles.chatInfoIcon}>
//                 <Ionicons name="information-circle" size={24} color="#0066cc" />
//               </View>
//               <Text style={styles.chatInfoText}>
//                 Our support team typically responds within 10 minutes during business hours
//               </Text>
//             </View>
//           }
//           ListFooterComponent={() => typing ? (
//             <View style={[styles.messageBubbleContainer, styles.adminMessageContainer]}>
//               <View style={styles.avatarContainer}>
//                 <Ionicons name="person-circle" size={28} color="#0066cc" />
//               </View>
//               <View style={[styles.messageBubble, styles.adminMessage, styles.typingBubble]}>
//                 <View style={styles.typingAnimation}>
//                   <View style={styles.typingDot} />
//                   <View style={[styles.typingDot, styles.typingDotMiddle]} />
//                   <View style={styles.typingDot} />
//                 </View>
//               </View>
//             </View>
//           ) : null}
//         />
        
//         <View style={styles.inputContainer}>
//           <TouchableOpacity style={styles.attachButton}>
//             <Ionicons name="add-circle-outline" size={24} color="#0066cc" />
//           </TouchableOpacity>
          
//           <TextInput
//             ref={inputRef}
//             style={styles.input}
//             value={inputMessage}
//             onChangeText={setInputMessage}
//             placeholder="Type a message..."
//             placeholderTextColor="#999"
//             onKeyPress={handleTyping}
//             multiline
//           />
          
//           <TouchableOpacity 
//             style={[
//               styles.sendButton,
//               !inputMessage.trim() && styles.sendButtonDisabled
//             ]}
//             onPress={sendMessage}
//             disabled={!inputMessage.trim()}
//           >
//             <Ionicons 
//               name="send" 
//               size={20} 
//               color={inputMessage.trim() ? "white" : "#ccc"} 
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#0066cc',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#0066cc',
//   },
//   header: {
//     backgroundColor: '#0066cc',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//     borderBottomWidth: 1,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerTextContainer: {
//     flex: 1,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subHeader: {
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontSize: 14,
//     marginTop: 2,
//   },
//   messageList: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   messageListContent: {
//     padding: 16,
//     paddingBottom: 24,
//   },
//   chatInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 102, 204, 0.08)',
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   chatInfoIcon: {
//     marginRight: 8,
//   },
//   chatInfoText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#0066cc',
//   },
//   messageBubbleContainer: {
//     flexDirection: 'row',
//     marginBottom: 12,
//     alignItems: 'flex-end',
//   },
//   userMessageContainer: {
//     justifyContent: 'flex-end',
//   },
//   adminMessageContainer: {
//     justifyContent: 'flex-start',
//   },
//   avatarContainer: {
//     marginRight: 8,
//   },
//   messageBubble: {
//     maxWidth: '70%',
//     padding: 12,
//     borderRadius: 18,
//     marginVertical: 2,
//   },
//   userMessage: {
//     backgroundColor: '#0066cc',
//     borderTopRightRadius: 4,
//     marginLeft: 40,
//   },
//   adminMessage: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 4,
//     marginRight: 40,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   messageText: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   userMessageText: {
//     color: 'white',
//   },
//   adminMessageText: {
//     color: '#333',
//   },
//   timestamp: {
//     fontSize: 11,
//     marginTop: 4,
//     textAlign: 'right',
//   },
//   userTimestamp: {
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   adminTimestamp: {
//     color: '#999',
//   },
//   readStatus: {
//     marginLeft: 4,
//     alignSelf: 'flex-end',
//     marginBottom: 4,
//   },
//   typingBubble: {
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//   },
//   typingAnimation: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 20,
//   },
//   typingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#0066cc',
//     marginHorizontal: 2,
//     opacity: 0.6,
//   },
//   typingDotMiddle: {
//     opacity: 0.8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     padding: 12,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//     alignItems: 'center',
//     // Add this to fix the gap between keyboard and textbox
//     marginBottom: Platform.OS === 'ios' ? 0 : 0,
//   },
//   attachButton: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     paddingRight: 40,
//     marginRight: 8,
//     maxHeight: 100,
//     minHeight: 40,
//     color: '#333',
//     fontSize: 16,
//   },
//   sendButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#0066cc',
//   },
//   sendButtonDisabled: {
//     backgroundColor: '#f0f0f0',
//   },
// });

// export default ChatWithAgent;


import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  StatusBar,
  SafeAreaView,
  Keyboard
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';
import axios from 'axios';
import { General } from '../constants';

const API_URL = 'http://192.168.74.229:3001'; // Replace with your actual backend URL

const ChatWithAgent = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const socket = useRef(null);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize chat session
    const initChat = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/api/chatsessions`, {
          userId: user.id
        });
        
        setChatSession(response.data);
        
        // Get previous messages if any
        if (response.data._id) {
          const messagesRes = await axios.get(
            `${API_URL}/api/chatsessions/${response.data._id}/messages`
          );
          setMessages(messagesRes.data);
        }
        
        // Connect to socket
        socket.current = io(API_URL);
        
        socket.current.on('connect', () => {
          socket.current.emit('join', user.id);
        });
        
        socket.current.on('message', (message) => {
          setMessages(prevMessages => [...prevMessages, message]);
          setTyping(false);
        });
        
        socket.current.on('typing', () => {
          setTyping(true);
          // Clear typing indicator after 3 seconds of inactivity
          setTimeout(() => setTyping(false), 3000);
        });
        
      } catch (error) {
        console.error('Error initializing chat:', error);
        alert('Failed to connect to customer service. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      initChat();
    }
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  const sendMessage = () => {
    if (!inputMessage.trim() || !chatSession) return;
    
    const messageData = {
      senderId: user.id,
      receiverId: chatSession.adminId || 'admin', // Use a generic admin ID if none assigned
      message: inputMessage,
      senderType: 'user',
      sessionId: chatSession._id
    };
    
    // Send through socket
    socket.current.emit('chat message', messageData);
    
    // Optimistically add to UI
    setMessages(prevMessages => [...prevMessages, {
      ...messageData,
      _id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    }]);
    
    // Clear input message AFTER sending
    setInputMessage('');
    
    // Keep focus on the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTyping = () => {
    if (socket.current) {
      socket.current.emit('typing', {
        senderId: user.id,
        receiverId: chatSession?.adminId || 'admin'
      });
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.senderType === 'user';
    
    return (
      <View style={[
        styles.messageBubbleContainer,
        isUser ? styles.userMessageContainer : styles.adminMessageContainer
      ]}>
        {!isUser && (
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={28} color="#0066cc" />
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          isUser ? styles.userMessage : styles.adminMessage
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.adminMessageText
          ]}>
            {item.message}
          </Text>
          <Text style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.adminTimestamp
          ]}>
            {new Date(item.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
        
        {isUser && (
          <View style={styles.readStatus}>
            {item.isRead ? (
              <Ionicons name="checkmark-done" size={16} color="#0066cc" />
            ) : (
              <Ionicons name="checkmark" size={16} color="#0066cc" />
            )}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Connecting to customer service...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0066cc" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Customer Support</Text>
            <Text style={styles.subHeader}>
              {chatSession?.adminId ? 
                '● Agent is online' : 
                'Waiting for an agent...'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id || Math.random().toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={renderMessage}
          ListHeaderComponent={
            <View style={styles.chatInfo}>
              <View style={styles.chatInfoIcon}>
                <Ionicons name="information-circle" size={24} color="#0066cc" />
              </View>
              <Text style={styles.chatInfoText}>
                Our support team typically responds within 10 minutes during business hours
              </Text>
            </View>
          }
          ListFooterComponent={() => typing ? (
            <View style={[styles.messageBubbleContainer, styles.adminMessageContainer]}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle" size={28} color="#0066cc" />
              </View>
              <View style={[styles.messageBubble, styles.adminMessage, styles.typingBubble]}>
                <View style={styles.typingAnimation}>
                  <View style={styles.typingDot} />
                  <View style={[styles.typingDot, styles.typingDotMiddle]} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          ) : null}
          ListFooterComponentStyle={{ paddingBottom: 70 }} // Add padding for input container
        />
        
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle-outline" size={24} color="#0066cc" />
          </TouchableOpacity>
          
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            onKeyPress={handleTyping}
            multiline
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !inputMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!inputMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={inputMessage.trim() ? "white" : "#ccc"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0066cc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0066cc',
  },
  header: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeader: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 2,
  },
  messageList: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageListContent: {
    padding: 16,
    paddingBottom: 24,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 204, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  chatInfoIcon: {
    marginRight: 8,
  },
  chatInfoText: {
    flex: 1,
    fontSize: 14,
    color: '#0066cc',
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  adminMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 2,
  },
  userMessage: {
    backgroundColor: '#0066cc',
    borderTopRightRadius: 4,
    marginLeft: 40,
  },
  adminMessage: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    marginRight: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  adminMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  adminTimestamp: {
    color: '#999',
  },
  readStatus: {
    marginLeft: 4,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  typingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  typingAnimation: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066cc',
    marginHorizontal: 2,
    opacity: 0.6,
  },
  typingDotMiddle: {
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  attachButton: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingRight: 40,
    marginRight: 8,
    maxHeight: 100,
    minHeight: 40,
    color: '#333',
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066cc',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

// Make sure to export the component properly
export default ChatWithAgent;
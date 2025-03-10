// // import React, { useState } from 'react';
// // import {
// //   Text,
// //   SafeAreaView,
// //   StatusBar,
// //   StyleSheet,
// //   View,
// //   ScrollView,
// //   TouchableOpacity,
// //   TextInput,
// //   Alert
// // } from 'react-native';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import { Picker } from '@react-native-picker/picker';
// // import { General } from '../constants';

// // const Checkout = () => {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const { orderData } = route.params || { orderData: null };
  
// //   const [location, setLocation] = useState('');
// //   const [selectedSlot, setSelectedSlot] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   const pickupSlots = [
// //     { day: 'Monday', time: '9:00 AM - 12:00 PM' },
// //     { day: 'Monday', time: '2:00 PM - 5:00 PM' },
// //     { day: 'Wednesday', time: '9:00 AM - 12:00 PM' },
// //     { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
// //     { day: 'Sunday', time: '10:00 AM - 1:00 PM' },
// //   ];

// //   const handlePlaceOrder = async () => {
// //     if (!location) {
// //       Alert.alert('Error', 'Please enter your pickup location');
// //       return;
// //     }
    
// //     if (!selectedSlot) {
// //       Alert.alert('Error', 'Please select a pickup slot');
// //       return;
// //     }
    
// //     setIsLoading(true);
    
// //     try {
// //       // Add location and pickup slot to the order data
// //       const finalOrderData = {
// //         ...orderData,
// //         pickupLocation: location,
// //         pickupSlot: selectedSlot,
// //       };
      
// //       const response = await fetch(`${General.API_BASE_URL}api/orders`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(finalOrderData),
// //       });
      
// //       setIsLoading(false);
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         Alert.alert(
// //           'Success', 
// //           'Your order has been placed successfully!',
// //           [
// //             {
// //               text: 'OK',
// //               onPress: () => navigation.navigate('Home'),
// //             }
// //           ]
// //         );
// //       } else {
// //         const errorData = await response.json();
// //         Alert.alert('Error', errorData.message || 'Failed to place order');
// //       }
// //     } catch (error) {
// //       setIsLoading(false);
// //       console.error('Order placement error:', error);
// //       Alert.alert('Error', 'Something went wrong. Please try again.');
// //     }
// //   };

// //   if (!orderData) {
// //     return (
// //       <SafeAreaView style={styles.container}>
// //         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
// //         <View style={styles.errorContainer}>
// //           <Text style={styles.errorText}>No order data found. Please select items first.</Text>
// //           <TouchableOpacity 
// //             style={styles.backButton}
// //             onPress={() => navigation.goBack()}
// //           >
// //             <Text style={styles.backButtonText}>Go Back</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
// //       <ScrollView style={styles.scrollContainer}>
// //         <Text style={styles.title}>Checkout</Text>
        
// //         {/* Order Summary */}
// //         <View style={styles.sectionContainer}>
// //           <Text style={styles.sectionTitle}>Order Summary</Text>
// //           {orderData.items.map((item) => (
// //             <View key={item.id} style={styles.cartItem}>
// //               <View>
// //                 <Text style={styles.cartItemText}>
// //                   {item.category} - {item.type}
// //                 </Text>
// //                 <Text style={styles.cartItemSubtext}>
// //                   Quantity: {item.quantity}
// //                 </Text>
// //                 <Text style={styles.cartItemPrice}>
// //                   ${(item.price * item.quantity).toFixed(2)}
// //                 </Text>
// //               </View>
// //             </View>
// //           ))}
// //           <View style={styles.totalAmountContainer}>
// //             <Text style={styles.totalAmountText}>
// //               Total Amount: ${orderData.totalAmount}
// //             </Text>
// //           </View>
// //         </View>
        
// //         {/* Pickup Location */}
// //         <View style={styles.sectionContainer}>
// //           <Text style={styles.sectionTitle}>Pickup Location</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter your address for pickup"
// //             value={location}
// //             onChangeText={setLocation}
// //             multiline
// //           />
// //         </View>
        
// //         {/* Pickup Slot Selection */}
// //         <View style={styles.sectionContainer}>
// //           <Text style={styles.sectionTitle}>Select Pickup Slot</Text>
// //           <View style={styles.pickerContainer}>
// //             <Picker
// //               selectedValue={selectedSlot}
// //               onValueChange={(itemValue) => setSelectedSlot(itemValue)}
// //               style={styles.picker}
// //             >
// //               <Picker.Item label="Select a pickup slot" value="" />
// //               {pickupSlots.map((slot, index) => (
// //                 <Picker.Item 
// //                   key={index} 
// //                   label={`${slot.day} (${slot.time})`}
// //                   value={`${slot.day} (${slot.time})`} 
// //                 />
// //               ))}
// //             </Picker>
// //           </View>
// //         </View>
        
// //         {/* Place Order Button */}
// //         <TouchableOpacity 
// //           style={styles.placeOrderButton} 
// //           onPress={handlePlaceOrder}
// //           disabled={isLoading}
// //         >
// //           <Text style={styles.placeOrderButtonText}>
// //             {isLoading ? 'Processing...' : 'Place Order'}
// //           </Text>
// //         </TouchableOpacity>
        
// //         {/* Cancel Button */}
// //         <TouchableOpacity 
// //           style={styles.cancelButton}
// //           onPress={() => navigation.goBack()}
// //           disabled={isLoading}
// //         >
// //           <Text style={styles.cancelButtonText}>Cancel</Text>
// //         </TouchableOpacity>
        
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default Checkout;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f2f3ee",
// //   },
// //   scrollContainer: {
// //     padding: 20,
// //     marginHorizontal: 10,
// //     borderRadius: 10,
// //     marginVertical: 10,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     marginBottom: 20,
// //     textAlign: "center",
// //     color: "#a5bc64",
// //   },
// //   sectionContainer: {
// //     marginBottom: 20,
// //     backgroundColor: "#fff",
// //     borderRadius: 10,
// //     padding: 15,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 3,
// //     elevation: 3,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 15,
// //     color: "#5d6839",
// //   },
// //   cartItem: {
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#dee2cb",
// //     marginBottom: 5,
// //   },
// //   cartItemText: {
// //     fontWeight: "bold",
// //     fontSize: 16,
// //     color: "#5d6839",
// //   },
// //   cartItemSubtext: {
// //     marginTop: 4,
// //     color: "#606c3b",
// //   },
// //   cartItemPrice: {
// //     marginTop: 4,
// //     fontWeight: "bold",
// //     color: "#606c3b",
// //   },
// //   totalAmountContainer: {
// //     marginTop: 15,
// //     paddingTop: 15,
// //     borderTopWidth: 1,
// //     borderTopColor: "#dee2cb",
// //   },
// //   totalAmountText: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     textAlign: "right",
// //     color: "#5d6839",
// //   },
// //   input: {
// //     backgroundColor: "#dee2cb",
// //     borderRadius: 10,
// //     padding: 15,
// //     fontSize: 16,
// //     color: "#5d6839",
// //     minHeight: 100,
// //     textAlignVertical: 'top',
// //   },
// //   pickerContainer: {
// //     backgroundColor: "#dee2cb",
// //     borderRadius: 10,
// //     marginBottom: 10,
// //   },
// //   picker: {
// //     color: "#5d6839",
// //   },
// //   placeOrderButton: {
// //     backgroundColor: "#606c3b",
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   placeOrderButtonText: {
// //     color: "#fdf9e1",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// //   cancelButton: {
// //     backgroundColor: "#dee2cb",
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginBottom: 30,
// //   },
// //   cancelButtonText: {
// //     color: "#5d6839",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   errorText: {
// //     fontSize: 16,
// //     color: "#5d6839",
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   backButton: {
// //     backgroundColor: "#dee2cb",
// //     padding: 15,
// //     borderRadius: 10,
// //     alignItems: "center",
// //   },
// //   backButtonText: {
// //     color: "#5d6839",
// //     fontWeight: "bold",
// //   },
// // });

// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Platform,
//   ActivityIndicator
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker';
// import { General } from '../constants';
// import * as Location from 'expo-location';

// const Checkout = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { orderData } = route.params || { orderData: null };
  
//   const [location, setLocation] = useState('');
//   const [coordinates, setCoordinates] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [detectingLocation, setDetectingLocation] = useState(false);
//   const [locationError, setLocationError] = useState(null);
  
//   const pickupSlots = [
//     { day: 'Monday', time: '9:00 AM - 12:00 PM' },
//     { day: 'Monday', time: '2:00 PM - 5:00 PM' },
//     { day: 'Wednesday', time: '9:00 AM - 12:00 PM' },
//     { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
//     { day: 'Sunday', time: '10:00 AM - 1:00 PM' },
//   ];

//   const getAddressFromCoordinates = async (latitude, longitude) => {
//     try {
//       const response = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude
//       });
      
//       if (response.length > 0) {
//         const address = response[0];
//         const formattedAddress = [
//           address.name,
//           address.street,
//           address.city,
//           address.region,
//           address.postalCode,
//           address.country
//         ].filter(Boolean).join(', ');
        
//         return formattedAddress;
//       }
//       return '';
//     } catch (error) {
//       console.error('Reverse geocoding error:', error);
//       return '';
//     }
//   };

//   const detectCurrentLocation = async () => {
//     setDetectingLocation(true);
//     setLocationError(null);
    
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
      
//       if (status !== 'granted') {
//         setLocationError('Permission to access location was denied');
//         setDetectingLocation(false);
//         return;
//       }
      
//       const currentLocation = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });
      
//       const { latitude, longitude } = currentLocation.coords;
      
//       // Save coordinates for sending to backend
//       setCoordinates({ latitude, longitude });
      
//       const address = await getAddressFromCoordinates(latitude, longitude);
      
//       if (address) {
//         setLocation(address);
//       } else {
//         setLocationError('Could not determine your address. Please enter manually.');
//       }
//     } catch (error) {
//       console.error('Location detection error:', error);
//       setLocationError('Failed to detect location. Please enter manually.');
//     } finally {
//       setDetectingLocation(false);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!location) {
//       Alert.alert('Error', 'Please enter your pickup location');
//       return;
//     }
    
//     if (!selectedSlot) {
//       Alert.alert('Error', 'Please select a pickup slot');
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       // Add location, coordinates, and pickup slot to the order data
//       const finalOrderData = {
//         ...orderData,
//         pickupLocation: location,
//         pickupSlot: selectedSlot,
//         coordinates: coordinates, // Include coordinates if available
//       };
      
//       const response = await fetch(`${General.API_BASE_URL}api/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(finalOrderData),
//       });
      
//       setIsLoading(false);
      
//       if (response.ok) {
//         const result = await response.json();
//         Alert.alert(
//           'Success', 
//           'Your order has been placed successfully!',
//           [
//             {
//               text: 'OK',
//               onPress: () => navigation.navigate('Home'),
//             }
//           ]
//         );
//       } else {
//         const errorData = await response.json();
//         Alert.alert('Error', errorData.message || 'Failed to place order');
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error('Order placement error:', error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   // When user manually edits the location, clear coordinates
//   const handleLocationChange = (text) => {
//     setLocation(text);
//     // Clear coordinates when user manually enters address
//     if (coordinates) {
//       setCoordinates(null);
//     }
//   };

//   if (!orderData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>No order data found. Please select items first.</Text>
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.backButtonText}>Go Back</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <ScrollView style={styles.scrollContainer}>
//         <Text style={styles.title}>Checkout</Text>
        
//         {/* Order Summary */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Order Summary</Text>
//           {orderData.items.map((item) => (
//             <View key={item.id} style={styles.cartItem}>
//               <View>
//                 <Text style={styles.cartItemText}>
//                   {item.category} - {item.type}
//                 </Text>
//                 <Text style={styles.cartItemSubtext}>
//                   Quantity: {item.quantity}
//                 </Text>
//                 <Text style={styles.cartItemPrice}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Text>
//               </View>
//             </View>
//           ))}
//           <View style={styles.totalAmountContainer}>
//             <Text style={styles.totalAmountText}>
//               Total Amount: ${orderData.totalAmount}
//             </Text>
//           </View>
//         </View>
        
//         {/* Pickup Location */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Pickup Location</Text>
//           <View style={styles.locationContainer}>
//             <TextInput
//               style={[styles.input, styles.locationInput]}
//               placeholder="Enter your address for pickup"
//               value={location}
//               onChangeText={handleLocationChange}
//               multiline
//             />
//             <TouchableOpacity 
//               style={styles.detectLocationButton}
//               onPress={detectCurrentLocation}
//               disabled={detectingLocation}
//             >
//               {detectingLocation ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.detectLocationText}>Detect</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//           {locationError ? (
//             <Text style={styles.errorText}>{locationError}</Text>
//           ) : null}
//           {coordinates ? (
//             <Text style={styles.coordinatesText}>
//               GPS coordinates detected: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
//             </Text>
//           ) : null}
//           <Text style={styles.locationHelpText}>
//             Click "Detect" to use your current location or enter address manually
//           </Text>
//         </View>
        
//         {/* Pickup Slot Selection */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Select Pickup Slot</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedSlot}
//               onValueChange={(itemValue) => setSelectedSlot(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select a pickup slot" value="" />
//               {pickupSlots.map((slot, index) => (
//                 <Picker.Item 
//                   key={index} 
//                   label={`${slot.day} (${slot.time})`}
//                   value={`${slot.day} (${slot.time})`} 
//                 />
//               ))}
//             </Picker>
//           </View>
//         </View>
        
//         {/* Place Order Button */}
//         <TouchableOpacity 
//           style={styles.placeOrderButton} 
//           onPress={handlePlaceOrder}
//           disabled={isLoading}
//         >
//           <Text style={styles.placeOrderButtonText}>
//             {isLoading ? 'Processing...' : 'Place Order'}
//           </Text>
//         </TouchableOpacity>
        
//         {/* Cancel Button */}
//         <TouchableOpacity 
//           style={styles.cancelButton}
//           onPress={() => navigation.goBack()}
//           disabled={isLoading}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>
        
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Checkout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2f3ee",
//   },
//   scrollContainer: {
//     padding: 20,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#a5bc64",
//   },
//   sectionContainer: {
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#5d6839",
//   },
//   cartItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#dee2cb",
//     marginBottom: 5,
//   },
//   cartItemText: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#5d6839",
//   },
//   cartItemSubtext: {
//     marginTop: 4,
//     color: "#606c3b",
//   },
//   cartItemPrice: {
//     marginTop: 4,
//     fontWeight: "bold",
//     color: "#606c3b",
//   },
//   totalAmountContainer: {
//     marginTop: 15,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: "#dee2cb",
//   },
//   totalAmountText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "right",
//     color: "#5d6839",
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     marginBottom: 10,
//   },
//   locationInput: {
//     flex: 1,
//     marginRight: 10,
//   },
//   input: {
//     backgroundColor: "#dee2cb",
//     borderRadius: 10,
//     padding: 15,
//     fontSize: 16,
//     color: "#5d6839",
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   detectLocationButton: {
//     backgroundColor: "#606c3b",
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     alignSelf: 'flex-start',
//     minHeight: 50,
//   },
//   detectLocationText: {
//     color: "#fdf9e1",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   locationHelpText: {
//     fontSize: 12,
//     color: "#606c3b",
//     marginTop: 5,
//     fontStyle: 'italic',
//   },
//   coordinatesText: {
//     fontSize: 12,
//     color: "#606c3b",
//     marginBottom: 5,
//   },
//   errorText: {
//     color: "#e74c3c",
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   pickerContainer: {
//     backgroundColor: "#dee2cb",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   picker: {
//     color: "#5d6839",
//   },
//   placeOrderButton: {
//     backgroundColor: "#606c3b",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   placeOrderButtonText: {
//     color: "#fdf9e1",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   cancelButton: {
//     backgroundColor: "#dee2cb",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   cancelButtonText: {
//     color: "#5d6839",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   backButton: {
//     backgroundColor: "#dee2cb",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   backButtonText: {
//     color: "#5d6839",
//     fontWeight: "bold",
//   },
// });

import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { General } from '../constants';
import * as Location from 'expo-location';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { orderData } = route.params || { orderData: null };
  
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  
  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      
      if (response.length > 0) {
        const address = response[0];
        const formattedAddress = [
          address.name,
          address.street,
          address.city,
          address.region,
          address.postalCode,
          address.country
        ].filter(Boolean).join(', ');
        
        return formattedAddress;
      }
      return '';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return '';
    }
  };

  // Fetch available slots based on location
  const fetchAvailableSlots = async (latitude, longitude) => {
    setFetchingSlots(true);
    try {
      // First try to find the nearest location center (Vazhakulam, Muvatupuzha, or Thodupuzha)
      const locationCenters = [
        { name: 'vazhakulam', coordinates: [9.946804, 76.636203] },
        { name: 'muvatupuzha', coordinates: [9.989502, 76.579012] },
        { name: 'thodupuzha', coordinates: [9.895894, 76.717952] }
      ];
      
      // Calculate distance to each center
      const distancesToCenters = locationCenters.map(center => {
        const distance = calculateDistance(
          latitude, 
          longitude, 
          center.coordinates[0], 
          center.coordinates[1]
        );
        return { ...center, distance };
      });
      
      // Sort by distance
      distancesToCenters.sort((a, b) => a.distance - b.distance);
      
      // If the nearest center is within 5km
      if (distancesToCenters[0].distance <= 5) {
        const nearestLocation = distancesToCenters[0].name;
        
        // Fetch available slots from the API
        const response = await fetch(`${General.API_BASE_URL}api/slots/available/${nearestLocation}`);
        
        if (response.ok) {
          const slots = await response.json();
          setAvailableSlots(slots);
          
          if (slots.length === 0) {
            Alert.alert('Notice', 'There are no available pickup slots in your area at this time.');
          }
        } else {
          console.error('Failed to fetch slots');
          setAvailableSlots([]);
          Alert.alert('Error', 'Failed to fetch available slots. Please try again.');
        }
      } else {
        // No locations within 5km
        setAvailableSlots([]);
        Alert.alert('Notice', 'Sorry, we don\'t have pickup service in your area yet.');
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
      Alert.alert('Error', 'Failed to fetch available slots. Please try again.');
    } finally {
      setFetchingSlots(false);
    }
  };

  const detectCurrentLocation = async () => {
    setDetectingLocation(true);
    setLocationError(null);
    setSelectedSlot(''); // Reset selected slot
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationError('Permission to access location was denied');
        setDetectingLocation(false);
        return;
      }
      
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const { latitude, longitude } = currentLocation.coords;
      
      // Save coordinates for sending to backend
      setCoordinates({ latitude, longitude });
      
      const address = await getAddressFromCoordinates(latitude, longitude);
      
      if (address) {
        setLocation(address);
        
        // Fetch available slots based on location
        await fetchAvailableSlots(latitude, longitude);
      } else {
        setLocationError('Could not determine your address. Please enter manually.');
      }
    } catch (error) {
      console.error('Location detection error:', error);
      setLocationError('Failed to detect location. Please enter manually.');
    } finally {
      setDetectingLocation(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!location) {
      Alert.alert('Error', 'Please enter your pickup location');
      return;
    }
    
    if (!selectedSlot) {
      Alert.alert('Error', 'Please select a pickup slot');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Find the selected slot details
      const slotDetails = availableSlots.find(slot => slot._id === selectedSlot) || {};
      
      // Format the pickup slot as a single string like: "Sunday (10:00 AM - 1:00 PM)"
      const formattedSlot = slotDetails._id ? 
        `${slotDetails.day} (${formatTime(slotDetails.startTime)} - ${formatTime(slotDetails.endTime)})` : 
        selectedSlot;
      
      // Add location, coordinates, and pickup slot to the order data
      const finalOrderData = {
        ...orderData,
        pickupLocation: location,
        pickupSlot: formattedSlot,
        coordinates: coordinates, // Include coordinates if available
      };
      
      const response = await fetch(`${General.API_BASE_URL}api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalOrderData),
      });
      
      setIsLoading(false);
      
      if (response.ok) {
        const result = await response.json();
        Alert.alert(
          'Success', 
          'Your order has been placed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            }
          ]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to place order');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Order placement error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // When user manually edits the location, clear coordinates and slots
  const handleLocationChange = (text) => {
    setLocation(text);
    // Clear coordinates when user manually enters address
    if (coordinates) {
      setCoordinates(null);
      setAvailableSlots([]);
      setSelectedSlot('');
    }
  };

  // Format date to readable format
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return dateString;
    }
  };

  if (!orderData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No order data found. Please select items first.</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Checkout</Text>
        
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {orderData.items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View>
                <Text style={styles.cartItemText}>
                  {item.category} - {item.type}
                </Text>
                <Text style={styles.cartItemSubtext}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.cartItemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountText}>
              Total Amount: ${orderData.totalAmount}
            </Text>
          </View>
        </View>
        
        {/* Pickup Location */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pickup Location</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={[styles.input, styles.locationInput]}
              placeholder="Enter your address for pickup"
              value={location}
              onChangeText={handleLocationChange}
              multiline
            />
            <TouchableOpacity 
              style={styles.detectLocationButton}
              onPress={detectCurrentLocation}
              disabled={detectingLocation}
            >
              {detectingLocation ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.detectLocationText}>Detect</Text>
              )}
            </TouchableOpacity>
          </View>
          {locationError ? (
            <Text style={styles.errorText}>{locationError}</Text>
          ) : null}
          {coordinates ? (
            <Text style={styles.coordinatesText}>
              GPS coordinates detected: {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
            </Text>
          ) : null}
          <Text style={styles.locationHelpText}>
            Click "Detect" to use your current location or enter address manually
          </Text>
        </View>
        
        {/* Pickup Slot Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Pickup Slot</Text>
          
          {fetchingSlots ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#606c3b" />
              <Text style={styles.loadingText}>Fetching available slots...</Text>
            </View>
          ) : coordinates ? (
            availableSlots.length > 0 ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedSlot}
                  onValueChange={(itemValue) => setSelectedSlot(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a pickup slot" value="" />
                  {availableSlots.map((slot) => {
                    // Format the slot display text
                    const slotText = `${slot.day} (${formatTime(slot.startTime)} - ${formatTime(slot.endTime)})`;
                    return (
                      <Picker.Item 
                        key={slot._id} 
                        label={slotText}
                        value={slot._id} 
                      />
                    );
                  })}
                </Picker>
              </View>
            ) : (
              <View style={styles.noSlotsContainer}>
                <Text style={styles.noSlotsText}>
                  No pickup slots available in your area (5km radius). 
                  Please try a different location.
                </Text>
              </View>
            )
          ) : (
            <View style={styles.noSlotsContainer}>
              <Text style={styles.noSlotsText}>
                Please detect your location first to see available pickup slots.
              </Text>
            </View>
          )}
        </View>
        
        {/* Place Order Button */}
        <TouchableOpacity 
          style={[
            styles.placeOrderButton,
            (!selectedSlot || isLoading) && styles.disabledButton
          ]} 
          onPress={handlePlaceOrder}
          disabled={!selectedSlot || isLoading}
        >
          <Text style={styles.placeOrderButtonText}>
            {isLoading ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
        
        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3ee",
  },
  scrollContainer: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#a5bc64",
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#5d6839",
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2cb",
    marginBottom: 5,
  },
  cartItemText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#5d6839",
  },
  cartItemSubtext: {
    marginTop: 4,
    color: "#606c3b",
  },
  cartItemPrice: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#606c3b",
  },
  totalAmountContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#dee2cb",
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#5d6839",
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    backgroundColor: "#dee2cb",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#5d6839",
    minHeight: 100,
    textAlignVertical: 'top',
  },
  detectLocationButton: {
    backgroundColor: "#606c3b",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    minHeight: 50,
  },
  detectLocationText: {
    color: "#fdf9e1",
    fontWeight: "bold",
    fontSize: 14,
  },
  locationHelpText: {
    fontSize: 12,
    color: "#606c3b",
    marginTop: 5,
    fontStyle: 'italic',
  },
  coordinatesText: {
    fontSize: 12,
    color: "#606c3b",
    marginBottom: 5,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: "#dee2cb",
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    color: "#5d6839",
  },
  placeOrderButton: {
    backgroundColor: "#606c3b",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#a0a0a0",
  },
  placeOrderButtonText: {
    color: "#fdf9e1",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#dee2cb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  cancelButtonText: {
    color: "#5d6839",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    backgroundColor: "#dee2cb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#5d6839",
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#606c3b",
    fontSize: 14,
  },
  noSlotsContainer: {
    backgroundColor: "#dee2cb",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  noSlotsText: {
    color: "#5d6839",
    fontSize: 14,
    textAlign: 'center',
  }
});
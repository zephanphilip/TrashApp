import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useAuth } from '@clerk/clerk-react';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native'
import { General } from '../constants';

export default function Profile() {
    const {user} = useUser();
    const navigation = useNavigation()

    const {signOut, isSignedIn} = useAuth();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if(!isSignedIn)
            router.push("/");
    }, [isSignedIn]);

    const handleSubmitReview = async () => {
        if (review.trim() === '') {
            Alert.alert('Error', 'Please enter your review before submitting');
            return;
        }

        try {
            // Replace with your actual API endpoint
            const response = await fetch(`${General.API_BASE_URL}api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    userName: user?.fullName,
                    userEmail: user?.emailAddresses[0].emailAddress,
                    review: review,
                    rating: rating,
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Your review was submitted successfully!');
                setReview('');
                setRating(0);
                Keyboard.dismiss();
            } else {
                Alert.alert('Error', 'Failed to submit review. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            Alert.alert('Error', 'Something went wrong. Please check your connection and try again.');
        }
    };

    const Star = ({ filled, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <Text style={{ fontSize: 30, color: filled ? '#FFD700' : '#D3D3D3' }}>★</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <View style={styles.profileHeader}>
                            <Image
                                style={styles.profileImage}
                                source={{uri: user?.imageUrl}}
                            />
                            <Text style={styles.userName}>{user?.fullName}</Text>
                            <Text style={styles.detailText}>
                                {user?.emailAddresses[0].emailAddress}
                            </Text>
                        </View>

                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>Share Your Experience</Text>
                            
                            <View style={styles.ratingContainer}>
                                {[1, 2, 3, 4, 5].map(starIndex => (
                                    <Star 
                                        key={starIndex} 
                                        filled={starIndex <= rating}
                                        onPress={() => setRating(starIndex)}
                                    />
                                ))}
                            </View>
                            
                            <TextInput
                                style={styles.reviewInput}
                                placeholder="Tell us about your experience..."
                                multiline={true}
                                numberOfLines={4}
                                value={review}
                                onChangeText={setReview}
                            />
                            
                            <TouchableOpacity 
                                style={styles.submitButton} 
                                onPress={handleSubmitReview}
                            >
                                <Text style={styles.buttonText}>Submit Review</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.customerCare}
                            onPress={() => navigation.navigate('ChatWithAgent')}
                        >
                            <Text style={styles.buttonText}>Have Queries? Chat With Us!</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.signOutButton} 
                            onPress={async () => await signOut()}
                        >
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#5c6738',
    },
    userName: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    detailText: {
        color: '#333',
        marginTop: 5,
    },
    reviewContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    reviewInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#5c6738',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignSelf: 'center',
    },
    customerCare: {
        backgroundColor: '#5c6738',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 9,
        width: '100%',
    },
    signOutButton: {
        backgroundColor: 'darkred',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '100%',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});




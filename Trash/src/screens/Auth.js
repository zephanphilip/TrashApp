import React, { useEffect, useCallback } from 'react';
import { 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image,
  Animated 
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { SignedIn, SignedOut, useOAuth } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function EnhancedAuth() {
  useWarmUpBrowser();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow]);

  return (
    <LinearGradient 
      colors={['#5c6738', '#98caa4']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        
        <Animated.View 
          style={[
            styles.contentContainer, 
            { opacity: fadeAnim }
          ]}
        >
          <BlurView intensity={50} style={styles.blurContainer}>
            <SignedIn>
              <Image 
                source={require('../assets/images/success-icon.png')} 
                style={styles.successIcon}
              />
              <Text style={styles.signedInText}>Welcome Back!</Text>
              <TouchableOpacity 
                style={styles.signOutButton}
                onPress={() => {/* Implement sign out logic */}}
              >
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </SignedIn>

            <SignedOut>
              <Image 
                source={require('../assets/images/login-illustration.png')} 
                style={styles.illustration}
              />
              <Text style={styles.title}>Authentication</Text>
              <Text style={styles.subtitle}>
                Secure access to your personalized experience
              </Text>
              <TouchableOpacity 
                style={styles.googleButton} 
                onPress={onPress}
              >
                <Image 
                  source={require('../assets/images/google-icon.jpg')} 
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </SignedOut>
          </BlurView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  blurContainer: {
    width: width * 0.9,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    overflow: 'hidden',
  },
  illustration: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 30,
  },
  signedInText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#4285F4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';

const splash = () => {
  const opacity = useRef(new Animated.Value(1)).current; // Start with full opacity
  const router = useRouter();

  useEffect(() => {
    // Fade out after 6 seconds
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500, // Duration for fade-out
        useNativeDriver: true,
      }).start(() => {
        // Navigate to the next screen after animation
        router.push('/login'); // Replace './signup' with your actual route
      });
    }, 6000);

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [opacity, router]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/logo.mp4')} 
        style={styles.video}
        isMuted
        resizeMode={ResizeMode.CONTAIN} // Correct value from ResizeMode enum
        isLooping={false}
        useNativeControls={false} // Add native controls for debugging
        shouldPlay // Ensure the video starts playing
      />
      <Animated.View style={[styles.innerContainer, { opacity }]}>
        {/* Add text or other elements if needed */}
      </Animated.View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0000FF"
  },
  video: {
    width: width * 1.0, // Adjust width to fit video
    height: height * 1.1, // Adjust height to fit video
    position: 'absolute', // Position video correctly

  },
  innerContainer: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default splash;

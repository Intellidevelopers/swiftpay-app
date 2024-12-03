import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';

const Onboarding2 = () => {
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/2.png')} // Use the path to your uploaded image
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Content with Background Image */}
      <ImageBackground 
        source={require('../assets/images/bg.png')} 
        style={styles.bg}
        imageStyle={styles.imageBackgroundStyle} // This ensures cover property
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Start your</Text>
          <Text style={styles.subtitle}>MONEY TRANSFER</Text>

          <Text style={styles.listItem}>🌍 International Transfer</Text>
          <Text style={styles.listItem}>🏦 Multiple Account Transfer</Text>
          <Text style={styles.listItem}>💰 Single Bank Transfer</Text>
          <Text style={styles.listItem}>🏦 SwiftPay Bank Account Transfer</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding3')}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1400FB',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20
  },
  contentContainer: {
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#6666ff',
    marginTop: 40,
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 28,
    color: '#0000ff',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
    marginVertical: 15,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: '90%',
    alignSelf: "center"
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  bg: {
    flex: 1, // Ensures the background image covers the entire view
    justifyContent: 'space-between', // Space between content and button
  },
  imageBackgroundStyle: {
    resizeMode: 'cover', // Makes sure the image covers the entire area
    width: '100%', // Ensures the width is 100% of the screen
    height: '100%', // Ensures the height is 100% of the screen
  },
});

export default Onboarding2;

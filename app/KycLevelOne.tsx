import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { router } from 'expo-router';

const KycLevelOne = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null); // State for front image
  const [backImage, setBackImage] = useState<string | null>(null);   // State for back image

  // Function to pick an image from the gallery
  const pickImageFromGallery = async (setImage: (imageUri: string | null) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to take a picture using the camera
  const takePictureWithCamera = async (setImage: (imageUri: string | null) => void) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to show options to pick image from gallery or take picture
  const showImagePickerOptions = (setImage: (imageUri: string | null) => void) => {
    Alert.alert(
      'Select Document',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => takePictureWithCamera(setImage) },
        { text: 'Choose from Gallery', onPress: () => pickImageFromGallery(setImage) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>KYC Verification</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>National ID</Text>
        <Text style={styles.description}>Scan the front side of NID card</Text>
        <Image source={frontImage ? { uri: frontImage } : require('../assets/cards/sample-card1.png')} style={styles.card} />
        <TouchableOpacity style={styles.camera} onPress={() => showImagePickerOptions(setFrontImage)}>
          <AntDesign name='camerao' size={30} color={'#fff'} />
        </TouchableOpacity>

        <Text style={styles.description}>Scan the back side of NID card</Text>
        <Image source={backImage ? { uri: backImage } : require('../assets/cards/sample-card2.png')} style={styles.card} />
        <TouchableOpacity style={styles.camera} onPress={() => showImagePickerOptions(setBackImage)}>
          <AntDesign name='camerao' size={30} color={'#fff'} />
        </TouchableOpacity>

        <View style={styles.bottomPagination}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.nextButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>1/3</Text>
          <TouchableOpacity onPress={() => router.push('/KycLevelTwo')}>
            <Text style={styles.nextButton}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  content: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#808080',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: 300,
    height: 200, // Adjusted to maintain the aspect ratio of a typical card
    marginBottom: 20,
    borderRadius: 15, // Applied borderRadius for rounded corners
    resizeMode: 'cover', // Ensure the image covers the area with the same aspect ratio
    overflow: 'hidden', // Ensures the image does not overflow outside the rounded border
  },
  camera: {
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 30,
    top: -75,
    left: 120,
    marginBottom: -40,
  },
  bottomPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    gap: 100,
  },
  nextButton: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  pageText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: '#0000ff',
  },
});

export default KycLevelOne;

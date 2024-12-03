import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from '@rneui/themed';
import { router } from 'expo-router';
import { BackgroundImage } from 'react-native-elements/dist/config';

const ChangeSwiftPayTag: React.FC = () => {
  const navigation = useNavigation();
  const [swiftPayTag, setSwiftPayTag] = useState<string>('@ConnectBoy');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);


  const handleSaveChanges = () => {
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Header Text */}
      <Text style={styles.headerText}>Change SwiftPay Tag</Text>

      {/* Description */}
      <Text style={styles.descriptionText}>
        Your SwiftPay Tag is your unique tag for receiving money from other SwiftPay users.
      </Text>

      {/* Input for SwiftPay Tag */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={swiftPayTag}
          onChangeText={setSwiftPayTag}
          placeholder="SwiftPay Tag"
          keyboardType="default"
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>

      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
            <ImageBackground source={require('../assets/icons/background.png')} style={styles.tagBg} imageStyle={styles.imageStyle}>
            <Image source={require('../assets/icons/at.png')} style={styles.logo} />

            </ImageBackground>
          
          <Text style={styles.successBottomSheetHeader}>SwiftPay Tag Updated</Text>
          <Text style={styles.desc}>Let's go! your SwiftPay tag has been changed successfully you can now receive money from other SwiftPay users with your SwiftPay tag.</Text>

          <TouchableOpacity style={styles.nextButton} onPress={() => router.back()}>
            <Text style={styles.nextButtonText}>Okay got it.</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ChangeSwiftPayTag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10,
    width: 45
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 50,
    borderColor: '#31A6D9',
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#0000FF', // Blue color for the button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
  },
  logo:{
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    top: 40,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },  
  icon: {
    alignSelf: 'flex-end',
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  tagBg:{
    width: 360,
    alignSelf: "center",
    top: -20,
    borderRadius: 30,
    marginBottom: 40,
    resizeMode: "contain",
  },
  imageStyle:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: "center",

  }
});

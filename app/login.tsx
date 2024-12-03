import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router, useFocusEffect, useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Overlay } from 'react-native-elements';


// Custom Checkbox Component
const CustomCheckbox: React.FC<{ value: boolean; onValueChange: () => void }> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
      <Ionicons
        name={value ? 'checkbox' : 'square-outline'}
        size={24}
        color="#0000ff"
      />
    </TouchableOpacity>
  );
};

const login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const router = useRouter();

  const checkDeviceForBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Biometrics not supported', 'Your device does not support biometrics.');
      return;
    }

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      setBiometricType('Fingerprint');
    } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      setBiometricType('Face');
    }
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate with ${biometricType}`,
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      Alert.alert('Authenticated', `${biometricType} authentication successful!`);
      router.push('/(tabs)');
    } else {
      Alert.alert('Authentication failed', `Failed to authenticate using ${biometricType}.`);
      console.error(result.warning);
    }
  };

  React.useEffect(() => {
    checkDeviceForBiometrics();
  }, []);

  const validateEmail = (text: string) => {
    // Simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(text);
    setIsValidEmail(isValid);

    if (!isValid && text.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address.',
        position: 'bottom',
      });
    }
  };

  const validatePassword = (text: string) => {
    const isValid = text.length >= 6; // Example: password should be at least 6 characters long
    setIsValidPassword(isValid);

    if (!isValid && text.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Password must be at least 6 characters long.',
        position: 'bottom',
      });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleLogin = () => {
    if (!isValidEmail || !isValidPassword) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please enter valid email and password.',
        position: 'bottom',
      });
      return;
    }

    router.replace('./(tabs)');
  };

  const [visible, setVisible] = useState(true); // Modal visibility state
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation reference for opacity

  // Open modal with fade-in animation when navigating to the tab
  useFocusEffect(
    React.useCallback(() => {
      setVisible(true); // Ensure the modal remains visible when navigating back
      fadeIn();
      return () => fadeOut(); // Fade out when navigating away
    }, [])
  );

  // Fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Fade-out animation
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fully invisible
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    fadeOut(); 
    setVisible(false)
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logos/swiftpaylogo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Hello, Great! 👋</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Example@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
          />
          {isValidEmail === true && (
            <Ionicons name="checkmark-circle" size={24} color="green" style={styles.icon} />
          )}
          {isValidEmail === false && (
            <Ionicons name="close-circle" size={24} color="red" style={styles.icon} />
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordinput}
            placeholder="Type in password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity style={{ left: -40 }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          {isValidPassword === true && (
            <Ionicons name="checkmark-circle" size={24} color="green" style={styles.icon} />
          )}
          {isValidPassword === false && (
            <Ionicons name="close-circle" size={24} color="red" style={styles.icon} />
          )}
        </View>
      </View>

      <View style={styles.checkboxRow}>
        <CustomCheckbox value={rememberMe} onValueChange={() => setRememberMe(!rememberMe)} />
        <Text style={styles.checkboxLabel}>Remember Me</Text>
        <TouchableOpacity onPress={() => router.push('/ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.biometric} onPress={handleBiometricAuth}>
        <Image source={require('../assets/logos/fingerprint.png')} style={styles.Biometricimage} />
 
          <Text style={styles.biometricText}>Login using Biometric</Text>

      </TouchableOpacity>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10}}>
        <Text style={styles.biometricTitle}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.biometricText}>Signup</Text>
        </TouchableOpacity>
     </View>
      {/* Add Toast Component */}
      <Toast />
      {visible && (
  <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
    <Overlay
      isVisible={visible}
      overlayStyle={styles.modalOverlay}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalContent}>
        {/* Close Button */}
        <TouchableOpacity onPress={closeModal} style={{alignSelf: "flex-end", left: 30}}>
          <AntDesign name='closecircle' size={24} color='red' />
        </TouchableOpacity>

        <Image source={require('../assets/mock.png')} style={styles.mock} />
        <Text style={styles.modalTitle}>Personal Savings</Text>
        <Text style={styles.modalMessage}>
          Save with interest and get up to 20% increase annually.
        </Text>
        <TouchableOpacity style={styles.modalbutton}>
          <Text style={styles.modalbuttonText}>Save Now</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  </Animated.View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 117,
    height: 52,
    marginTop: 40,
  },
  label: {
    fontWeight: '500',
  },
  passwordinput: {
    width: '100%',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    marginRight: -4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  checkboxLabel: {
    marginLeft: 8,
    marginRight: 'auto',
  },
  forgotPassword: {
    marginLeft: 'auto',
    color: 'red',
  },
  biometric:{
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  Biometricimage:{
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10
  },
  biometricText:{
    fontSize: 16,
    color: "#0000ff",
    fontWeight: "500"
  },
  biometricTitle:{
    fontWeight: "500",
    fontSize: 16
  }, 
  // Modal Overlay
  modalOverlay: {
    width: '90%',
    backgroundColor: '#e3e9fd',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    width: 220
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mock:{
    width: 200,
    height: 200,
    resizeMode: "contain"
  },
  modalbutton:{
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: 250
  },
  modalbuttonText:{
    color: '#fff',
    fontSize: 16,
  }
});

export default login;

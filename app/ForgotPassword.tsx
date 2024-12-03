import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router, useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';


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

const ForgotPassword: React.FC = () => {
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

  const handleForgotPassword = () => {
    if (!isValidEmail) {
      Toast.show({
        type: 'error',
        text1: 'Forgot Password Failed',
        text2: 'Please enter valid email and password.',
        position: 'bottom',
      });
      return;
    }

    router.replace('/resetOtp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logos/swiftpaylogo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Forgot Password</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      
   
      <Toast />
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
  }
});

export default ForgotPassword;

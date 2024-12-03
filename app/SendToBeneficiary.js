import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract only the necessary details from route.params
  const { name, swiftpayTag, image } = route.params || {};  // optional chaining to avoid undefined errors

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transfer to Swiffpay Account</Text>
      </View>

      <View style={styles.beneficiaryContainer}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <Text style={styles.beneficiaryName}>{name}</Text>
        <Text style={styles.beneficiaryTag}>{swiftpayTag}</Text>
      </View>

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} placeholder="10,000" keyboardType="numeric" />

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} placeholder="What is this for?" />

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 13,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 30, // to balance the back button width
  },
  beneficiaryContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  beneficiaryName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  beneficiaryTag: {
    fontSize: 16,
    color: '#888',
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#0000FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 50
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label:{
    fontSize: 16,
    fontWeight: "500"
  }
});

export default PaymentScreen;

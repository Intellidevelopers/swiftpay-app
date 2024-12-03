import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const TransferScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: "center", marginBottom: 20}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Transfer to Swiffpay Account</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/icons/user.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Adeagbo Josiah Developer</Text>
        <Text style={styles.profileUsername}>@ajSoftware50</Text>
      </View>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="10,000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Remark</Text>
      <TextInput
        style={styles.input}
        placeholder="What is this for"
      />

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: -4,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 45,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileUsername: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  confirmButton: {
    backgroundColor: '#0047FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 70
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label:{
    fontWeight: "500",
    marginBottom: 5
  }
});

export default TransferScreen;

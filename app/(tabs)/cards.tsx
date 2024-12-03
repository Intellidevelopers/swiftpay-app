import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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

const cards = () => {
  const [isSelected, setSelection] = React.useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Card Order</Text>

      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={styles.cardContainer}>
        <Image source={require('../../assets/images/card.png')} style={styles.cardImage} />
      </View>

      <View style={styles.bankHeader}>
        <Image source={require('../../assets/icons/bolt.png')} style={styles.bankImage} />
        <View style={{ marginRight: 30 }}>
          <Text style={styles.methodTitle}>Instant Access</Text>
          <Text style={styles.methodSubtitle}>Instant activation once card is issued</Text>
        </View>
      </View>

      <View style={styles.bankHeader}>
        <Image source={require('../../assets/icons/safety_check.png')} style={styles.bankImage} />
        <View style={{ marginRight: 30 }}>
          <Text style={styles.methodTitle}>Easy online purchase</Text>
          <Text style={styles.methodSubtitle}>Accepted by both local and international merchants.</Text>
        </View>
      </View>

      <View style={styles.bankHeader}>
        <Image source={require('../../assets/icons/lock.png')} style={styles.bankImage} />
        <View style={{ marginRight: 30 }}>
          <Text style={styles.methodTitle}>Security</Text>
          <Text style={styles.methodSubtitle}><Text style={styles.bold}>CBN</Text> licensed, <Text style={styles.bold}>NDIC</Text> issued</Text>
        </View>
      </View>

      <View style={styles.checkboxRow}>
        <CustomCheckbox value={rememberMe} onValueChange={() => setRememberMe(!rememberMe)} />
        <Text style={styles.checkboxLabel}>I have accepted the <TouchableOpacity onPress={() => router.push('/Terms')}><Text style={styles.bold}>Terms and Conditions</Text></TouchableOpacity></Text>
      </View>

      <TouchableOpacity style={styles.getNowButton}>
        <Text style={styles.getNowButtonText}>Get Now</Text>
      </TouchableOpacity>
      </ScrollView>
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
    top: 50,
    left: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 40,
  },
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 300,
    height: 180,
    marginBottom: 20,
  },
  cardDetails: {
    alignItems: 'center',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 14,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 10,
  },
  link: {
    color: '#0047FF',
    textDecorationLine: 'underline',
  },
  getNowButton: {
    backgroundColor: '#0047FF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  getNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  forgotPassword: {
    marginLeft: 'auto',
    color: 'red',
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    marginTop: -20,
  },
  methodItem: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  methodName: {
    fontSize: 16,
    color: '#000',
    fontWeight: "500",
  },
  bankImage: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: "#555"
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  bold:{
    color: "#0000ff",
    fontWeight: "900"
  }
});

export default cards;

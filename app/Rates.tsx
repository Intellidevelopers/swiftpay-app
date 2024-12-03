import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Rates = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
        <View style={{alignItems: "center", marginBottom: 20}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Rates</Text>

      </View>


        <Text style={styles.description}>
        Here are all the official rates for conversion for both Currency pairs and Crypto.
        </Text>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Pairs</Text>
        {renderRateItem('USD to Naira', '1 USD = 1,540 Naira', require('../assets/icons/dollar.png'))}
        {renderRateItem('Euro to Naira', '1 EUR = 1,540 Naira', require('../assets/icons/euro.png'))}
        {renderRateItem('Pounds to Naira', '1 GBP = 1,540 Naira', require('../assets/icons/pounds.png'))}
        {renderRateItem('Pounds to USD', '1 GBP = 1.348786 USD', require('../assets/icons/pounds.png'))}
        </View>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crypto Exchange</Text>
        {renderRateItem('Bitcoin', '1 BTC = 1,234,445,789 Naira', require('../assets/icons/btc.png'))}
        {renderRateItem('Ethereum', '1 ETH = 1,234,445,789 Naira', require('../assets/icons/ethereum.png'))}
        {renderRateItem('USDT', '1 USDT = 1,454 Naira', require('../assets/icons/tether.png'))}
        </View>
    </View>
  );
};

const renderRateItem = (title: string, rate: string, icon: any) => (
  <View style={styles.rateItem}>
    <Image source={icon} style={styles.rateIcon} />
    <View style={styles.rateItemContent}>
      <Text style={styles.rateText}>{title}</Text>
      <Text style={styles.rateValue}>{rate}</Text>
    </View>
  </View>
);

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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rateItemContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: "left",

  },
  rateIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  rateText: {
    fontSize: 16,
    fontWeight: '700',
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
});

export default Rates;

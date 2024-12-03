import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Notification = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={{alignItems: "center", marginBottom: 20}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
        <AntDesign name="arrowleft" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Notification</Text>
      </View>


        <View style={styles.section}>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/tether.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Crypto Exchange</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/coinbase.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Crypto Exchange</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/tether.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Bureau` de Change</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/btc.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Crypto Exchange</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/ethereum.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Bureau` de Change</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
            <View style={styles.rateItem}>
                <Image source={require('../assets/icons/bitpay.png')} style={styles.rateIcon} />
                <View style={styles.rateItemContent}>
                <Text style={styles.rateText}>Crypto Exchange</Text>
                <Text style={styles.rateValue}>Exchange of 23 Lite coin to 123USDT...</Text>
                </View>
            </View>
        </View>
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
    padding: 8

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
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
  },
});

export default Notification;

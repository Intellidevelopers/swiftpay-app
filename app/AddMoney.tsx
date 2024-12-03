import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AddMoney = () => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Money</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.bankHeader}>
            <Image source={require('../assets/icons/bank.png')} style={styles.bankImage} />
            <View style={{ marginRight: 30 }}>
              <Text style={styles.methodTitle}>Bank Transfer</Text>
              <Text style={styles.methodSubtitle}>Add money via mobile or internet banking.</Text>
            </View>
            <AntDesign name='right' size={18} />
          </View>
          <Text style={styles.desc}>SwiftPay Account Number</Text>
          <Text style={styles.accountNumber}>095 766 5436</Text>
          <Text style={styles.bankName}>Bank Name</Text>
          <Text style={styles.banname}>Wema Bank PLC</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.copyButton}>
              <FontAwesome name='clipboard' size={18} color={"white"} />
              <Text style={styles.buttonText}>Copy Number</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name='share-outline' size={18} color={"#0000ff"} />
              <Text style={styles.sharebuttonText}>Share Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.methodList}>
          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/flutterwave.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>Flutter Wave</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/paypal.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>Pay with PayPal</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/crypto.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>Deposit with Crypto</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>
          <Text style={styles.methodHead}>Crypto Payment Method</Text>

          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/bitcoin.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>USDT</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/bitcoin.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>BTC</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/ethereum.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>ETH</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodItem}>
            <View style={styles.flex}>
              <Image source={require('../assets/icons/enjin.png')} style={styles.bankImage} />
              <Text style={styles.methodName}>BNB</Text>
            </View>
            <AntDesign name='right' size={18} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30
  },
  backButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 15,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 30,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  accountNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bankName: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copyButton: {
    backgroundColor: '#0047FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  shareButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#0000ff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'medium',
  },
  sharebuttonText: {
    color: '#0000ff',
    fontWeight: 'medium',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7D7D7D',
    marginVertical: 20,
  },
  methodList: {},
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
    width: 40,
    height: 40,
    marginRight: 20,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 10,
    marginTop: -20,
  },
  desc: {
    color: "#666",
  },
  banname: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    backgroundColor: "#ccc",
    height: 1,
    width: '30%',
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodHead: {
    fontWeight: "700",
    fontSize: 18
  },
});

export default AddMoney;

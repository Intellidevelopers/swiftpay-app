import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Transfer = () => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Bank Transfer</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.bankHeader}>
            <Image source={require('../assets/icons/number.png')} style={styles.bankImage} />
            <View style={{ marginRight: 30 }}>
              <Text style={styles.methodSubtitle}>SwiftPay Account Number</Text>
              <Text style={styles.methodTitle}>095 766 5436</Text>
            </View>
          </View>
          <View style={styles.bankHeader}>
            <Image source={require('../assets/icons/banking.png')} style={styles.bankImage} />
            <View style={{ marginRight: 30 }}>
              <Text style={styles.methodSubtitle}>Bank</Text>
              <Text style={styles.methodTitle}>Access Bank</Text>
            </View>
          </View>

          <View style={styles.bankHeader}>
            <Image source={require('../assets/icons/user.png')} style={styles.bankImage} />
            <View style={{ marginRight: 30 }}>
              <Text style={styles.methodSubtitle}>Name</Text>
              <Text style={styles.methodTitle}>Osemudiamen Great</Text>
            </View>
          </View>
        </View>

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


          <View style={styles.stepcard}>
          <Text style={styles.subtext}>Add Money Via Bank Transfer In Just 3 Steps</Text>

          <View style={styles.steps}>
            <View style={styles.stepHead}>
              <Text style={styles.step}>
               1. Copy the account details above- 0957665436 is your
                SwiftPay Account Number.
              </Text>
            </View>
          </View>
          <View style={styles.steps}>
            <View style={styles.stepHead}>
              <Text style={styles.step}>2. Open the desired bank app you want to transfer money from.</Text>
            </View>
          </View>

          <View style={styles.steps}>
            <View style={styles.stepHead}>
              <Text style={styles.step}>3. Transfer the details amount to your SwiftPay Wallet.</Text>
            </View>
          </View>
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
  },
  backButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    padding: 10,
    marginRight: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: "center"
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
  stepcard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 20,
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
    marginBottom: 40
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
    fontWeight: "500",
  },
  subtext:{
    marginBottom: 20,
    alignSelf: "flex-start",
    fontWeight: "700"
  },
  step:{
    color: "#666",
    textAlign: "left",
    alignSelf: "flex-start",
    fontWeight: "400"
  },
  steps:{
    marginBottom: 10
  },
  stepHead:{
    flexDirection: "row",
    alignItems: "center",

  }
});

export default Transfer;

// Path: src/screens/ReceiptScreen.tsx

import { AntDesign, Feather } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Receipt: React.FC = () => {
    const handleConfirmPayment = () => {
        setIsSuccessVisible(true); // Show the success bottom sheet
      };
      const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Share Receipt</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
            <Feather name="x" size={24} color="#000" />
          </TouchableOpacity>
        </View>

      <ScrollView>
        {/* Main Receipt Content */}
      <View style={styles.receiptContainer}>
        {/* SwiftPay Logo */}
        <View style={styles.headItems}>
            <Image source={require('../assets/logos/swiftpaylogo.png')} style={styles.logo} />
            <Text style={styles.label}>Transaction Receipt</Text>
        </View>

        {/* Amount and Status */}
       <View style={styles.balanceContainer}>
        <Text style={styles.amount}>N24,679.00</Text>
            <Text style={styles.status}>Success</Text>
            <Text style={styles.date}>April 12, 2024, 12:45</Text>
       </View>

        <View style={styles.separator} />

        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.detailsLabel}>Transaction Type</Text>
            <Text style={styles.detailsValue}>Swiftpay Transfer</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.detailsLabel}>Swiftpay Tag</Text>
            <Text style={styles.detailsValue}>@Greatmen89</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.detailsLabel}>Recipient Details</Text>
            <Text style={styles.detailsValue}>Great Osaumudiamen{'\n'}<Text style={styles.label}>Wema Bank | 09876545</Text></Text>
          </View>

         <View style={styles.row}>
            <Text style={styles.detailsLabel}>Sender Details</Text>
            <Text style={styles.detailsValue}>Segun Arinze</Text>
         </View>

          <View style={styles.row}>
            <Text style={styles.detailsLabel}>Remark</Text>
            <Text style={styles.detailsValue}>Part Payment</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.detailsLabel}>Transaction Reference</Text>
            <Text style={styles.detailsValue}>3546657654343244</Text>
          </View>
        </View>
      </View>
      <Image source={require('../assets/images/dots.png')} style={styles.dot}/>
       {/* Share and Report Buttons */}
       <TouchableOpacity style={styles.shareButton} onPress={handleConfirmPayment}>
          <Text style={styles.shareButtonText}>Share Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.reportIssueText}>Report an Issue</Text>
        </TouchableOpacity>
      </ScrollView>

        <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
          
          <Image source={require('../assets/icons/receipt.png')} style={styles.logo} />
          <Text style={styles.successBottomSheetHeader}>Share Receipt as</Text>

         <View style={styles.shareBtnContainer}>
            <TouchableOpacity style={styles.shareBtn}>
                <Image source={require('../assets/icons/pdf.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
                <Image source={require('../assets/icons/jpg.png')} style={styles.icon}/>
            </TouchableOpacity>
         </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  receiptContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#EAF5FF',
    borderRadius: 12,
  },
  logo:{
    width: 70,
    height: 70,
    resizeMode: "contain",
    alignSelf: "center"
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#12B886',
    marginVertical: 8,
  },
  status: {
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
    fontWeight: "600"
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  separator: {
    width: '100%',
    marginVertical: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#d7d7d7"
  },
  detailsContainer: {
    width: '100%',
  },
  detailsLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  detailsValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    fontWeight: "500"
  },
  shareButton: {
    width: '90%',
    padding: 14,
    backgroundColor: '#0000ff',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    alignSelf: "center"
  },
  shareButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  reportIssueText: {
    fontSize: 16,
    color: '#0000ff',
    textAlign: 'center',
    marginBottom: 20
  },
  headItems:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  balanceContainer:{
    alignItems: "center",
    justifyContent: "center"
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  dot:{
    marginTop: -38,
    width: 400,
    height: 20,
    alignSelf: "center",
    marginBottom: 20,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 10
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50,
  },
  label:{
    color: "#888",
    fontWeight: "400"
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetTitle: {
    fontSize: 15,
    fontWeight: '700',
    left: 96,
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
  },
  successBottomSheetText: {
    fontSize: 14,
    marginBottom: 20,
    alignItems: "center",
    fontWeight: "600"
  },
  successBottomSheetHeader:{
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20
  },
  successBottomSheetHeaderP:{
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30
  },
  successBottomSheetContainer:{
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginBottom: 20
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
  icon:{
    width: 60,
    height: 60,
    resizeMode: "contain",
    alignSelf: "flex-start"
  },
  shareBtnContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20
  },
  shareBtn:{
    backgroundColor: "#E1F0FF",
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});

export default Receipt;

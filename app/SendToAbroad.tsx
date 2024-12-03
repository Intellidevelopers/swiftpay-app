import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView, Share } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SendToAbroad = () => {
  // Sample data for recent transactions
  const transactions = [
    { id: '1', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Sent', statusColor: 'green' },
    { id: '2', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Pending', statusColor: 'orange' },
    { id: '3', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Failed', statusColor: 'red' },
    { id: '4', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Sent', statusColor: 'green' },
    { id: '5', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Pending', statusColor: 'orange' },
    { id: '6', name: 'Ose Ose', phone: '9839823930832', amount: '+$200', status: 'Failed', statusColor: 'red' },
  ];

  const renderTransactionItem = ({ item }: any) => (
    <View style={styles.transactionItem}>
      <Image source={require('../assets/images/user1.png')} style={styles.profileImage} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionPhone}>{item.phone}</Text>
      </View>
      <View style={styles.transactionAmountContainer}>
        <Text style={[styles.transactionAmount, { color: item.statusColor }]}>{item.amount}</Text>
        <Text style={[styles.transactionStatus, { color: item.statusColor }]}>{item.status}</Text>
      </View>
    </View>
  );

    // Function to share the referral link
    const shareReferralLink = async () => {
      try {
        const result = await Share.share({
          message: 'Join SwiftPay and start sending money internationally with ease! Use my referral link to sign up: https://swiftpay.com/referral-code',
          title: 'SwiftPay Referral'
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Activity type on iOS
          } else {
            // Shared successfully
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error sharing referral link:', error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    };

  return (
    <ScrollView style={styles.container}>
      {/* Dashboard Card */}
      <ImageBackground
        source={require('../assets/abroad.png')} // Background image for the card
        style={styles.dashboardCard}
        imageStyle={{ borderRadius: 10, alignSelf: "flex-end", left: 220, width: '35%', height: '35%', top: 5, resizeMode: 'contain' }}
      >
        <View style={styles.dashboardContent}>
          <View style={styles.flexTitle}>
          <View>
            <Text style={styles.balanceTitle}>SwiftPay Balance</Text>
            <Text style={styles.subTitle}>International Transfers</Text>
          </View>
          </View>
          <View style={styles.flex}>
            <Text style={styles.balanceAmount}>₦2000</Text>
            <TouchableOpacity style={styles.depositButton} onPress={() => router.push('/AddMoney')}>
                <Text style={styles.depositButtonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionVolumeContainer}>
            <Text style={styles.transactionVolumeTitle}>Transaction Volume</Text>
            <View style={styles.flexVolume}>
            <Text style={styles.subttext}>Total Transfer</Text>
            <Text style={styles.transactionVolumeAmount}>$200</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/TransferAbroad')}>
              <Ionicons name="paper-plane-outline" size={16} color="#000" />
              <Text style={styles.actionButtonText}>Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={shareReferralLink}>
              <MaterialCommunityIcons name="call-received" size={16} color="#000" />
              <Text style={styles.actionButtonText}>Receive Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Recent Transactions */}
      <Text style={styles.recentTransactionTitle}>Recent Transaction</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        style={styles.transactionList}
      />
    </ScrollView>
  );
};

export default SendToAbroad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  dashboardCard: {
    width: '100%',
    height: 300,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#0000ff",
    marginTop: 40,
    resizeMode: 'contain'
  },
  dashboardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
  },
  balanceAmount: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  depositButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  depositButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0000ff',
  },
  transactionVolumeContainer: {
    backgroundColor: '#1FF4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: "column",
  },
  transactionVolumeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  transactionVolumeAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  recentTransactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#0000ff',
    width: 160,
    borderRadius: 5
  },
  transactionList: {
    marginTop: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontWeight: 'bold',
  },
  transactionPhone: {
    color: '#888',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontWeight: 'bold',
  },
  transactionStatus: {
    fontSize: 12,
  },
  flex:{
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10,
    gap: 20,
    marginTop: -20
  },
  logo:{
    width: 100,
    height: 100,
    resizeMode: 'contain'  // or 'cover' or'scale-down'
  },
  flexTitle:{
    flexDirection: 'row',
    justifyContent:'space-between',
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  flexVolume:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: "center"
  },
  subttext:{
    fontSize: 14,
    color: '#fff',
  }
});

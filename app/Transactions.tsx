import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheet } from '@rneui/themed';
import { router } from 'expo-router';

interface Transaction {
  id: string;
  type: string;
  amount: string;
  date: string;
  rate: string;
  status: 'Rejected' | 'Pending' | 'Completed';
}

const transactions: Transaction[] = [
  { id: '1', type: 'Buy - Australia Apple/......', amount: '+ N24,000.00', date: 'Mon Apr 22nd, 2024', status: 'Rejected', rate: 'N480.00 / $' },
  { id: '2', type: 'Buy - Australia Apple/......', amount: '+ N24,000.00', date: 'Mon Apr 22nd, 2024', status: 'Rejected', rate: 'N480.00 / $' },
  { id: '3', type: 'Transfer to Adeagbo...', amount: '- N98,999.00', date: 'Mon Apr 22nd, 2024', status: 'Completed', rate: 'N480.00 / $' },
  { id: '4', type: 'Sell - Amazon Gift Card', amount: '- N12,000.00', date: 'Tue Apr 23rd, 2024', status: 'Pending', rate: 'N480.00 / $' },
  { id: '5', type: 'Adebayo Abefe - Interbank', amount: '- N12,000.00', date: 'Tue Apr 23rd, 2024', status: 'Completed', rate: 'N480.00 / $' },
  { id: '6', type: 'Swiftpay to Swiftpay', amount: '+ N24,000.00', date: 'Mon Apr 22nd, 2024', status: 'Completed', rate: 'N480.00 / $' },
  { id: '7', type: 'Crypto Payment - Bitcoin', amount: '- N12,000.00', date: 'Tue Apr 23rd, 2024', status: 'Pending', rate: 'N480.00 / $' },
];

const filterOptions = ['All', 'Buy Gift Card', 'Sell Gift Card', 'Crypto Currency Payment', 'Interbank', 'Swiftpay to Swiftpay'];

const Transactions: React.FC = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null); // State to hold selected transaction

  const handlePreview = (transaction: Transaction) => {
    setSelectedTransaction(transaction); // Set the selected transaction
    setIsPreviewVisible(true); // Show the preview bottom sheet
  };

  const filterTransactions = transactions.filter((transaction) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Buy Gift Card') return transaction.type.includes('Buy');
    if (selectedFilter === 'Sell Gift Card') return transaction.type.includes('Sell');
    if (selectedFilter === 'Crypto Currency Payment') return transaction.type.includes('Crypto');
    if (selectedFilter === 'Interbank') return transaction.type.includes('Interbank');
    if (selectedFilter === 'Swiftpay to Swiftpay') return transaction.type.includes('Swiftpay');
    return false;
  });

  const renderTransaction = ({ item }: { item: Transaction }) => {
    let iconSource;
    if (item.type.includes('Buy')) {
      iconSource = require('../assets/icons/apple.png');
    } else if (item.type.includes('Sell')) {
      iconSource = require('../assets/icons/amazon.png');
    } else if (item.type.includes('Interbank')) {
      iconSource = require('../assets/icons/bank.png');
    } else if (item.type.includes('Swiftpay to Swiftpay')) {
      iconSource = require('../assets/icons/swift.png');
    } else if (item.type.includes('Crypto')) {
      iconSource = require('../assets/icons/btc.png');
    } else {
      iconSource = require('../assets/icons/swift.png'); // Default icon
    }

    return (
      <TouchableOpacity style={styles.transactionContainer} onPress={() => handlePreview(item)}>
        <View style={styles.transactionInfo}>
          <Image source={iconSource} style={styles.icon} />
          <View>
            <Text style={styles.transactionType}>{item.type}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
          <Text style={[styles.transactionStatus, styles[`status${item.status}`]]}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transactions</Text>
        <View style={styles.placeholder} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setIsFilterVisible(true)}>
        <Text style={styles.buttonText}>{selectedFilter}</Text>
        <AntDesign name="down" size={12} color="black" />
      </TouchableOpacity>

      <BottomSheet isVisible={isFilterVisible} onBackdropPress={() => setIsFilterVisible(false)}>
        <View style={styles.bottomSheetContent}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedFilter(option);
                setIsFilterVisible(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>

      <FlatList
        data={filterTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Preview Bottom Sheet */}
      <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
        {selectedTransaction && (
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <View>
                <Text style={styles.bottomSheetTitle}>Transaction Details</Text>
                <Text style={styles.bottomSheetSubTitle}>Here is a detailed breakdown of this transaction</Text>
              </View>
              <TouchableOpacity onPress={() => setIsPreviewVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
            </View>

            {/* Dynamically rendered icon */}
            <View style={styles.paymentDetailsContainer}>
              <View style={styles.row}>
                <Image
                  source={
                    selectedTransaction.type.includes('Buy')
                      ? require('../assets/icons/apple.png')
                      : selectedTransaction.type.includes('Sell')
                      ? require('../assets/icons/amazon.png')
                      : selectedTransaction.type.includes('Interbank')
                      ? require('../assets/icons/bank.png')
                      : selectedTransaction.type.includes('Swiftpay to Swiftpay')
                      ? require('../assets/icons/swift.png')
                      : selectedTransaction.type.includes('Crypto')
                      ? require('../assets/icons/btc.png')
                      : require('../assets/icons/swift.png')
                  }
                  style={styles.icon}
                />
                <Text style={styles.value}>{selectedTransaction.type}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{selectedTransaction.date}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Transaction Type</Text>
                <Text style={styles.value}>{selectedTransaction.type}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Rate</Text>
                <Text style={styles.value}>{selectedTransaction.rate}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.reject}>{selectedTransaction.status}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.value}>{selectedTransaction.amount}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Reference</Text>
                <Text style={styles.value}>CY98690864556YG</Text>
              </View>
            </View>
            <Text style={styles.reject}>Reason for Rejection</Text>
            <Text style={styles.warning}>
              Invalid: The image attached does not correspond with the selected trade.
            </Text>

            <Text style={styles.report}>Report an Issue</Text>
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#eeeeee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: '500',
  },
  dropdown: {
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 16,
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "500"
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 16,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
  },
  transactionDetails: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionStatus: {
    fontSize: 14,
  },
  statusRejected: {
    color: 'red',
  },
  statusPending: {
    color: 'orange',
  },
  statusCompleted: {
    color: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#777',
    flex: 1, // Take up equal space on the left
    textAlign: 'left', // Align the text to the left
  },
  value: {
    fontSize: 14,
    color: '#000',
    flex: 1, // Take up equal space on the right
    textAlign: 'right', // Align the text to the right
    fontWeight: '400',
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '500',
    left: 80,
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
  },
  successBottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: "center"
  },
  successBottomSheetTextgreen: {
    fontSize: 16,
    marginBottom: 10,
    alignItems: "center",
    color: "#00952A",
    fontWeight: "700"
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700"
  },
  bottomSheetSubTitle:{
    color: "#666",
    textAlign: "center",
    left: 10
  },
  reject:{
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5
  },
  warning:{
    color: "#666",
    textAlign: "center",
    marginBottom: 10
  },
  report:{
    textAlign: "center",
    fontSize: 16,
    color: "#0000ff",
    fontWeight: "500",
    textDecorationLine: "underline"
  },
  paymentDetailsContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default Transactions;

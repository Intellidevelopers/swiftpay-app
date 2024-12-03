import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const CardScreen: React.FC = () => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [quantity, setQuantity] = useState(2); // Initial quantity set to 2

  const navigation = useNavigation();

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevents quantity from going below 1
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Airbnb US</Text>
        <View style={styles.placeholder} />
      </View>
      <Text style={styles.subHeader}>Please provide the information below</Text>

      <Text style={styles.label}>Amount</Text>
      <View style={styles.row}>
        <TextInput placeholder="$250" style={styles.inputQuantity} />
        <TouchableOpacity style={styles.balanceContainer}>
          <Text style={styles.balance}>₦ 4,890.00</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.minAmountText}>Minimum amount is $20</Text>

      <Text style={styles.label}>Quantity</Text>
      <View style={styles.row}>
        <TextInput 
          style={styles.inputQuantity} 
          value={String(quantity)} 
          keyboardType="numeric" 
          onChangeText={(text) => setQuantity(Number(text))}
        />
        <View style={styles.quantityControls}>
          <TouchableOpacity style={styles.controlButton} onPress={decreaseQuantity}>
            <AntDesign name="minus" size={18} />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity style={styles.controlButton} onPress={increaseQuantity}>
            <AntDesign name="plus" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <View style={styles.row2}>
          <Text style={styles.balanceLabel}>Swiftpay Balance</Text>
          <Text style={styles.balanceAmount}>
            {isBalanceHidden ? '$ ******' : '$ 2,345.98'}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleBalanceVisibility}>
          <AntDesign name={isBalanceHidden ? 'eyeo' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/PaymentOption')}>
        <Text style={styles.buttonText}>Proceed</Text>
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
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  amountBox: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0035FF',
  },
  minAmountText: {
    fontSize: 12,
    color: '#0000ff',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    paddingHorizontal: 10,
    padding: 8,
    borderColor: "#eee",
    borderRadius: 10
  },
  inputQuantity: {
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    gap: 15,
    borderRadius: 15,
    padding: 8
  },
  controlButton: {
  },
  controlButtonText: {
    fontSize: 25,
    color: '#555',
  },
  balanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
  },
  balanceText: {
    fontSize: 16,
    color: '#4B4B4B',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#0035FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  placeholder: {
    width: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600"
  },
  label:{
    fontSize: 16,
  },
  balanceContainer:{
    backgroundColor: "#E5F6FF",
    paddingHorizontal: 10,
    padding: 3,
    borderRadius: 15
  },
  balance:{
    color: "#0000ff",
    fontSize: 16,
    fontWeight: "600"
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  note: {
    color: '#1400fb',
    fontSize: 15,
    marginBottom: 20,
  },
  row2: {
    flexDirection: 'column',
  },
});

export default CardScreen;

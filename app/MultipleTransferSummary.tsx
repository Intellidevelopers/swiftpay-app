import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';

const users = [
  { id: 1, name: 'Segun Oseni', image: require('../assets/icons/user1.png') },
  { id: 2, name: 'Tunde Onokoya', image: require('../assets/icons/user2.png') },
  { id: 3, name: 'Another User', image: require('../assets/icons/user3.png') },
];

const MultipleTransferSummary = () => {

  const [swiftPayTag, setSwiftPayTag] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');

  // State to manage tab selection
  const [selectedTab, setSelectedTab] = useState('Recent'); // Default to 'Recent'

  // State variables for bottom sheet visibility
  const [isPaymentSummaryVisible, setIsPaymentSummaryVisible] = useState(false);
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleNext = () => {
    setIsPaymentSummaryVisible(true); // Show the payment summary bottom sheet
  };

  const handlePay = () => {
    setIsPaymentSummaryVisible(false); // Hide the payment summary bottom sheet
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet
  };

  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    // Set OTP value at the current index
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input
    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Move to the previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transfer to Multiple Banks</Text>
      </View>
      {/* Total Amount */}
      <Text style={styles.amountText}>₦ 1,767,986.00</Text>

      {/* Transfer Details Card */}
      <View style={styles.card}>
        <View style={styles.userInfo}>
          {/* Stacked User Images */}
          <View style={styles.imageContainer}>
            <Image source={users[0].image} style={[styles.userImage, styles.userImage1]} />
            <Image source={users[1].image} style={[styles.userImage, styles.userImage2]} />
            <Image source={users[2].image} style={[styles.userImage, styles.userImage3]} />
          </View>
          <View>
          <Text style={styles.userNames}>Segun Oseni, Tunde On... <Text style={{color: "#0000ff"}}>+8 others</Text></Text>
          <Text style={styles.bankInfo}>Access Bank, Wema Bank, 12 others</Text>
          </View>
        </View>

        {/* Transfer Information */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Multiple Transfer</Text>
          <Text style={styles.value}>Osemudiamen Great</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>4,680.00 NGN</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Multiple transfer fee</Text>
          <Text style={styles.value}>23.98 NGN</Text>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentLabel}>Payment Method</Text>
        <View style={styles.paymentCard}>
          <View>
          <Text style={styles.balanceText}>Swiftpay Balance</Text>
          <Text style={styles.balanceAmount}>$ 2,345.98</Text>
          </View>
          <AntDesign name="checkcircle" size={24} color="green" />
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>

      
      <BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Complete Payment</Text>
              <TouchableOpacity onPress={() => setIsTransactionPinVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
            </View>
          <Text style={styles.successBottomSheetHeader}>Enter Pin</Text>
      <Text style={styles.desc}>Enter pin to complete transaction</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0} // Auto-focus the first input
                />
              ))}
            </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleConfirmPayment}>
            <Text style={styles.nextButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
          
          <Image source={require('../assets/icons/success.png')} style={styles.logo} />
          <Text style={styles.successBottomSheetHeader}>Multiple Transfer Successful</Text>
      <Text style={styles.desc}>Your transfer to multiple accounts for N4,890.00 is successful</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/Receipt')}>
            <Text style={styles.nextButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MultipleTransferSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    gap: 40
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 100,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerText2: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: "#009329",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  amountText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  imageContainer: {
    position: 'relative',
    width: 70, // Adjust the width based on image size and overlap
    height: 40, // Adjust the height based on image size and overlap
    marginRight: -15,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
  },
  userImage1: {
    top: 0,
    left: 0,
  },
  userImage2: {
    top: 10,
    left: 15,
  },
  userImage3: {
    top: 15,
    left: 0,
  },
  userNames: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bankInfo: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  label: {
    fontSize: 15,
    color: '#8C8C8C',
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
  },
  paymentSection: {
    marginBottom: 40,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentCard: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8C8C8C',

  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '900',
  },
  payButton: {
    backgroundColor: '#0000ff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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
  successBottomSheetTextLabel: {
    fontSize: 14,
    marginBottom: 20,
    alignItems: "center",
    color: "#666"
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
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center"
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
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
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
    alignSelf: "center"
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#999', // Success green color for the border
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 30,
    color: '#000',
    fontWeight: "900"
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
    width: 25,
    height: 25
  },
});

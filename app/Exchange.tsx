import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';


const Exchange = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const { cryptoName, price, quantity, limits } = useLocalSearchParams();


  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const handlePreview = () => {
    setIsPreviewVisible(true); // Show the preview bottom sheet
  };

  const handleContinue = () => {
    setIsPreviewVisible(false); // Hide the preview bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
    if (otp.includes('')) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete OTP',
        text2: 'Please fill in all fields of the OTP.',
        position: 'bottom',
      });
      return;
    }
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

  const handleVerifyPress = () => {
    if (otp.includes('')) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete OTP',
        text2: 'Please fill in all fields of the OTP.',
        position: 'bottom',
      });
      return;
    }

    router.push('/TransactionPinSetup');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Bureau De Change</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Price Section */}
         <View style={styles.sectionCard}>
          <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>{price}</Text>
            </View>

            {/* Quantity, Payment Method, Network, Duration */}
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Quantity</Text>
              <Text style={styles.detailValue}>4.5673 USDT</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Payment Method</Text>
              <View style={styles.leftLine}>
                <Text style={styles.balanceName}>Swiftpay Balance</Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Limits</Text>
              <Text style={styles.detailValue}>{limits}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Payment Duration</Text>
              <Text style={styles.detailValue}>15Min(s)</Text>
            </View>
         </View>

         

          <Text style={styles.headline}>Transaction Information</Text>
          <Text style={styles.note}>
            Note: Ensure you fill in the right bank details, as we would not be held liable for any asset loss due to wrong info.
          </Text>

          {/* Address Input */}
          <Text style={styles.paymentText}>Amount in USD</Text>
          <TextInput 
            style={styles.input}
            placeholder="$250"
            placeholderTextColor="#666"
          />

          <Text style={styles.paymentText}>Amount to be paid (NGN)</Text>
          <TextInput 
            style={styles.input}
            placeholder="120,975"
            placeholderTextColor="#666"
          />
          
          <View style={styles.estimate}>
           <View>
           <Text style={styles.estTitle}>SwiftPay Fees:</Text>
           <Text style={styles.subTitle}>I will Receive</Text>
           </View>
            <Text style={styles.est}>$1.34</Text>
          </View>

          <Text style={styles.headline}>Receiver Details</Text>
          <Text style={styles.note}>
            Note: Ensure your Bank supports USD transfer Recommend Bank - Domiciliary Account (Dollar)
          </Text>

          {/* Payment Section */}
          <Text style={styles.paymentText}>Receiver Account Number</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Your Account Number"
            placeholderTextColor="#666"
          />

          <Text style={styles.paymentText}>Bank Name</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Bank Name"
            placeholderTextColor="#666"
          />

          <Text style={styles.paymentText}>Account Name</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Accoun Name"
            placeholderTextColor="#666"
          />

          {/* Buy Button */}
          <TouchableOpacity style={styles.buyButton} onPress={handlePreview}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Sheet for Preview */}
        <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Order Summary</Text>
              <TouchableOpacity onPress={() => setIsPreviewVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
            </View>

            <View style={styles.successBottomSheetContainer}>
                <Text style={styles.subText}>Buy USDT</Text>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Amount</Text>
                <Text style={styles.successBottomSheetTextgreen}>34,869.97 NGN</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Price</Text>
                <Text style={styles.successBottomSheetText}>1568.00 NGN</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Total Quantity</Text>
                <Text style={styles.successBottomSheetText}>12.0000 USDT</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Transaction fees</Text>
                <Text style={styles.successBottomSheetText}>$1.76</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Order No.</Text>
                <Text style={styles.successBottomSheetText}>12345678908765 <AntDesign name='copy1'/></Text>
                </View>

                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Order time</Text>
                <Text style={styles.successBottomSheetText}>2024-03-26 17:23:45 <AntDesign name='copy1'/></Text>
                </View>
            </View>
            <View style={styles.pinTextContainer}>
              <Text style={styles.pinTextTitle}>Enter Pin</Text>
              <Text style={styles.pinTextSub}>Enter pin to complete transaction</Text>
            </View>

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
            <TouchableOpacity style={styles.buyButton} onPress={handleContinue}>
            <Text style={styles.buyButtonText}>Complete Purchase</Text>
          </TouchableOpacity>
          </View>
        </BottomSheet>

        <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => router.push('/SellTrading')}>
          <View style={styles.bottomSheetContent}>
                <TouchableOpacity onPress={() => router.push('/SellTrading')}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
              <Image source={require('../assets/icons/success.png')} style={styles.logo} />
              

            <Text style={styles.successBottomSheetHeader}>Your Sell Order has been completed</Text>
            <Text style={styles.subTitleText}>Buy order for $124 has been completed and sent to your Swiftpay Wallet</Text>
            <View style={styles.successBottomSheetContainer}>
                <Text style={styles.subText}>Buy USDT</Text>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Amount</Text>
                <Text style={styles.successBottomSheetTextgreen}>34,869.97 NGN</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Price</Text>
                <Text style={styles.successBottomSheetText}>1568.00 NGN</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Total Quantity</Text>
                <Text style={styles.successBottomSheetText}>12.0000 USDT</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Transaction fees</Text>
                <Text style={styles.successBottomSheetText}>$1.76</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Order No.</Text>
                <Text style={styles.successBottomSheetText}>12345678908765 <AntDesign name='copy1'/></Text>
                </View>

                <View style={styles.flex}>
                <Text style={styles.successBottomSheetText}>Order time</Text>
                <Text style={styles.successBottomSheetText}>2024-03-26 17:23:45 <AntDesign name='copy1'/></Text>
                </View>
               
            </View>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 30,
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
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00952A',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#666',
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
  row: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
  balanceAmount: {
    fontSize: 24,
    color: '#000',
    fontWeight: "700",
  },
  note: {
    color: '#1400fb',
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  flexInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  currencyText: {
    marginRight: 10,
    color: '#666',
    fontSize: 16,
  },
  pressableText: {
    color: '#1400FB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentText: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "500",
  },
  estimate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buyButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'medium',
  },
  noteBottom: {
    fontSize: 15,
    color: '#666',
    textAlign: 'left',
    marginTop: 10,
  },
  est: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  estTitle: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  leftLine: {
    borderLeftWidth: 3,
    borderLeftColor: '#1400fb',
    paddingHorizontal: 3,
    borderRadius: 2,
    marginBottom: 10,
  },
  balanceName: {
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
  },
  headline: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 20,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '500',
    left: 100
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
  icon: {
    alignSelf: 'flex-end',
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
    marginBottom: 10
  },
  successBottomSheetContainer:{
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginBottom: 20
  },
  subText:{
    fontWeight: "700",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10
  },
  sectionCard:{
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 15,
    marginBottom: 20
  },
  subTitle:{
    color: "#666"
  },
  pinTextContainer:{
    flexDirection: "column",
  },
  pinTextTitle:{
    fontSize: 18,
    fontWeight: "600"
  },
  pinTextSub:{
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    marginBottom: 20
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15
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
  subTitleText:{
    color: "#888",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 30

  }
});

export default Exchange;

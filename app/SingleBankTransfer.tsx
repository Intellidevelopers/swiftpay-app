import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { BottomSheet } from '@rneui/themed';
// Import the BottomSheet component from react-native-elements

const { height } = Dimensions.get('window');

const banks = [
    { id: 1, name: 'Wema Bank', logo: require('../assets/banks/wema.png') },
    { id: 2, name: 'GTBank', logo: require('../assets/banks/gtb.png') },
    { id: 3, name: 'Access Bank', logo: require('../assets/banks/access.png') },
    { id: 4, name: 'Stanbic IBTC', logo: require('../assets/banks/stanbic.png') },
    { id: 5, name: 'FCMB', logo: require('../assets/banks/fcmb.png') },
    { id: 6, name: 'UBA', logo: require('../assets/banks/uba.png') },
    { id: 7, name: 'Firstbank', logo: require('../assets/banks/firstbank.png') },
    // Add more banks as needed
  ];

const SingleBankTransfer: React.FC = () => {
  const [swiftPayTag, setSwiftPayTag] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [isBankSheetVisible, setIsBankSheetVisible] = useState(false);
  const [filteredBanks, setFilteredBanks] = useState(banks);


  const handleBankInputChange = (text: string) => {
    setSwiftPayTag(text);
    const filtered = banks.filter(bank =>
      bank.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBanks(filtered);
  };


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

  const [isChecked, setIsChecked] = useState(true);

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
        <Text style={styles.headerText}>Transfer to Bank</Text>
        <Text style={styles.headerText2}>History</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.Subtitle}>Transaction Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bank Name</Text>
          <TouchableOpacity style={styles.bankInputWrapper} onPress={() => setIsBankSheetVisible(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select bank"
              value={swiftPayTag}
              onChangeText={handleBankInputChange}
              editable={false}
            />
            <View style={styles.iconWrapper}>
              <AntDesign name="down" size={20} color="#888" />
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Adeagbo Josiah"
            value={recipientName}
            onChangeText={setRecipientName}
          />
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="10,000"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
          <Text style={styles.label}>Remark</Text>
          <TextInput
            style={styles.input}
            placeholder="Part payment"
            value={remark}
            onChangeText={setRemark}
          />
        </View>

        {/* Tab Switcher */}
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <View style={styles.recentTopbar}>
              <TouchableOpacity
                style={selectedTab === 'Recent' ? styles.activeTabButton : null}
                onPress={() => setSelectedTab('Recent')}
              >
                <Text style={selectedTab === 'Recent' ? styles.activeTabText : styles.tabText}>Recent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={selectedTab === 'Favorites' ? styles.activeTabButton : null}
                onPress={() => setSelectedTab('Favorites')}
              >
                <Text style={selectedTab === 'Favorites' ? styles.activeTabText : styles.tabText}>Favorites</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <AntDesign name='search1' size={20} color={'#888'} />
            </TouchableOpacity>
          </View>

          {/* Conditional Rendering Based on Selected Tab */}
          {selectedTab === 'Recent' ? (
            // Recent Tab Content
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.users}>
                  <Image source={require('../assets/banks/fcmb.png')} style={styles.user} />
                  <View>
                    <Text style={styles.name}>Segun Arinze</Text>
                    <Text style={styles.account}>098654355 Wema Bank</Text>
                  </View>
                </View>
                <View style={styles.users}>
                  <Image source={require('../assets/banks/access.png')} style={styles.user} />
                  <View>
                    <Text style={styles.name}>Segun Arinze</Text>
                    <Text style={styles.account}>098654355 Wema Bank</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewMore} onPress={() => router.push('/Beneficiaries')}>
                  <Text style={styles.viewMoreText}>View more</Text>
                </TouchableOpacity>
              </ScrollView>
            </>
          ) : (
            // Favorites Tab Content
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.users}>
                  <Image source={require('../assets/banks/gtb.png')} style={styles.user} />
                  <View>
                    <Text style={styles.name}>Jane Doe</Text>
                    <Text style={styles.account}>123456789 GTBank</Text>
                  </View>
                </View>
                <View style={styles.users}>
                  <Image source={require('../assets/banks/access.png')} style={styles.user} />
                  <View>
                    <Text style={styles.name}>Michael Smith</Text>
                    <Text style={styles.account}>987654321 Access Bank</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewMore} onPress={() => router.push('/Beneficiaries')}>
                  <Text style={styles.viewMoreText}>View more</Text>
                </TouchableOpacity>
              </ScrollView>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Payment Summary Bottom Sheet */}
      <BottomSheet isVisible={isPaymentSummaryVisible} onBackdropPress={() => setIsPaymentSummaryVisible(false)}>
        <View style={styles.bottomSheetContent}>
        
          <Text style={styles.successBottomSheetHeaderP}>₦ 4,680.00</Text>
            <View style={styles.successBottomSheetContainer}>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetTextLabel}>Bank</Text>
                <View style={styles.bank}>
                    <Image source={require('../assets/banks/fcmb.png')} style={styles.icon} />
                    <Text style={styles.successBottomSheetText}>FCMB</Text>
                </View>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetTextLabel}>Account Number</Text>
                <Text style={styles.successBottomSheetText}>0977645234</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetTextLabel}>Name</Text>
                <Text style={styles.successBottomSheetText}>Adeagbo Josiah</Text>
                </View>
                <View style={styles.flex}>
                <Text style={styles.successBottomSheetTextLabel}>Transactio Fee</Text>
                <Text style={styles.successBottomSheetText}>₦ 10.00</Text>
                </View>
            </View>
            <Text style={styles.balanceTitle}>Payment Method</Text>
            <View style={styles.balanceContainer}>
              <View style={styles.balance}>
                <Text style={styles.swiftpay}>Swiftpay Balance</Text>
                <Text style={styles.balanceText}>₦ 2,345.98</Text>
              </View>
              <TouchableOpacity onPress={toggleCheckbox}>
                <View style={[styles.circle, isChecked && styles.checkedCircle]}>
                  {isChecked && <AntDesign name="check" size={16} color="white" />}
                </View>
              </TouchableOpacity>
            </View>
          <TouchableOpacity style={styles.nextButton} onPress={handlePay}>
            <Text style={styles.nextButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Transaction PIN Bottom Sheet */}
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

      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)} containerStyle={styles.fullScreenBottomSheet}>
        <View style={[styles.bottomSheetContent, { height }]}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
       <TouchableOpacity onPress={() => router.push('/')}>
       <Text style={styles.doneText}>Done</Text>
       </TouchableOpacity>
      </View>

      {/* Transaction Icon and Amount */}
      <View style={styles.transactionInfo}>
        <Image source={require('../assets/icons/timer.png')} style={styles.timer} />
        <Text style={styles.processingText}>Processing</Text>
        <Text style={styles.amountText}>N12,988.00</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          {/* Step 1: Payment Successful */}
          <View style={styles.stepContainer}>
            <FontAwesome name="check-circle" size={24} color="#00C853" />
            <Text style={styles.stepText}>Payment</Text>
            <Text style={styles.stepText}>Successful</Text>
            <Text style={styles.dateText}>01-03-24 12:65:23</Text>
          </View>

          {/* Progress Line */}
          <View style={styles.progressLineCompleted} />

          {/* Step 2: Processing by Service Provider */}
          <View style={styles.stepContainer2}>
          <Image source={require('../assets/icons/timer.png')} style={styles.icon} />
            <Text style={styles.stepText}>Processing by</Text>
            <Text style={styles.stepText}>Service Provider</Text>
            <Text style={styles.dateText}>01-03-24 12:65:23</Text>
          </View>

          {/* Progress Line */}
          <View style={styles.progressLinePending} />

          {/* Step 3: Completed */}
          <View style={styles.stepContainer3}>
            <View style={styles.comp}></View>
            <Text style={styles.stepText}>Completed</Text>
            <Text style={styles.stepText}></Text>
            <Text style={styles.dateText}></Text>
          </View>
        </View>
      </View>

      {/* Transaction Status Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          The transaction is being processed, kindly hold on for a status update.
        </Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>
          <FontAwesome name="share" size={18} color="#000" /> Share Receipt
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Report')}>
        <Text style={styles.reportText}>Report an Issue</Text>
      </TouchableOpacity>
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isBankSheetVisible} onBackdropPress={() => setIsBankSheetVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Select a Bank</Text>
          <View style={styles.bankInputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Search bank"
              value={swiftPayTag}
              onChangeText={handleBankInputChange}
            />
            <TouchableOpacity style={styles.iconWrapper} onPress={() => setIsBankSheetVisible(true)}>
              <AntDesign name="search1" size={20} color="#888" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bankItem}
                onPress={() => {
                  setSwiftPayTag(item.name);
                  setIsBankSheetVisible(false);
                }}
              >
                <Image source={item.logo} style={styles.bankLogo} />
                <Text style={styles.bankName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  note: {
    color: '#0000ff',
    fontSize: 13
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    color: "#666"
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20
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
  icon:{
    width: 25,
    height: 25
  },
  notice:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EFF4FF",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 15
  },
  label:{
    fontWeight: "500",
    marginBottom: 5
  },
  Subtitle:{
    fontWeight: "700",
    fontSize: 16
  },
  recentContainer:{
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 10
  },
  recentHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  recentTopbar:{
    flexDirection: "row",
    gap: 40,
    alignItems: "center"
  },
  user:{
    width: 40,
    height: 40
  },
  users:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25
  },
  name:{
    fontWeight: "700",
  },
  account:{
    color: "#A3A3A3"
  },
  activeTabButton:{
    borderBottomWidth: 2,
    borderBottomColor: "#00CB14"
  },
  activeTabText:{
    color: "#00CB14",
    fontSize: 16,
    fontWeight: "500"
  },
  tabText:{
    color: "#888",
    fontWeight: "500"
  },
  fullScreenBottomSheet: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  bottomSheetTitle: {
    fontSize: 15,
    fontWeight: '700',
    left: 96,
    marginBottom: 10
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
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30
  },
  successBottomSheetContainer:{
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  subText:{
    fontWeight: "700",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10
  },
  reason:{
    color: "#666",
    textAlign: "center",
    marginBottom: 30
  },
  image: {
    width: '100%', // Full width of the container
    height: 40,    // Fixed height
    resizeMode: 'cover', // Or 'contain', depending on your preference
    borderRadius: 5,
    marginTop: -20

  },
  imageContainer: {
    alignItems: 'center',
    width: '100%', // Ensure the container is full width
    height: 20,   
    marginBottom: '5%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 25
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12, // Circular shape
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    backgroundColor: '#4CAF50', // Color when checked
    borderColor: '#4CAF50',
  },
  balanceTitle:{
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10
  },
  balanceContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee"
  },
  balance:{
    flexDirection: "column"
  },
  swiftpay:{
    color: "#888",
    fontSize: 12
  },
  balanceText:{
    fontSize: 24,
    fontWeight: "700"
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
  viewMore:{
    alignItems: "center"
  },
  viewMoreText:{
    textDecorationLine: "underline",
    color: "#666",
    fontSize: 15
  },
  bankInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  bankItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10 
},
  bankLogo: { 
    width: 30, 
    height: 30, 
    marginRight: 10 
},
  bankName: { 
    fontSize: 
    16 
},
bank:{
    flexDirection: "row",
    justifyContent: "center",
    gap: 5
},
doneText: {
    color: '#00C853',
    fontSize: 18,
  },
  transactionInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  processingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCompleted: {
    alignItems: 'center',
    flexDirection: "column"
  },
  stepCurrent: {
    alignItems: 'center',
    flexDirection: "column"
  },
  stepPending: {
    alignItems: 'center',
    flexDirection: "column"
  },
  stepText: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
    fontWeight: "500"
  },
  dateText: {
    fontSize: 10,
    color: '#BDBDBD',
  },
  messageContainer: {
    backgroundColor: '#FFF4E5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
    marginTop: 100
  },
  messageText: {
    color: '#FF8C00',
    fontSize: 13
  },
  shareButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#000',
    fontSize: 16,
  },
  reportText: {
    color: '#1E88E5',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30,
  },
  progressBarContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepContainer2: {
    alignItems: 'center',
    left: -55
  },
  stepContainer3: {
    alignItems: 'center',
    left: -100
  },
  progressLineCompleted: {
    width: 100,
    height: 3,
    backgroundColor: '#00C853',
    marginTop: -60,
    left: -25
  },
  progressLinePending: {
    width: 100,
    height: 3,
    backgroundColor: '#BDBDBD',
    marginTop: -60,
    left: -85
  },
  timer:{
    width: 50,
    height: 50
  },
  comp:{
    borderWidth: 3,
    height: 20,
    width: 20,
    backgroundColor: "#ccc",
    borderColor: "#eee",
    borderRadius: 50
  }
});

export default SingleBankTransfer;

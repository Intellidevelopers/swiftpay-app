import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import RBSheet from 'react-native-raw-bottom-sheet';
import RecommendedScrollCards from '@/components/RecommendedScrollCards';
import { router, useLocalSearchParams } from 'expo-router';
import { BottomSheet } from '@rneui/themed';


interface CardItem {
  id: string;
  title: string;
  amount: string;
  growth: string;
  description: string;
}

const AirtimeData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [activeTab, setActiveTab] = useState('Airtime');
  const refRBSheet = useRef<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const defaultNetwork = { name: 'Default Network', logo: require('../assets/networks/mtn.png') }; // Replace with your default image
  const [selectedNetwork, setSelectedNetwork] = useState(defaultNetwork);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [recentNumbers, setRecentNumbers] = useState<string[]>(['090 8765 879', '080 1234 5678', '070 9876 5432']);
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);


  // Show the dropdown when the input is focused
  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  // Hide the dropdown when the input loses focus
  const handleInputBlur = () => {
    setIsDropdownVisible(false);
  };

  // When a number from the dropdown is selected, set the input value
  const handleNumberSelect = (number: string) => {
    setPhoneNumber(number);
    setIsDropdownVisible(false); // Hide dropdown after selection
  };



    // Network data
    const networks = [
        { name: 'MTN', logo: require('../assets/networks/mtn.png') },
        { name: 'Airtel', logo: require('../assets/networks/airtel.png') },
        { name: 'Glo', logo: require('../assets/networks/glo.png') },
        { name: '9mobile', logo: require('../assets/networks/9mobile.png') },
        // Add more networks as needed
      ];

        // Recommended cards data
  const RecommendedCards = [
    { id: '1', title: 'Solana', amount: '$21,234', growth: '+3.76%', description: 'Full range of crypto derivatives instrument' },
    { id: '2', title: 'Bitcoin', amount: '$29,234', growth: '+1.76%', description: 'Full range of crypto derivatives instrument' },
    { id: '3', title: 'Ethereum', amount: '$1,934', growth: '-2.54%', description: 'Full range of crypto derivatives instrument' },
  ];

  const TopTabBar = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Airtime' && styles.activeTab]}
        onPress={() => setActiveTab('Airtime')}
      >
        <Text style={[styles.tabText, activeTab === 'Airtime' && styles.activeTabText]}>Airtime</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'Data' && styles.activeTab]}
        onPress={() => setActiveTab('Data')}
      >
        <Text style={[styles.tabText, activeTab === 'Data' && styles.activeTabText]}>Data</Text>
      </TouchableOpacity>
    </View>
  );

  // Toggle network dropdown modal
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // Access device contacts
  // Access device contacts
  const chooseContact = async () => {
    setLoading(true); // Start loading
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
        refRBSheet.current.open();
      }
    } else {
      alert("Permission to access contacts was denied.");
    }
    setLoading(false); // Stop loading
  };

  const selectContact = (contact: any) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const number = contact.phoneNumbers[0].number;
      if (number) {
        setPhoneNumber(number);
      }
    }
    refRBSheet.current.close();
  };
  
  

  // Auto-slide the recommended cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % RecommendedCards.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const saveRecentNumber = () => {
    if (phoneNumber && !recentNumbers.includes(phoneNumber)) {
      setRecentNumbers([phoneNumber, ...recentNumbers.slice(0, 4)]); // Save the number (max 5 recent numbers)
    }
  };
  
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
    setIsTransactionPinVisible(true)
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

  
  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Airtime & Data</Text>
        <TouchableOpacity>
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {activeTab === 'Airtime' ? (
    <View>
      <TopTabBar />

     
<View style={styles.phoneInputContainer}>
  <TouchableOpacity style={styles.network} onPress={toggleModal}>
  {selectedNetwork.logo && (
          <Image source={selectedNetwork.logo} style={styles.networkIcon} />
        )}
    <AntDesign name='down' size={15}  />
  </TouchableOpacity>
  <TextInput placeholder="090 8765 879" style={styles.phoneInput} value={phoneNumber}
          onChangeText={setPhoneNumber} keyboardType='phone-pad' />
  <TouchableOpacity onPress={chooseContact}>
    <FontAwesome name="phone" size={24} color="white" style={styles.callButton} />
  </TouchableOpacity>
</View>
 {/* Activity Indicator */}
 {loading && (
          <><ActivityIndicator size="large" color="#0000ff" style={styles.loader} /><Text style={{alignSelf: "center"}}>Please wait...</Text></>
        )}
<Text style={styles.topUpLabel}>Top up</Text>

<View style={styles.topUpOption}>
  {['₦50', '₦100', '₦200', '₦500', '₦1,000', '₦2,000'].map((amount, index) => (
    <TouchableOpacity key={index} style={styles.topUpCard} onPress={handlePreview}>
      <Text style={styles.cashbackText}>₦1 Cashback</Text>
      <Text style={styles.amountText}>{amount}</Text>
      <Text style={styles.payText}>Pay ₦50</Text>
    </TouchableOpacity>
  ))}
</View>

<View style={styles.slider}>
<View style={styles.amountInputContainer}>
  <TextInput placeholder="₦ 50-500,00" style={styles.amountInput} keyboardType="numeric" />
  <TouchableOpacity style={styles.payButton}>
    <Text style={styles.payButtonText}>Pay</Text>
  </TouchableOpacity>
</View>

<Text style={styles.recommendedLabel}>Recommended</Text>
   {/* Recommended cards */}
   

   <FlatList
        ref={flatListRef}
        data={RecommendedCards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={styles.recommendedCard}>
            <View>
              <Text style={styles.recommendedTitle}>{item.title}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={styles.recommendedAmount}>{item.amount}</Text>
                <Text style={[styles.recommendedGrowth, parseFloat(item.growth) < 0 && styles.negativeGrowth]}>
                  {item.growth}
                </Text>
              </View>
              {/* Ensure this description text is wrapped properly */}
              <Text style={styles.recommendedDescription} numberOfLines={2}>
              Full range of crypto derivatives instrument
              </Text>
            </View>
          </View>
        )}
      />
</View>

{/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {RecommendedCards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  ) : (
    <View>
      <TopTabBar />

     
      <View style={styles.phoneInputContainer}>
  <TouchableOpacity style={styles.network} onPress={toggleModal}>
  {selectedNetwork.logo && (
          <Image source={selectedNetwork.logo} style={styles.networkIcon} />
        )}
    <AntDesign name='down' size={15}  />
  </TouchableOpacity>
  <TextInput
          placeholder="090 8765 879"
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          keyboardType="phone-pad"
        />

</View>
{/* Custom Dropdown for recent numbers */}
{isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={recentNumbers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNumberSelect(item)} style={styles.dropdownItem}>
               <View style={styles.numberAndNetwork}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                    <Text style={styles.natwork}>MTN</Text>
               </View>
               <Text style={styles.date}>12 May  <AntDesign name='closecircleo' size={15} color={'#555'}/></Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.deleteButton}>
            <EvilIcons name='trash' size={30}/>
            <Text style={styles.trashText}>Delete All</Text>
          </TouchableOpacity>
        </View>
      )}

 
<RecommendedScrollCards/>

<View style={styles.planContainer}>
<View style={styles.sort}>
    <Text style={styles.activetopUpLabel}>Top up</Text>
    <Text style={styles.topUpLabel}>Top up</Text>
    <Text style={styles.topUpLabel}>Top up</Text>
    <Text style={styles.topUpLabel}>Top up</Text>
</View>

<View style={styles.topUpOptions}>
  {['100MB', '100MB', '100MB', '100MB', '100MB', '100MB'].map((amount, index) => (
    <TouchableOpacity key={index} style={styles.topUpDataCard} onPress={handleContinue}>
      <Text style={styles.amountText}>{amount}</Text>
      <Text style={styles.planDate}>1 Day</Text>
      <Text style={styles.payText}>₦ 150</Text>
      <Text style={styles.cashbackTextData}>₦3 Cashback</Text>
    </TouchableOpacity>
  ))}
</View>
</View>
    </View>
  )}
  </ScrollView>
  <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          {networks.map((network, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedNetwork(network);
                setIsModalVisible(false);
              }}
              style={styles.networkItem}>
              <Image source={network.logo} style={styles.networkIcon} />
              <Text style={styles.networkname}>{network.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <RBSheet
        ref={refRBSheet}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          }
        }}
      >
        <Text style={styles.bottomSheetTitle}>Select a Contact</Text>
        <View style={styles.searchContainer}>
            <TextInput placeholder='Search contact' style={styles.inputSearch}/>
            <AntDesign name='search1' size={20} />
        </View>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectContact(item)} style={styles.contactItem}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </RBSheet>

      <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle2}>Payment</Text>
            </View>
            <Text style={styles.amount}>₦1,000.00</Text>

            <View style={styles.flex}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.bottomSheetText}>₦1,000.00</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Provider</Text>
              <Text style={styles.bottomSheetText}>Glo</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Mobile number</Text>
              <Text style={styles.bottomSheetText}>080 8888 6823</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.bottomSheetText}>(₦2,567.44)</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Cashback</Text>
              <Text style={styles.bottomSheetText}>+15Pts</Text>
            </View>
            <TouchableOpacity style={styles.SellButton} onPress={handleContinue}>
              <Text style={styles.SellButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
        <BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Complete Payment</Text>
              
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
          <Text style={styles.successBottomSheetHeader}>Transfer Successful</Text>
      <Text style={styles.desc}>Your transfer to Segun Arinze for N4,890.00 is successful</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/BillReceipt')}>
            <Text style={styles.nextButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default AirtimeData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyText: {
    color: 'green',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 50
  },
  tabText: {
    color: 'black',
    fontWeight: "500"
  },
  activeTabText: {
    color: 'white',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  networkIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 100
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500"
  },
  callButton: {
    backgroundColor: '#0000ff',
    padding: 8,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  topUpLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "700"
  },
  activetopUpLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "700",
    borderBottomWidth: 4,
    borderBottomColor: "#0000ff",
    color: "#0000ff"
  },
  topUpOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topUpOption: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  topUpCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    width: '31.8%',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: "column",
  },
  topUpDataCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    width: '31.8%',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: "column",
  },
  cashbackText: {
    fontSize: 11,
    color: '#0000ff',
    marginBottom: 10
  },
  cashbackTextData: {
    fontSize: 11.5,
    color: '#0cbc8b',
    marginBottom: 10,
    fontWeight: "500"
  },
  planDate:{
    color: "#666",
    fontWeight: "500"
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  payText: {
    fontSize: 14,
    color: '#555',
    fontWeight: "500"
  },
  amountInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    marginBottom: 20,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500"
  },
  payButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 30,
    paddingHorizontal: 35
  },
  payButtonText: {
    color: 'white',
    fontSize: 15
  },
  recommendedLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600'
  },
  recommendedCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 305,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#666"
  },
  recommendedAmount: {
    fontSize: 20,
    marginTop: 5,
    color: "#000",
    fontWeight: "700"
  },
  recommendedGrowth: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  negativeGrowth: {
    color: 'red',
  },
  backbutton:{
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 50
  },
  network:{
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  },
  activepageContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20
  },
  activepage:{
    backgroundColor: "#0000ff",
    height: 8,
    width: 25,
    borderRadius: 10
  },
  page:{
    backgroundColor: "#ddd",
    height: 8,
    width: 25,
    borderRadius: 10
  },
  recommendedDescription: {
    fontSize: 15,
    color: '#666',  // Use a darker color to ensure visibility
    marginTop: 5,
    lineHeight: 16,
    fontWeight: '400', // Adjust the font weight if needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  networkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    width: "80%",
    alignSelf: "center"
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  paginationDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: '#aaa',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  bottomSheetTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: "center",
    alignSelf: "center"
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: "700"
  },
  contactNumber: {
    fontSize: 14,
    color: '#555',
  },
  searchContainer:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    justifyContent: "space-between",
    width: '90%',
    borderRadius: 10,
    borderColor: "#aaa",
    marginBottom: 10
  },
  inputSearch:{
    flex: 1
  },
  loader: {
    // marginVertical: 20,
  },
  networkname:{
    fontWeight: "600",
    fontSize: 16
  },
  sort:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  planContainer:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginTop: -20,
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    marginBottom: 20
  },
  dropdownItem: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  numberAndNetwork:{
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  natwork:{
    color: "#aaa",
    fontWeight: "600"
  },
  date:{
    color: "#aaa"
  },
  deleteButton:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: 10
  },
  trashText:{
    color: "#555"
  },
  slider:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },  icon: {
    alignSelf: 'flex-end',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount:{
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#0000ff"
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "700"

  },
  label: {
    fontSize: 15,
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
    justifyContent: 'center',
    marginBottom: 10,
  },
  SellButton: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  SellButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'medium',
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
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  successBottomSheetHeader:{
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
  },
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center"
  },
});

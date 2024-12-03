import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable, Image, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const TnsferAbroad = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const { cryptoName, price, quantity, limits } = useLocalSearchParams();


  const handleContinue = () => {
    setIsPreviewVisible(false); // Hide the preview bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };
  const [isCurrencyDropdownVisible, setCurrencyDropdownVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({ name: 'USD', icon: require('../assets/icons/dollar.png') });


  const [isCountryDropdownVisible, setCountryDropdownVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Nigeria (domiciliary account)' });
  const [isNigeriaSelected, setIsNigeriaSelected] = useState(true);

  const [isBankDropdownVisible, setBankDropdownVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState({ name: 'Select Bank' });


  const currencies = [
    { name: 'USD', icon: require('../assets/icons/dollar.png') },
    { name: 'EUR', icon: require('../assets/icons/euro.png') },
    { name: 'GBP', icon: require('../assets/icons/pounds.png') },
    // Add more currencies as needed
  ];

  const countries = [
    { name: 'Nigeria (domiciliary account)'},
    { name: 'US'},
    { name: 'UK'},
    { name: 'EUR'},
    // Add more currencies as needed
  ];

  const banks = [
    { name: 'First City Monument Bank'},
    { name: 'Providus Bank'},
    { name: 'Other Banks'},
    // Add more currencies as needed
  ];

  const handleCurrencySelect = (currency: React.SetStateAction<{ name: string; icon: any; }>) => {
    setSelectedCurrency(currency);
    setCurrencyDropdownVisible(false);
  };

  const handleCountrySelect = (country: React.SetStateAction<{ name: string; }>) => {
    setSelectedCountry(country);
    setCountryDropdownVisible(false);
    setIsNigeriaSelected(country.name === 'Nigeria (domiciliary account)'); // update state based on selected country
  };

  const handleBankSelect = (bank: React.SetStateAction<{ name: string }>) => {
    setSelectedBank(bank);
    setBankDropdownVisible(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
            <AntDesign name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Transfer Abroad</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Rate</Text>
            <Text style={styles.priceValue}>1.445 NGN</Text>
          </View>

          {/* Quantity, Payment Method, Network, Duration */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Transfer Fee</Text>
            <Text style={styles.detailValue}>$2.76</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Payment Method</Text>
            <View style={styles.leftLine}>
              <Text style={styles.balanceName}>Swiftpay Balance</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Limits</Text>
            <Text style={styles.detailValue}>100,00 - 250,000 NGN</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Payment Duration</Text>
            <Text style={styles.detailValue}>15Min(s)</Text>
          </View>


          <Text style={styles.headline}>With Swiftpay Balance</Text>

          {/* Info Note */}
          <Text style={styles.note}>
             Note: Ensure you fill in the right bank details, as we would not be liable for any asset loss due to wrong info.
          </Text>

          {/* Address Input */}
          <Text style={styles.paymentText}>Amount in USD</Text>
          <View style={styles.amountContainer}>
          <TextInput
            style={styles.input2}
            placeholder="$250"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.currencyPicker} onPress={() => setCurrencyDropdownVisible(true)}>
            <View style={styles.valueContainer}>
                <Image source={selectedCurrency.icon} style={styles.currencyLogo}/>
                <Text style={styles.valueText}>{selectedCurrency.name}</Text>
                <AntDesign name='caretdown' color={'#fff'}/>
            </View>
          </TouchableOpacity>
          </View>


          <Text style={styles.paymentText}>Country</Text>
        <TouchableOpacity style={styles.countryPicker} onPress={() => setCountryDropdownVisible(true)}>
          <View style={styles.valueContainer2}>
            <Text>{selectedCountry.name}</Text>
            <AntDesign name='down' color={'#000'} size={16} />
          </View>
        </TouchableOpacity>
        <Text style={styles.sub}>SwiftPay charges a 0.1% and ₦10 fee on all transactions</Text>


        {isNigeriaSelected && (
          <View style={styles.domiciliaryBanks}>
            <Text style={styles.paymentText}>Select Domiciliary Bank</Text>
            <TouchableOpacity style={styles.countryPicker} onPress={() => setBankDropdownVisible(true)}>
              <View style={styles.valueContainer2}>
                <Text>{selectedBank.name}</Text>
                <AntDesign name='down' color={'#000'} size={16} />
              </View>
            </TouchableOpacity>
            <Text style={styles.sub}>SwiftPay charges a 0.1% and ₦10 fee on all transactions</Text>
          </View>
        )}

          {/* Payment Section */}
          {/* <Text style={styles.paymentText}>Amount to be paid (NGN)</Text>
          <TextInput 
            style={styles.input}
            placeholder="120,975"
            placeholderTextColor="#666"
          />
          <View style={styles.estimate}>
            <View>
                <Text style={styles.estTitle}>SwiftPay Fees:</Text>
                <Text style={styles.estSub}>Include taxes</Text>
            </View>
            <Text style={styles.est}>$ 1.34</Text>
          </View> */}

          <Text style={styles.headline}>Receiver Details</Text>
          <Text style={styles.note}>
             Note: Ensure your Bank supports USD transfer Recommended Bank - Domiciliary Account (Dollar).
          </Text>

          <Text style={styles.paymentText}>Receiver Account Number</Text>
          {/* Input with "NGN" and "All" Pressable */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.flexInput]}
              placeholder="2345XXXXXX"
              placeholderTextColor="#666"
              keyboardType='numeric'
            />
          </View>

          <Text style={styles.paymentText}>Bank Name</Text>
          {/* Input with "NGN" and "All" Pressable */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.flexInput]}
              placeholder="First Bank"
              placeholderTextColor="#666"
              keyboardType='numeric'
            />
          </View>

          <Text style={styles.paymentText}>Account Name</Text>
          {/* Input with "NGN" and "All" Pressable */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.flexInput]}
              placeholder="Adeagbo Josiah"
              placeholderTextColor="#666"
              keyboardType='numeric'
            />
          </View>

          

          {/* Buy Button */}
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Sheet for Preview */}
        <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Order Preview</Text>
              <TouchableOpacity onPress={() => setIsPreviewVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
            </View>

            <Text style={styles.amount}>120.87 USDT</Text>

            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Price:</Text>
              <Text style={styles.bottomSheetText}>1445 NGN</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Quantity:</Text>
              <Text style={styles.bottomSheetText}>4.5673 USDT</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Payment Method:</Text>
              <Text style={styles.bottomSheetText}>Swiftpay Balance</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Network:</Text>
              <Text style={styles.bottomSheetText}>BEP20</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.bottomSheetText}>Payment Duration:</Text>
              <Text style={styles.bottomSheetText}>15Min(s)</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={handleContinue}>
              <Text style={styles.buyButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {/* Bottom Sheet for Success */}
        <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
          <View style={styles.bottomSheetContent}>
                <TouchableOpacity onPress={() => setIsSuccessVisible(false)}>
                <AntDesign name='closecircleo' size={20} color={'red'} style={styles.icon} />
              </TouchableOpacity>
              <Image source={require('../assets/icons/success.png')} style={styles.logo} />
              

            <Text style={styles.successBottomSheetHeader}>Your order has been completed</Text>
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

       {/* Currency Dropdown Modal */}
       {isCurrencyDropdownVisible && (
            <Modal transparent={true} animationType="fade" visible={isCurrencyDropdownVisible}>
              <TouchableOpacity style={styles.modalBackdrop} onPress={() => setCurrencyDropdownVisible(false)} />
              <View style={styles.dropdownContainer}>
                {currencies.map((currency, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleCurrencySelect(currency)}>
                    <Image source={currency.icon} style={styles.dropdownIcon} />
                    <Text style={styles.dropdownText}>{currency.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}

          {isCountryDropdownVisible && (
            <Modal transparent={true} animationType="fade" visible={isCountryDropdownVisible}>
              <TouchableOpacity style={styles.modalBackdrop} onPress={() => setCountryDropdownVisible(false)} />
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownHeaderText}>Select Country</Text>
                {countries.map((country, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleCountrySelect(country)}>
                    <Text style={styles.dropdownText}>{country.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}

          {isBankDropdownVisible && (
            <Modal transparent={true} animationType="fade" visible={isBankDropdownVisible}>
              <TouchableOpacity style={styles.modalBackdrop} onPress={() => setBankDropdownVisible(false)} />
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownHeaderText}>Select bank</Text>
                {banks.map((bank, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleBankSelect(bank)}>
                    <Text style={styles.dropdownText}>{bank.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          )}
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
    color: '#000',
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
    color: '#0000ff',
    fontSize: 13,
    marginBottom: 20,
  },
  input: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
    marginBottom: 5,
    fontWeight: "500",
  },
  estimate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -10,
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
  },
  balanceName: {
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
  },
  headline: {
    borderRadius: 2,
    marginBottom: 10,
    width: 160,
    fontWeight: "500",
    fontSize: 16,
    marginTop: 40
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    marginBottom: 30
  },
  successBottomSheetContainer:{
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    borderRadius: 10
  },
  subText:{
    fontWeight: "700",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10
  },
  currencyLogo:{
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  currencyPicker:{
    backgroundColor: "#0000ff",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    padding: 10,
  },
  valueContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5
  },
  valueContainer2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  valueText:{
    color: "#fff",
  },
  amountContainer:{
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
    borderColor: "#ccc",
    marginBottom: 20
  },
  input2:{
    flex: 1,
    paddingHorizontal: 10
  },
  estSub:{
    color: "#888"
  },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  dropdownContainer: { position: 'absolute', top: '30%', left: '10%', right: '10%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 10 },
  dropdownItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownIcon: { width: 24, height: 24, marginRight: 10 },
  dropdownText: { fontSize: 16 },
  countryPicker:{
    backgroundColor: "#fff",
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dropdownHeaderText:{
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10
  },
  sub:{
    color: "#555",
    marginTop: -10,
    marginBottom: -20,
    fontSize: 12
  },
  domiciliaryBanks:{
    marginTop: 40
  }
});

export default TnsferAbroad;

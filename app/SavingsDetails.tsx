import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Modal, FlatList } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomSheet } from '@rneui/themed';
import CustomSwitch from '@/components/CustomSwitch';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select'; // You can use any dropdown library of your choice.

const SavingsDetails: React.FC = () => {
  const router = useRouter();
  const [savingsName, setSavingsName] = useState('');
  const [amountToSave, setAmountToSave] = useState('');
  const [option, setOption] = useState('locked');
  const [schedule, setSchedule] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [selectedTransferType, setSelectedTransferType] = useState<string | null>(null); // New state for radio buttons
  const [balance, setBalance] = useState(1000);
  const [convertedBalance, setConvertedBalance] = useState(balance);
  const [selectedFrequency, setSelectedFrequency] = useState('Never');
  const [selectedDate, setSelectedDate] = useState('Immediately');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);


  const handlePay = () => {
    setIsCustomDateVisible(false); // Hide the transaction pin bottom sheet
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet
  };



  const handleConfirmPayment = () => {
    setIsCustomDateVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

  const handleSave = () => {
    setIsTransactionPinVisible(false); // Show the success bottom sheet
  };

  const handleCustomDate = () => {
    setIsDateVisible(false); // Show the success bottom sheet

  };

  const handleConfirmDate = () => {
    setIsDateVisible(true); // Show the success bottom sheet
  };


  // Handle option change
  const handleOptionChange = (itemValue: string) => {
    setOption(itemValue);
    if (itemValue === 'locked') {
      setModalVisible(true); // Show modal if locked option is selected
    }
  };
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isCustomDateVisible, setIsCustomDateVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const handleTransferTypeChange = (type: string) => {
    setSelectedTransferType(type);
    if (type === 'Swiftpay') {
      router.push('../MultipleSwiftpayTransfer');
    } else if (type === 'Bank') {
      router.push('/MultipleBankTransfer');
    }
  };
  // Handle frequency selection
  const handleFrequencySelection = (frequency: string) => {
    setSelectedFrequency(frequency); // Set the selected frequency
    setIsSuccessVisible(false); // Close the bottom sheet
  };

    // Handle date selection
    const handleDateSelection = (date: string) => {
        setSelectedDate(date); // Set the selected frequency
        setIsDateVisible(false); // Close the bottom sheet
      };

      const [selectedDateCalendar, setSelectedDateCalendar] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  // Function to handle date selection from the calendar
  const onDateSelect = (day: { dateString: React.SetStateAction<string>; }) => {
    setSelectedDate(day.dateString);
    setCalendarVisible(false); // Hide calendar after selecting a date
  };

  const [wallets] = useState(['SwiftPay Wallet', 'Bitcoin Wallet', 'Ethereum Wallet']); // Example wallets

  // Open wallet picker
  const openWalletPicker = () => {
    setWalletModalVisible(true);
  };

  // Handle wallet selection
  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
    setWalletModalVisible(false); // Close picker after selection
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Savings Card */}
      <View style={styles.savingsCard}>
        <Image source={require('../assets/icons/logo.png')} style={styles.savingsImage} />
        <View style={styles.savingsInfo}>
          <Text style={styles.savingsTitle}>New York Road Trip</Text>
          <Text style={styles.savingsSubText}>
                60% <Text style={{ color: "#0000ff", fontSize: 15 }}>•</Text> <Text style={{ color: "#666", fontWeight: "400" }}>20 days left</Text>
              </Text>

          <TouchableOpacity style={styles.endSavingsButton}>
            <Text style={styles.endSavingsButtonText}>End Savings</Text>
          </TouchableOpacity>
          <Text style={styles.locked}>locked</Text>
        </View>
      </View>

      
      {/* Edit Saving Plan */}
      <TouchableOpacity style={styles.editPlan}>
        <Text style={styles.editPlanText}>Edit Saving Plan</Text>
      </TouchableOpacity>

      <Text style={styles.activeSavings}>Active Savings</Text>


      {/* Active Savings */}
      <View style={styles.activeSavingsContainer}>
        <Text style={styles.activeSavingsAmount}>₦1,460,000.15</Text>
        <Text>Interest Gained: <Text style={{color: '#0000ff'}}>₦0.00</Text></Text>
      </View>

      <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.addButton} onPress={handlePay}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.withdrawButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

      {/* Recent Activity Section */}
      <View style={styles.activitySection}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>Edit Savings</Text>
          <Text style={styles.activityTitle2}>Activity</Text>
        </View>
        {/* Activity Items */}
        {activityData.map((item, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <AntDesign
              style={styles.icon}
                name={item.type === 'add' ? 'arrowup' : 'arrowdown'}
                size={20}
                color={item.type === 'add' ? 'green' : 'red'}
              />
              <Text style={styles.activityAmount}>{item.amount}</Text>
            </View>
            <Text style={styles.activityDate}>{item.date}</Text>
          </View>
        ))}
      </View>

      {/* Create New Savings Plan Button */}
      <TouchableOpacity style={styles.createPlanButton} onPress={() => router.push('/CreateSavings')}>
        <Text style={styles.createPlanButtonText}>Create New Savings Plan</Text>
      </TouchableOpacity>

      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
  <View style={styles.bottomSheetContent}>
    <Text style={styles.successBottomSheetHeader}>Choose a frequency</Text>

    <View style={styles.option}>
      <TouchableOpacity onPress={() => handleFrequencySelection('Never')} style={styles.option}>
        <Ionicons name={selectedFrequency === 'Never' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
        <Text style={styles.optionText}>Never</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.option}>
      <TouchableOpacity onPress={() => handleFrequencySelection('Daily')} style={styles.option}>
        <Ionicons name={selectedFrequency === 'Daily' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
        <Text style={styles.optionText}>Daily</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.option}>
            <TouchableOpacity onPress={() => handleFrequencySelection('Weekly')} style={styles.option}>
              <Ionicons name={selectedFrequency === 'Weekly' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
              <Text style={styles.optionText}>Weekly</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.option}>
            <TouchableOpacity onPress={() => handleFrequencySelection('Monthly')} style={styles.option}>
              <Ionicons name={selectedFrequency === 'Monthly' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
              <Text style={styles.optionText}>Monthly</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.option}>
            <TouchableOpacity onPress={() => handleFrequencySelection('Yearly')} style={styles.option}>
              <Ionicons name={selectedFrequency === 'Yearly' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
              <Text style={styles.optionText}>Yearly</Text>
            </TouchableOpacity>
          </View>

    {/* Add the other frequency options */}
  </View>
</BottomSheet>

<BottomSheet isVisible={isTransactionPinVisible} onBackdropPress={() => setIsTransactionPinVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Add Savings Amount</Text>
            </View>
            <Text style={styles.label}>Amount</Text>
            <TextInput placeholder='Enter amount to save' style={styles.input} />

            <View style={styles.scheduleContainer}>
                <View>
                    <Text style={styles.scheduleText}>Schedule This Payment</Text>
                    <Text style={styles.subscheduleText}>or create a standing order to automatically pay it at specified intervals</Text>
                </View>
                <CustomSwitch value={schedule} onValueChange={setSchedule} />
            </View>

            <View style={styles.start}>
                <Text style={styles.startText}>Start</Text>
                <TouchableOpacity onPress={handleConfirmDate}>
                <Text style={styles.immediatelyText}>{selectedDate}</Text>
                </TouchableOpacity>
            </View>

            {/* Frequency Section */}
            <View style={styles.frequencyContainer}>
                <Text style={styles.frequencyTitle}>Frequency</Text>
                <TouchableOpacity onPress={handleConfirmPayment}>
                <Text style={styles.frequencyValue}>{selectedFrequency}</Text>
                </TouchableOpacity>
            </View>

           
          <TouchableOpacity style={styles.nextButton} onPress={handleSave}>
            <Text style={styles.nextButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isCustomDateVisible} onBackdropPress={() => setIsCustomDateVisible(false)}>
        <View style={styles.bottomSheetContent}>
            <Text style={styles.successBottomSheetHeader}>Choose Start Date</Text>

    <View style={styles.inputDateContainer}>
        <View>
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.dateInputContainer}>
        <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.calendarIcon}>
            <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder='12/09/2024'
            style={styles.inputDate}
            value={selectedDate}
            editable={false} // Make input read-only
          />
          
        </View>
        </View>

        <View>
        <Text style={styles.label}>End Date</Text>
        <View style={styles.dateInputContainer}>
        <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.calendarIcon}>
            <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder='12/09/2024'
            style={styles.inputDate}
            value={selectedDate}
            editable={false} // Make input read-only
          />
          
        </View>
        </View>
      </View>

            <TouchableOpacity style={styles.nextButton} onPress={handlePay}>
            <Text style={styles.nextButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
      </BottomSheet>
      <Modal
        transparent={true}
        visible={calendarVisible}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.calendarModalContainer}>
          <View style={styles.calendarContent}>
            <Calendar
              onDayPress={onDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
              }}
            />
            <TouchableOpacity onPress={() => setCalendarVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BottomSheet isVisible={isDateVisible} onBackdropPress={() => setIsDateVisible(false)}>
  <View style={styles.bottomSheetContent}>
    <Text style={styles.successBottomSheetHeader}>Choose a start date</Text>

    <View style={styles.option}>
      <TouchableOpacity onPress={() => handleDateSelection('Immediately')} style={styles.option}>
        <Ionicons name={selectedDate === 'Immediately' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
        <Text style={styles.optionText}>Immediately</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.option}>
      <TouchableOpacity  style={styles.option} onPress={handleCustomDate}>
        <Ionicons name={selectedDate === 'Custom Date' ? 'radio-button-on' : 'radio-button-off'} size={24} color="blue" />
        <Text style={styles.optionText}>Choose a custom date</Text>
      </TouchableOpacity>
    </View>

    {/* Add other date options if needed */}
  </View>
</BottomSheet>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.flex}>
            <Text style={styles.modalTitle}>Withdraw money to wallet</Text>
            <TouchableOpacity onPress={() => setModalVisible(false )}>
            <Feather name='x' size={20} color={'#0000ff'}/>
            </TouchableOpacity>
            </View>

            {/* Wallet Picker */}
            <Text style={styles.labelText}>Select Source</Text>
            <TouchableOpacity style={styles.walletPicker} onPress={openWalletPicker}>
              <Text style={styles.walletPickerText}>
                {selectedWallet ? selectedWallet : 'Select Wallet'}
              </Text>
              <AntDesign name="down" size={16} color="black" />
            </TouchableOpacity>

            {/* Wallet Picker Modal */}
            <Modal
              visible={walletModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setWalletModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.walletModalOverlay}
                onPress={() => setWalletModalVisible(false)}
              >
                <View style={styles.walletModalContent}>
                  <FlatList
                    data={wallets}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.walletOption}
                        onPress={() => handleWalletSelect(item)}
                      >
                        <Text style={styles.walletOptionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Amount Input */}
            <Text style={styles.labelText}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <Text style={styles.labelText}>Transfer PIN</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pin}
              onChangeText={setPin}
            />

            {/* Close Modal */}
            <TouchableOpacity style={styles.nextButton}>
              <Text style={{color: '#fff'}}>Withdraw Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default SavingsDetails;


const activityData = [
  { amount: '₦61.50', date: 'Yesterday', type: 'add' },
  { amount: '₦199.75', date: 'Dec 10, 2020', type: 'add' },
  { amount: '₦38.00', date: 'Nov 26, 2020', type: 'withdraw' },
];

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
  },
  savingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginVertical: 20,
  },
  savingsImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    top: -25
  },
  savingsInfo: {
    flex: 1,
    marginLeft: 10,
  },
  savingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  savingsProgress: {
    fontSize: 14,
    color: '#6cc24a',
  },
  locked: {
    fontSize: 14,
    color: '#666',
    marginLeft: 60,
    fontWeight: "700"
  },
  endSavingsButton: {
    backgroundColor: '#CC1212',
    padding: 8,
    borderRadius: 20,
    width: 90,
    alignItems: "center",
    alignSelf: "flex-end"
  },
  endSavingsButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  editPlan: {
    textAlign: 'left',
    marginVertical: 10,
    marginBottom: 20
  },
  editPlanText:{
    color: '#0000ff',
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500"
  },
  activeSavingsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  activeSavingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between"
  },
  addButton: {
    backgroundColor: '#1219BF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 60
  },
  withdrawButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  activitySection: {
    marginVertical: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: "500"
  },
  activityTitle2: {
    fontSize: 15,
    color: '#000',
    fontWeight: "500",
    borderBottomWidth: 3,
    borderBottomColor: "#0000ff"
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityAmount: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0000ff',
    fontWeight: "700"
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
  createPlanButton: {
    backgroundColor: '#0000ff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  createPlanButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  savingsSubText: {
    fontSize: 15,
    color: '#32CD32',
    fontWeight: '500',
    alignItems: 'center',
  },
  activeSavings:{
    color: "#555",
    fontSize: 15,
    fontWeight: "500"
  },
  icon:{
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    marginBottom: 20
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText:{
    fontWeight: "500",
    fontSize: 16
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  inputDateContainer:{
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    width: 150

  },
  calendarIcon: {
    padding: 10,
  },
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
  bottomSheetHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: "center"
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  frequencyTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  frequencyValue: {
    fontSize: 16,
    color: '#0000ff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  termsLink: {
    color: '#0000ff',
  },
  nextButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label:{
    fontSize: 16,
    fontWeight: "500"
  },
  subtext:{
    color: "#666",
    marginBottom: 10
  },
  subscheduleText:{
    width: 260,
    fontSize: 13,
    color: "#666"
  },
  start:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 330,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    color: "#666"
  },
  modalButton: {
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mock:{
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  inputDate: {
    padding: 10,
    color: "#666",
    fontSize: 16,
    paddingHorizontal: 2

  },
  pickerContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  pickerIcon: {
    position: 'absolute',
    right: 10,
  },
  picker: {
    borderWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    color: '#3b82f6', // Change to blue when selected
  },
  balanceText: {
    fontSize: 12,
    color: '#999',
    marginVertical: -10,
    marginBottom: 20
  },
  transferText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  returnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  returnsItem: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: "#555"
  },
  returnsTitle: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10
  },
  returnsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#0000ff"
  },
  taxText: {
    fontSize: 13,
    color: '#000',
    marginBottom: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  startText: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  immediatelyText: {
    fontSize: 14,
    color: '#0000ff',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  withdrawTitle:{
    fontSize: 18,
    fontWeight: "500",
  },
  flex:{
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  },
  labelText:{
    fontSize: 13,
    fontWeight: '500'
  },

  walletPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
    borderColor: "#0000ff"
  },
  walletPickerText: {
    fontSize: 14,
  },

  walletModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  walletModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 250,
  },
  walletOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  walletOptionText: {
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 15,
  },

});


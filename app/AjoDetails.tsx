import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import CustomSwitch from '@/components/CustomSwitch';

// Define the types
interface ContributionRound {
  name: string;
  amount: string;
  status: string;
  daysLeft?: number;
  round?: string;
  color?: string;
}

interface Member {
  name: string;
  role?: string;
  amount: string;
  roundStatus: string[];
  email: string;
  phone: string;
}

const VenzaAjoScreen: React.FC = () => {

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

  const handleContribution = () => {
    setIsPreviewVisible(false); // Hide the preview bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

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
  const [isWithdrawVisible, setIsWithdrawVisible] = useState(false);


  const handlePay = () => {
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet
  };

  const handleWithdraw = () => {
    setIsWithdrawVisible(true); // Show the transaction pin bottom sheet
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
  const [isCustomDateVisible, setIsCustomDateVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
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


  const handleEndSavings = () => {
    Alert.alert("Savings Ended", "Your Ajo Savings has ended early. An early termination charge has been applied.");
    setModalVisible(false);
  };

  
  const contributionRounds: ContributionRound[] = [
    { name: 'Segun Arinze', amount: '₦23,789.00', status: '25 Days Left', round: 'Round 1' },
    { name: 'Segun Arinze', amount: '₦23,789.00', status: 'Completed', round: 'Round 2' },
    { name: 'Segun Arinze', amount: '₦23,789.00', status: '25 Days Left', round: 'Round 3' }
  ];

  const members: Member[] = [
    { name: 'Timileyin Opeyemi', email: 'example@gmail.com', phone: '+2348088886823', role: 'Admin', amount: '₦23,789.00', roundStatus: ['green', 'red', 'red', 'red', 'red', 'red', 'green', 'green', 'green', 'red', ] },
    { name: 'Joshua Zion                           ', amount: '₦23,789.00', email: 'example@gmail.com', phone: '+2348088886823', roundStatus: ['green', 'red', 'yellow'] },
    { name: 'Esther Olumide                     ', amount: '₦23,789.00', email: 'example@gmail.com', phone: '+2348088886823', roundStatus: ['green', 'red'] }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/icons/btc.png')} style={styles.icon} />
        <Text style={styles.title}>Venza Ajo</Text>
        <View style={styles.flex}>
            <Text style={styles.amount}>₦1,400,000.00</Text>
            <Text style={styles.activeStatus}>Active</Text>
        </View>
        <View>
          <Text style={styles.date}>From: 12/04/2024 To: 12/09/2024</Text>
          <Text style={styles.code}>45ASH9870VX <Ionicons name='copy' /></Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={handlePay}>
          <Feather name='download' color={'#0000ff'} size={20} />
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Feather name='trash-2' color={'#0000ff'} size={20} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/EditAjoContribution')}>
          <FontAwesome name='pencil' color={'#0000ff'} size={20} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Contribution Rounds Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contribution Rounds</Text>
        {contributionRounds.map((round, index) => (
          <TouchableOpacity key={index} style={styles.roundCard} onPress={handlePreview}>
            <View>
              <Text style={styles.label}>{round.name}</Text>
              <Text style={styles.price}>{round.amount}</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.round}>{round.round}</Text>
              <Text
                style={[
                  styles.statusText,
                  round.status === 'Completed' ? styles.greenText : styles.label
                ]}
              >
                {round.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Members Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Members</Text>
        {members.map((member, index) => (
          <TouchableOpacity key={index} style={styles.memberCard} onPress={handleContribution}>
            <View style={{flexDirection: 'row', gap: 10}}>
            <Image source={require('../assets/icons/user.png')} style={styles.user} />
            <View>
              <View style={styles.membersRound}>
                <Text style={styles.name}>{member.name} {member.role && `(${member.role})`}</Text>
                <Text style={styles.round}>Round 1</Text>
              </View>
              <Text style={styles.label}>{member.email}</Text>
              <Text style={styles.label}>{member.phone}</Text>
            </View>
            </View>

            <View style={styles.roundIndicators}>
              {member.roundStatus.map((status, idx) => (
                <Text key={idx} style={status === 'green' ? styles.green : styles.red}>
                  {idx + 1}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

              {/* Bottom Sheet for Preview */}
        <BottomSheet isVisible={isPreviewVisible} onBackdropPress={() => setIsPreviewVisible(false)}>
          <View style={styles.bottomSheetContent}>
              <Image source={require('../assets/icons/date.png')} style={styles.logo} />
              <Text style={styles.successBottomSheetHeader}>Default Ajo Payment of N12,988.00</Text>
              <Text style={styles.desc}>You have missed contribution on the 12th of April 2024, click the button below to pay up.</Text>

            <TouchableOpacity style={styles.SellButton}>
              <Text style={styles.SellButtonText}>Complete Payment</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
          <View style={styles.bottomSheetContent}>
              <Image source={require('../assets/icons/report.png')} style={styles.logo} />
              <Text style={styles.successBottomSheetHeader}>Report Isaac Oja</Text>
              <Text style={styles.desc}>Are you sure you want to report Isaac Oja to the Admin for defaulting payment?</Text>

            <View style={styles.flexButtons}>
              <TouchableOpacity style={styles.reportButton}>
                <Text style={styles.SellButtonText}>Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsSuccessVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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

      <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to end your Ajo Savings?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButtonNo} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonYes} onPress={handleEndSavings}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </ScrollView>
  );
};

export default VenzaAjoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  amount: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    marginVertical: 10,
  },
  activeStatus: {
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 25
  },
  date: {
    color: '#666',
    fontSize: 13,
  },
  code: {
    color: '#0000ff',
    fontSize: 14,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20
  },
  button: {
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  buttonText: {
    color: '#0000ff',
  },
  section: {
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  roundCard: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ddd",
  },
  memberCard: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  roundIndicators: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  align: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  round: {
    backgroundColor: '#86DBff',
    padding: 5,
    borderRadius: 20,
    color: '#0000ff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: 13,
    color: '#666',
  },
  greenText: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
  },
  membersRound: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  memberamount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  green: {
    backgroundColor: 'green',
    padding: 3,
    borderRadius: 50,
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 7,
  },
  red: {
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 50,
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 7,
  },
  name: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700'
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
  logo:{
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20
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
  SellButton: {
    backgroundColor: '#1400FB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  reportButton: {
    backgroundColor: '#CC1212',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 50
  },
  cancelButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 1,

  },
  cancelText:{
    color: '#000',
  },
  SellButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'medium',
  },
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  flexButtons:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  user:{
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#000',
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
  editBtn:{
    backgroundColor: "#ccc",
    width: 100,
    padding: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shareText:{
    color: "#0000ff"
  },
  shareBtn:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5 
  },
  membersContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  usericon:{
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  memberName:{
    alignItems: "flex-start"
  },
  namehead:{
    color: "#666"
  },
  value:{
    fontSize: 15
  },
  cashoutdate:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10
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
  frequencyTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: "500"
  },
  frequencyValue: {
    fontSize: 16,
    color: '#0000ff',
  },
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonNo: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  modalButtonYes: {
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

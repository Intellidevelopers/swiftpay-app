import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CustomCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)}>
      <View style={{
        width: 20,
        height: 20,
        backgroundColor: value ? 'blue' : 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
      }} />
    </TouchableOpacity>
  );
};

const CreateInvestHoldings = () => {
  const [amountToInvest, setAmountToInvest] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(''); 
  const [endDate, setEndDate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChooseAsset = () => {
    router.push('/InvestAsset'); 
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setEndDate(currentDate.toLocaleDateString());
  };
  

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name='left' size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>Holdings Save In Hard Currency</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>SwiftPay Balance</Text>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceLabel}>
            <Image style={styles.logo} source={require('../assets/icons/icon.png')} />
            <Text style={styles.swiftPayText}>SwiftPay Balance</Text>
          </View>
          <View style={styles.balanceInput}>
            <Text style={styles.balance}>$0.00</Text>
          </View>
          <AntDesign name='down' size={20} />
        </View>

        <Text style={styles.label}>Amount To Invest</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount To Invest"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          value={amountToInvest}
          onChangeText={setAmountToInvest}
        />

        <View style={styles.rateContainer}>
          <Text style={styles.rateLabel}>Current Rate:</Text>
          <Text style={styles.rateValue}>0.00=0.00</Text>
        </View>

        {/* Choose Asset */}
        <Text style={styles.label}>Choose Asset</Text>
        <TouchableOpacity style={styles.pickerContainer} onPress={handleChooseAsset}>
          <Text style={styles.assetText}>{selectedAsset || 'Select Asset'}</Text>
        </TouchableOpacity>

        {/* End Date */}
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input2}>
          <Text style={{ color: endDate ? '#000' : '#A9A9A9' }}>
            {endDate || 'Select End Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.termsContainer}>
          <CustomCheckbox value={agreeTerms} onValueChange={setAgreeTerms} />
          <Text style={styles.termsText}>
            I Have Read And Agree To The Terms & Conditions And Privacy Policy
          </Text>
        </View>

        <TouchableOpacity style={styles.holdNowButton} disabled={!agreeTerms} onPress={() => router.push('/Fiats')}>
          <Text style={styles.holdNowText}>Hold Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  balanceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swiftPayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: "500"
  },
  balanceInput: {
    backgroundColor: '#D3E3FD',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 15
  },
  balance: {
    fontSize: 16,
    color: '#000',
    fontWeight: "700"
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    color: '#000',
    width: '95%',
    alignSelf: "center"
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3E3FD',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignSelf: "center",
  },
  rateLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: "500"
  },
  rateValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: "500"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
  },
  assetText: {
    fontSize: 16,
    color: '#000',
  },
  input2: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    color: '#000',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    marginLeft: 10,
    color: '#0000ff',
  },
  holdNowButton: {
    backgroundColor: '#0000FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  holdNowText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 40,
    gap: 20,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 20,
    color: '#000',
  },
});

export default CreateInvestHoldings;

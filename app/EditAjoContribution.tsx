import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheet } from '@rneui/themed';

const EditAjoContribution = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [reason, setReason] = useState("Select Reason");
  const [type, setType] = useState("Select Type");
  const [isTransactionPinVisible, setIsTransactionPinVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);


  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePay = () => {
    setIsTransactionPinVisible(true); // Show the transaction pin bottom sheet
  };

  const handleConfirmPayment = () => {
    setIsTransactionPinVisible(false); // Hide the transaction pin bottom sheet
    setIsSuccessVisible(true); // Show the success bottom sheet
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Ajo Contribution</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contribution Name */}
        <Text style={styles.label}>Contribution Name</Text>
        <TextInput style={styles.input} placeholder="House Rent" />

        {/* Reason for Contribution */}
        <Text style={styles.label}>Reason for Contribution</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowReasonModal(true)}>
          <Text>{reason}</Text>
          <AntDesign name="down" size={15} />
        </TouchableOpacity>

        {/* Reason Modal */}
        <Modal transparent={true} visible={showReasonModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => { setReason("Personal Contribution"); setShowReasonModal(false); }}>
                <Text style={styles.modalOption}>Personal Contribution</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setReason("Business Contribution"); setShowReasonModal(false); }}>
                <Text style={styles.modalOption}>Business Contribution</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Type of Contribution */}
        <Text style={styles.label}>Type of Contribution</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowTypeModal(true)}>
          <Text>{type}</Text>
          <AntDesign name="down" size={15} />
        </TouchableOpacity>

        {/* Type Modal */}
        <Modal transparent={true} visible={showTypeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => { setType("Weekly Contribution"); setShowTypeModal(false); }}>
                <Text style={styles.modalOption}>Weekly Contribution</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setType("Monthly Contribution"); setShowTypeModal(false); }}>
                <Text style={styles.modalOption}>Monthly Contribution</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setType("Yearly Contribution"); setShowTypeModal(false); }}>
                <Text style={styles.modalOption}>Yearly Contribution</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Amount Contributed */}
        <Text style={styles.label}>Amount Contributed</Text>
        <TextInput style={styles.input} placeholder="N2,979,087.00" keyboardType="numeric" />

        {/* Number of Members */}
        <Text style={styles.label}>Number of Members (Including You)</Text>
        <TextInput style={styles.input} placeholder="4" keyboardType="numeric" />

        {/* Estimated number of rounds */}
        <Text style={styles.label}>Estimated number of rounds</Text>
        <TextInput style={styles.input} placeholder="12" keyboardType="numeric" />

        {/* Contribution Rotation Date */}
        <Text style={styles.label}>Start/Contribution Rotation Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
          <View style={styles.flex}>
            <AntDesign name="calendar" size={20} />
            <Text>{date.toDateString()}</Text>
          </View>
          <AntDesign name="down" size={15} />
        </TouchableOpacity>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Upload Image */}
        <Text style={styles.label}>Change Contribution Image</Text>
        <TouchableOpacity onPress={pickImage} style={styles.input}>
          <Text style={styles.uploadButton}>{image ? 'Image Uploaded' : 'Upload Image'}</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        )}

        {/* Create Ajo Button */}
        <TouchableOpacity style={styles.createButton} onPress={handlePay}>
          <Text style={styles.createButtonText}>Update Ajo</Text>
        </TouchableOpacity>
      </ScrollView>

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

      <BottomSheet isVisible={isSuccessVisible} onBackdropPress={() => setIsSuccessVisible(false)}>
        <View style={styles.bottomSheetContent}>
          
          <Image source={require('../assets/icons/success.png')} style={styles.logo} />
          <Text style={styles.successBottomSheetHeader}>Ajo Updated Successfully</Text>
      <Text style={styles.desc}>You have successfully updated your Ajo Contrinbution.</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/AjoDetails')}>
            <Text style={styles.nextButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginVertical: 10,
    marginBottom: 20
  },
  dropdown: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  dateInput: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  createButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  createButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  uploadButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: 120,
    textAlign: 'center'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
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
  desc: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  icon:{
    width: 25,
    height: 25
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
  logo:{
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center"
  },
});

export default EditAjoContribution;

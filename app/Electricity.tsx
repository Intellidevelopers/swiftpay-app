import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import Modal from 'react-native-modal';

// Define the type for the provider
interface Provider {
  id: string;
  name: string;
  logo: any; // Use 'any' for the logo since you're using require
}

const Electricity = () => {
  // Use the Provider type for the selectedProvider state
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null); // Allow null or a provider object
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Prepaid'); // New state to track selected tab

  const serviceProviders: Provider[] = [
    { id: '1', name: 'Ibadan Electricity', logo: require('../assets/banks/firstbank.png') },
    { id: '2', name: 'Eko Electricity', logo: require('../assets/banks/access.png') },
    // Add more providers here
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider); // Set the selected provider
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbutton} onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electricity</Text>
      </View>

      {/* Header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        

        {/* Tab Content */}
        {selectedTab === 'Prepaid' ? (
          <View>
            <View style={styles.cardContainer}>
          <Text style={styles.label}>Service Postpaid Provider</Text>
          <TouchableOpacity 
            style={styles.electricityHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <View style={styles.subHeader}>
              <Image source={selectedProvider ? selectedProvider.logo : require('../assets/banks/firstbank.png')} style={styles.icon}/>
              <Text style={styles.dropdownLabel}>
                {selectedProvider ? selectedProvider.name : 'Select Provider'}
              </Text>
            </View>
            <AntDesign style={{ right: 10 }} name={showDropdown ? 'up' : 'down'} size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {serviceProviders.map((provider) => (
                <TouchableOpacity 
                  key={provider.id} 
                  style={styles.dropdownItem} 
                  onPress={() => handleProviderSelect(provider)}>
                  <Image source={provider.logo} style={styles.icon2} />
                  <Text>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Header Buttons */}
          {/* Header Buttons */}
<View style={styles.buttonContainer}>
  <TouchableOpacity 
    style={styles.prepaidButton}
    onPress={() => setSelectedTab('Prepaid')}
  >
    <Text style={styles.prepaidButtonText}>Prepaid</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={styles.postpaidButton}
    onPress={() => setSelectedTab('Postpaid')}
  >
    <Text style={styles.postpaidButtonText}>Postpaid</Text>
  </TouchableOpacity> 
</View>


        </View>

        <View style={styles.meterContainer}>
          <View style={styles.row1}>
            <Text>Meter Number</Text>
            <View style={styles.row2}>
                <Text>Beneficiaries</Text>
                <AntDesign name='right' size={15} />
            </View>
          </View>

          <TextInput 
            placeholder='Enter meter number'
            style={styles.input}
          />
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.amountInputContainer}>
              <Text>₦</Text>
              <TextInput 
                placeholder='Enter Amount'
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
        ) : (
          <View >
            <View style={styles.cardContainer}>
          <Text style={styles.label}>Service Prepaid Provider</Text>
          <TouchableOpacity 
            style={styles.electricityHeader}
            onPress={() => setShowDropdown(!showDropdown)}>
            <View style={styles.subHeader}>
              <Image source={selectedProvider ? selectedProvider.logo : require('../assets/banks/firstbank.png')} style={styles.icon}/>
              <Text style={styles.dropdownLabel}>
                {selectedProvider ? selectedProvider.name : 'Select Provider'}
              </Text>
            </View>
            <AntDesign style={{ right: 10 }} name={showDropdown ? 'up' : 'down'} size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              {serviceProviders.map((provider) => (
                <TouchableOpacity 
                  key={provider.id} 
                  style={styles.dropdownItem} 
                  onPress={() => handleProviderSelect(provider)}>
                  <Image source={provider.logo} style={styles.icon2} />
                  <Text>{provider.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {/* Header Buttons */}
         {/* Header Buttons */}
<View style={styles.buttonContainer}>
  <TouchableOpacity 
    style={{
      backgroundColor: "#f5f5f5",
      padding: 10,
      paddingHorizontal: 40,
      borderRadius: 10
    }}
    onPress={() => setSelectedTab('Prepaid')}
  >
    <Text style={{
        color: "#000"
    }}>Prepaid</Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={{
      backgroundColor: "#F0F4F3",
      padding: 10,
      paddingHorizontal: 40,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#0FA078"
    }}
    onPress={() => setSelectedTab('Postpaid')}
  >
    <Text style={{
        color: "#0fa078"
    }}>Postpaid</Text>
  </TouchableOpacity> 
</View>

        </View>

        

        <View style={styles.amountContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.tabButtonRow}>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
            <View style={styles.tabbutton}>
              <Text>₦ 0.00</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.amountInputContainer}>
              <Text>₦</Text>
              <TextInput 
                placeholder='Enter Amount'
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
          </View>
        )}

        
      </ScrollView>

      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Proceed to Payment?</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Electricity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 20,
    marginBottom: 20
  },
  backbutton:{
    padding: 13,
    borderRadius: 50
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon:{
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    resizeMode: "contain"
  },
  icon2:{
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 5
  },
  cardContainer:{
    backgroundColor: "#fff",
    padding: 5,
    flexDirection: "column",
    borderRadius: 15,
    marginBottom: 20
  },
  meterContainer:{
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "column",
    borderRadius: 15,
    marginBottom: 20
  },
  electricityHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  subHeader:{
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10
  },
  buttonContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  prepaidButton:{
    backgroundColor: "#F0F4F3",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0FA078"
  },
  prepaidButtonText:{
    color: "#0fa078"
  },
  postpaidButton:{
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10
  },
  postpaidButtonText:{
    color: "#555"
  },
  row1:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20  
  },
  row2:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5  
  },
  input:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  amountContainer:{
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20
  },
  tabbutton:{
    backgroundColor: "#f5f5f5",
    width: 90,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 15,
  },
  tabButtonRow:{
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  label:{
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 20
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  amountInputContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    width: '75%',
    borderBottomColor: "#666",
    marginBottom: 20
  },
  amountInput:{
    padding: 10,
    flex: 1
  },
  payButton:{
    backgroundColor: "#0000ff",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  buttonText:{
    color: "#fff"
  },
  dropdownLabel:{
    fontWeight: "900"
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#0000ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: "#0FA078",
  },
  tabButtonText: {
    color: "#555",
  },
  activeTabButtonText: {
    color: "#fff",
  },
})